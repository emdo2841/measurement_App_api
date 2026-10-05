import { prisma } from "../db";
import { Request, Response } from "express";
import { createUserSchema, UpdateUserSchema } from "../schemas/user.schema";
import bcrypt from "bcryptjs";
import 'dotenv/config';
import { uploadImageBuffer, deleteImage } from "../Utils/cloudinary";
import { sendEmail } from "../services/email";
import { signupTemplate } from "../template/emailTemplate";
import {
  hashToken,
} from "../Utils/cryptos";
import { getCache, setCache, delCache } from '../middleWare/cache';
import { Prisma } from "../generated/prisma/client";

const userCacheKey = (id: string) => `user:${id}`;
const profileCacheKey = (id: string) => `user:profile:${id}`;

const publicUserSelect = {
    id: true,
    name: true,
    email: true,
    phone: true,
    image: true,
    createdAt: true,
    updatedAt: true,
    emailVerifiedAt: true,
} as const;


export const createUser = async (req: Request, res: Response) => {
    try {
        const file = req.file as Express.Multer.File | undefined;
        const validatedData = createUserSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ error: validatedData.error.format() });
        }
        const { email, name, password, phone, registrationToken } = validatedData.data;

        const verifiedRegistration =
  await prisma.registrationVerification.findFirst({
    where: {
      email,

      verifiedAt: {
        not: null,
      },

      registrationTokenHash:
        hashToken(registrationToken),

      registrationTokenExpiry: {
        gt: new Date(),
      },
    },
  });

if (!verifiedRegistration) {
  return res.status(400).json({
    error:
      "Verify your email before completing registration.",
  });
}
        
        let imageUrl: string | undefined;
        let imagePublicId: string | undefined;
        if (file) {
            const { url, publicId } = await uploadImageBuffer(file.buffer, 'users');
            imageUrl = url;
            imagePublicId = publicId;
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.$transaction(
  async (tx) => {
    const createdUser =
      await tx.user.create({
        data: {
          email,
          name,
          phone,
          password: hashedPassword,
          image: imageUrl,
          imagePublicId,
          emailVerifiedAt: new Date(),
        },

        select: publicUserSelect,
      });

    await tx.registrationVerification.delete({
      where: {
        id: verifiedRegistration.id,
      },
    });

    return createdUser;
  },
);

// The account now exists, so send the welcome email.
try {
  await sendEmail({
    to: user.email,
    subject: "Welcome to TailorPro!",
    html: signupTemplate(user.name),
  });
} catch (emailError) {
  req.log.warn(
    {
      err: emailError,
      userId: user.id,
      email: user.email,
    },
    "Account created, but welcome email failed",
  );
}

return res.status(201).json({
  status: "successful",
  message:
    "Account created successfully. Welcome to TailorPro!",
  data: user,
});
    } catch (error) {
        req.log.error({error:error}, "failed to create user")
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        if (userId !== req.user?.userId) {
            return res.status(404).json({ error: "User not found" });
        }

        const cacheKey = userCacheKey(userId);
 
        // 1. Try cache first
        const cached = await getCache(cacheKey);
        if (cached) {
            return res.status(200).json(cached);
        }
 
        // 2. Cache miss -> query DB
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: publicUserSelect,
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
 
        // 3. Populate cache (fire-and-forget, non-blocking on errors)
        await setCache(cacheKey, user);
 
        return res.status(200).json({status: "successful",  data: user});
    } catch (error) {
        req.log.error({ err: error }, "Get user failed");
        return res.status(500).json({ error: "Internal server error" });
    }
}
 
export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    if (!req.user?.userId) {
      return res.status(401).json({
        error: "Unauthorized access",
      });
    }

    if (id !== req.user.userId) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const file = req.file as Express.Multer.File | undefined;

    const validatedData = UpdateUserSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        error: validatedData.error.format(),
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        image: true,
        imagePublicId: true,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    let uploadedImage:
      | {
          url: string;
          publicId: string;
        }
      | undefined;

    if (file) {
      uploadedImage = await uploadImageBuffer(file.buffer, "users");
    }

    const { name, phone } = validatedData.data;

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(phone !== undefined ? { phone } : {}),
        ...(uploadedImage
          ? {
              image: uploadedImage.url,
              imagePublicId: uploadedImage.publicId,
            }
          : {}),
      },
      select: publicUserSelect,
    });

    // Delete the previous Cloudinary image only after DB update succeeds.
    if (
      uploadedImage &&
      existingUser.imagePublicId &&
      existingUser.imagePublicId !== uploadedImage.publicId
    ) {
      try {
        await deleteImage(existingUser.imagePublicId);
      } catch (imageDeleteError) {
        req.log.warn(
          {
            err: imageDeleteError,
            userId: id,
            imagePublicId: existingUser.imagePublicId,
          },
          "Old profile image could not be deleted",
        );
      }
    }

    // Very important: remove cached profile containing the old image.
    await delCache(
      userCacheKey(id),
      profileCacheKey(id),
    );

    return res.status(200).json({
      status: "successful",
      data: user,
    });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    req.log.error(
      {
        err: error,
        userId: id,
      },
      "Update user failed",
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
 
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (id !== req.user?.userId) {
            return res.status(404).json({ error: "User not found" });
        }
 
        // 1. Query the user along with nested client and order imagePublicIds
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                imagePublicId: true,
                clients: {
                    select: {
                        imagePublicId: true,
                        orders: {
                            select: {
                                imagePublicId: true,
                            },
                        },
                    },
                },
            },
        });
 
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
 
        // 2. Collect all non-null publicIds into a single array
        const publicIds: string[] = [];
 
        if (user.imagePublicId) publicIds.push(user.imagePublicId);
 
        for (const client of user.clients) {
            if (client.imagePublicId) publicIds.push(client.imagePublicId);
            for (const order of client.orders) {
                if (order.imagePublicId) publicIds.push(order.imagePublicId);
            }
        }
 
        // 3. Delete all collected images in parallel
        if (publicIds.length > 0) {
            await Promise.allSettled(
                publicIds.map((publicId) => deleteImage(publicId))
            );
        }
 
        // 4. Delete user from database
        await prisma.user.delete({
            where: { id },
        });
 
        // 5. Invalidate cache entries for this user
        await delCache(userCacheKey(id), profileCacheKey(id));
 
        return res.status(200).json({ message: "User and associated images deleted successfully" });
    } catch (error: any) {
        if (error?.code === 'P2025') {
            return res.status(404).json({ error: "User not found" });
        }
 
        req.log.error({ err: error }, "Delete user failed");
        return res.status(500).json({ error: "Internal server error" });
    }
};
 
 
export const profile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        
        const userCacheKey = (id: string) => `user:${id}`;
 
        if (!userId) {
            return res.status(401).json({ message: "unathorized access" })
        }
 
        const cacheKey = profileCacheKey(userId);
 
        // 1. Try cache first
        const cached = await getCache(cacheKey);
        if (cached) {
            return res.status(200).json({ status: "successful", data: cached });
        }
 
        // 2. Cache miss -> query DB
        const user = await prisma.$primary().user.findUnique({
            where: { id: userId },
            select: publicUserSelect,
        })
        if (!user) {
            return res.status(404).json({ error: "user not found" })
        }
 
        // 3. Populate cache
        await setCache(cacheKey, user);
 
        return res.status(200).json({status: "successful", data: user})
    } catch (error) {
        req.log.error({ err: error }, "getting profile failed");
        return res.status(500).json({ error: "Internal server error" })
    }
}

// export const getAllUsers = async (req: Request, res: Response) => {
//     try{
//         const user = await prisma.user.findMany();
//     return res.status(200).json({ status: "success", data: user  });
//     }catch(error){
//         console.log(error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
    
// }

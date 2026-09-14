export declare const prisma: import("@prisma/client/runtime/client").DynamicClientExtensionThis<import("./generated/prisma/internal/prismaNamespace").TypeMap<import("@prisma/client/runtime/client").InternalArgs & {
    result: {};
    model: {};
    query: {};
    client: {
        $primary: () => <T extends object>(this: T) => Omit<T, "$primary" | "$replica">;
        $replica: () => <T extends object>(this: T) => Omit<T, "$primary" | "$replica">;
        $connect: () => () => Promise<void>;
        $disconnect: () => () => Promise<void>;
    };
}, import("./generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined>, import("./generated/prisma/internal/prismaNamespace").TypeMapCb<import("./generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined>, {
    result: {};
    model: {};
    query: {};
    client: {
        $primary: () => <T extends object>(this: T) => Omit<T, "$primary" | "$replica">;
        $replica: () => <T extends object>(this: T) => Omit<T, "$primary" | "$replica">;
        $connect: () => () => Promise<void>;
        $disconnect: () => () => Promise<void>;
    };
}>;
//# sourceMappingURL=db.d.ts.map
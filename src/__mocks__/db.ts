import { PrismaClient } from '@prisma/client';
import { beforeEach, vi } from 'vitest'; // 1. Added 'vi' import
import { mockDeep, mockReset, DeepMockProxy } from 'vitest-mock-extended';

import { prisma } from '../db';

// 2. Changed 'vitest.mock' to 'vi.mock'
vi.mock('../db', () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

// 3. Added <PrismaClient> generic type argument
export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});
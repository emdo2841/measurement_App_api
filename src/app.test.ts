import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from './app';
import { prismaMock } from './__mocks__/db';

// Mock SMTP verification
vi.mock('./Utils/mail', () => ({
  verifySmtpConnection: vi.fn(),
}));

describe('GET /', () => {
  it('should return 200 with list of users from Prisma', async () => {
    const mockUsers = [
      {
        id: '1',
        name: 'Joy Zabura',
        email: 'john@example.com',
        password: 'hashedpassword',
        phone: null,
        image: null,
        imagePublicId: null,
        resetTokens: null,
        resetTokenExpiry: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Mock Prisma return value
    prismaMock.user.findMany.mockResolvedValue(mockUsers);

    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.users).toHaveLength(1);
    expect(response.body.data.users[0].name).toBe('Joy Zabura');
  });
});

describe('Middleware & Error Handlers', () => {
  it('should return 404 for unknown endpoints', async () => {
    const response = await request(app).get('/api/v1/unknown-route');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Sorry, can't find that!" });
  });

  it('should return 400 for malformed JSON bodies', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send('{"invalid_json": ');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid JSON in request body' });
  });
});
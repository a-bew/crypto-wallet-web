import request from 'supertest';
import app from '../app';

describe('User API', () => {
  it('should register a new user', async () => {
    const response = await request(app).post('/api/users/register').send({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should not register with an existing email', async () => {
    await request(app).post('/api/users/register').send({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    });

    const response = await request(app).post('/api/users/register').send({
      email: 'test@example.com',
      password: 'password123',
      name: 'Another User'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
  });
});

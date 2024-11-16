import { authService } from '../services/authService';
import request from 'supertest';
import { app } from '../server';
import { RegisterRequest, LoginRequest } from '../types/api';

describe('Auth Endpoints', () => {
  const testUser: RegisterRequest = {
    email: 'test@example.com',
    name: 'Test User',
    password: 'securepassword'
  };

  it('should register a new user', async () => {
    const response = await request(app).post('/api/auth/register').send(testUser);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.user).toBeDefined();
    expect(response.body.token).toBeDefined();
  });

  it('should handle existing email during registration', async () => {
    const response = await request(app).post('/api/auth/register').send(testUser);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('Email already in use');
  });

  it('should handle missing fields during registration', async () => {
    const response = await request(app).post('/api/auth/register').send({});
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('All fields are required');
  });

  it('should handle invalid email format during registration', async () => {
    const invalidUser: RegisterRequest = { ...testUser, email: 'invalid-email' };
    const response = await request(app).post('/api/auth/register').send(invalidUser);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('Invalid email');
  });


  it('should login a registered user', async () => {
    const registerResponse = await request(app).post('/api/auth/register').send(testUser);
    expect(registerResponse.status).toBe(201);

    const loginResponse = await request(app).post('/api/auth/login').send({
        email: testUser.email,
        password: testUser.password
    });
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.success).toBe(true);
    expect(loginResponse.body.token).toBeDefined();
  });

  it('should handle invalid credentials during login', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: 'wrongpassword'
    });
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('Invalid credentials');
  });

  it('should handle missing fields during login', async () => {
    const response = await request(app).post('/api/auth/login').send({});
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('Email and password are required');
  });


  it('should verify JWT for protected route', async () => {
    const registerResponse = await request(app).post('/api/auth/register').send(testUser);
    const token = registerResponse.body.token;

    const protectedRouteResponse = await request(app)
      .get('/api/goals/' + registerResponse.body.user._id)
      .set('Authorization', `Bearer ${token}`);
    
    expect(protectedRouteResponse.status).toBe(200);
  });

  it('should reject request without JWT for protected route', async () => {
    const protectedRouteResponse = await request(app)
      .get('/api/goals/someuserid')
    
    expect(protectedRouteResponse.status).toBe(401);
  });

  afterAll(async () => {
    await User.deleteOne({ email: testUser.email });
  });
});

```
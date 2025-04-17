const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const app = require('../src/app');
const Account = require('../src/models/Account');

describe('Account API GET Endpoints', () => {
  let mongoServer;
  let testAccount;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create test data once for all tests
    testAccount = await Account.create({
      name: 'Test Account',
      email: 'email@provider.wmapi',
      size: 'enterprise',
      plan: 'enterprise',
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('GET /api/v1/account', () => {
    it('should return all accounts', async () => {
      const res = await request(app)
        .get('/api/v1/account')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.some((acc) => acc.name === 'Test Account')).toBeTruthy();
    });
  });

  describe('GET /api/v1/account/:id', () => {
    it('should return a specific account', async () => {
      const res = await request(app)
        .get(`/api/v1/account/${testAccount._id}`)
        .expect(200);

      expect(res.body).toMatchObject({
        name: 'Test Account',
        email: 'email@provider.wmapi',
        size: 'enterprise',
        plan: 'enterprise',
      });
    });

    it('should return 404 for non-existent account', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/api/v1/account/${fakeId}`)
        .expect(404);

      expect(res.body.error).toBeDefined();
    });

    it('should return 500 for invalid ID format', async () => {
      const res = await request(app)
        .get('/api/v1/account/invalid-id')
        .expect(500);

      expect(res.body.error).toBeDefined();
    });
  });
});

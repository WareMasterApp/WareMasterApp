const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const app = require('../src/app');
const Brand = require('../src/models/Brand');

describe('Account API GET Endpoints', () => {
  let mongoServer;
  let testBrand;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create test data once for all tests
    testBrand = await Brand.create({
      name: 'Test Brand Name'
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('GET /api/v1/brand', () => {
    it('should return all brands', async () => {
      const res = await request(app)
        .get('/api/v1/brand')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.some(acc => acc.name === 'Test Brand Name')).toBeTruthy();
    });
  });

  describe('GET /api/v1/brand/:id', () => {
    it('should return a specific brand by id', async () => {
      const res = await request(app)
        .get(`/api/v1/brand/${testBrand._id}`)
        .expect(200);

      expect(res.body).toMatchObject({
        name: 'Test Brand Name'
      });
    });

    it('should return 404 for non-existent account', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/api/v1/brand/${fakeId}`)
        .expect(404);

      expect(res.body.error).toBeDefined();
    });

    it('should return 500 for invalid ID format', async () => {
      const res = await request(app)
        .get('/api/v1/brand/invalid-id')
        .expect(500);

      expect(res.body.error).toBeDefined();
    });
  });
});
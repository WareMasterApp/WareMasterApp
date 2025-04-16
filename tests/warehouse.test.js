const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const app = require('../src/app');
const Warehouse = require('../src/models/Warehouse');

describe('Account API GET Endpoints', () => {
  let mongoServer;
  let testWarehouse;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create test data once for all tests
    testWarehouse = await Warehouse.create({
      name: 'Test Warehouse Name',
      address: '123 Street'
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('GET /api/v1/warehouse', () => {
    it('should return all Warehouses', async () => {
      const res = await request(app)
        .get('/api/v1/warehouse')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.some(acc => acc.name === 'Test Warehouse Name')).toBeTruthy();
    });
  });

  describe('GET /api/v1/warehouse/:id', () => {
    it('should return a specific Warehouse by id', async () => {
      const res = await request(app)
        .get(`/api/v1/warehouse/${testWarehouse._id}`)
        .expect(200);

      expect(res.body).toMatchObject({
        name: 'Test Warehouse Name',
        address: '123 Street'
      });
    });

    it('should return 404 for non-existent account', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/api/v1/warehouse/${fakeId}`)
        .expect(404);

      expect(res.body.error).toBeDefined();
    });

    it('should return 500 for invalid ID format', async () => {
      const res = await request(app)
        .get('/api/v1/warehouse/invalid-id')
        .expect(500);

      expect(res.body.error).toBeDefined();
    });
  });
});
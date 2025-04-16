const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const app = require('../src/app');
const Product = require('../src/models/Product');

describe('Product API GET Endpoints', () => {
  let mongoServer;
  let testProduct;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create test data once for all tests
    testProduct = await Product.create({
      name: 'Test Product',
      sku: 'sku',
      description: 'The description of the test product',
      category: 'Test Category',
      brandId: '67fe88f11a0ffd47f76f51ea',
      weight: 'Test pounds',
      barcode: 'Test barcode',
      imageUrl: 'Test image URL',
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('GET /api/v1/product', () => {
    it('should return all products', async () => {
      const res = await request(app)
        .get('/api/v1/product')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.some((acc) => acc.name === 'Test Product')).toBeTruthy();
    });
  });

  describe('GET /api/v1/product/:id', () => {
    it('should return a specific product', async () => {
      const res = await request(app)
        .get(`/api/v1/product/${testProduct._id}`)
        .expect(200);

      expect(res.body).toMatchObject({
        name: 'Test Product',
        sku: 'sku',
        description: 'The description of the test product',
        category: 'Test Category',
        brandId: '67fe88f11a0ffd47f76f51ea',
        weight: 'Test pounds',
        barcode: 'Test barcode',
        imageUrl: 'Test image URL',
      });
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/api/v1/product/${fakeId}`)
        .expect(404);

      expect(res.body.error).toBeDefined();
    });

    it('should return 500 for invalid ID format', async () => {
      const res = await request(app)
        .get('/api/v1/product/invalid-id')
        .expect(500);

      expect(res.body.error).toBeDefined();
    });
  });
});

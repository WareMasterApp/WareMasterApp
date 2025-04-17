const express = require('express');
const { isAuthenticated } = require('../middleware/authenticate');
const {
  createInventory,
  getAllInventories,
  getInventoryByWarehouse,
  getInventoryByBrand,
  addProductToInventory,
  removeProductFromInventory,
} = require('../controllers/inventoryController');
const inventoryRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory management
 */

/**
 * @swagger
 * /api/v1/inventory:
 *   post:
 *     summary: Create a new inventory
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryRequest'
 *     responses:
 *       201:
 *         description: Inventory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryResponse'
 *       422:
 *         description: Required data incorrect/missing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UnprocessableContent"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */
inventoryRouter.post('/', isAuthenticated, createInventory);

/**
 * @swagger
 * /api/v1/inventory:
 *   get:
 *     summary: Get all products
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InventoryResponse'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */
inventoryRouter.get('/', getAllInventories);

/**
 * @swagger
 * /api/v1/inventory/warehouse/{warehouseId}:
 *   get:
 *     summary: Get inventory by Warehouse ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: warehouseId
 *         schema:
 *           type: string
 *         required: true
 *         description: Warehouse ID
 *     responses:
 *       200:
 *         description: Inventory list for Warehouse
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryResponse'
 *       404:
 *         description: Inventory not found for this Warehouse
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ObjectNotFound"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */
inventoryRouter.get('/warehouse/:warehouseId', getInventoryByWarehouse);

/**
 * @swagger
 * /api/v1/inventory/brand/{brandId}:
 *   get:
 *     summary: Get inventory by Brand ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: brandId
 *         schema:
 *           type: string
 *         required: true
 *         description: Brand ID
 *     responses:
 *       200:
 *         description: Inventory list for Brand
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryResponse'
 *       404:
 *         description: Inventory not found for this Brand
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ObjectNotFound"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */
inventoryRouter.get('/brand/:brandId', getInventoryByBrand);

/**
 * @swagger
 * /api/v1/inventory/add:
 *   patch:
 *     summary: Add (+1) product to inventory
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *               warehouseId:
 *                 type: string
 *                 example: "658d1f77bcf86cd799439022"
 *     responses:
 *       200:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryResponse'
 *       404:
 *         description: Product or Warehouse not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ObjectNotFound"
 *       422:
 *         description: Required data incorrect/missing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UnprocessableContent"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */
inventoryRouter.patch('/add', isAuthenticated, addProductToInventory);

/**
 * @swagger
 * /api/v1/inventory/remove:
 *   patch:
 *     summary: Remove (-1) product from inventory
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *               warehouseId:
 *                 type: string
 *                 example: "658d1f77bcf86cd799439022"
 *     responses:
 *       200:
 *         description: Product removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryResponse'
 *       404:
 *         description: Product or Warehouse not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ObjectNotFound"
 *       422:
 *         description: Required data incorrect/missing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UnprocessableContent"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */
inventoryRouter.patch('/remove', isAuthenticated, removeProductFromInventory);

module.exports = inventoryRouter;

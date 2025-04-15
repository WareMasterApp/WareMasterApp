const express = require('express');
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
inventoryRouter.post('/', createInventory);

/**
 * @swagger
 * /api/v1/inventory:
 *   get:
 *     summary: Get all producs
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of all producs
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
inventoryRouter.get('/', getAllInventory);

/**
 * @swagger
 * /api/v1/inventory/{id}:
 *   get:
 *     summary: Get inventory by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Inventory ID
 *     responses:
 *       200:
 *         description: Inventory found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryResponse'
 *       404:
 *         description: Inventory not found
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
inventoryRouter.get('/:id', getInventoryById);

/**
 * @swagger
 * /api/v1/inventory/{id}:
 *   put:
 *     summary: Update a inventory
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Inventory ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryRequest'
 *     responses:
 *       200:
 *         description: Inventory updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryResponse'
 *       404:
 *         description: Inventory not found
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
inventoryRouter.put('/:id', updateInventoryById);

/**
 * @swagger
 * /api/v1/inventory/{id}:
 *   delete:
 *     summary: Delete a inventory
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Inventory ID
 *     responses:
 *       200:
 *         description: Inventory deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Inventory deleted
 *       404:
 *         description: Inventory not found
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
inventoryRouter.delete('/:id', deleteInventoryById);

module.exports = inventoryRouter;

const express = require('express');
const brandRouter = express.Router();
const { isAuthenticated } = require('../middleware/authenticate');
const {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrandById,
  deleteBrandById,
} = require('../controllers/brandController');

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Brand management
 */

/**
 * @swagger
 * /api/v1/brand:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BrandRequest'
 *     responses:
 *       201:
 *         description: Brand created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BrandResponse'
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
brandRouter.post('/', isAuthenticated, createBrand);

/**
 * @swagger
 * /api/v1/brand:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: List of all brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BrandResponse'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */
brandRouter.get('/', getAllBrands);

/**
 * @swagger
 * /api/v1/brand/{id}:
 *   get:
 *     summary: Get brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Brand ID
 *     responses:
 *       200:
 *         description: Brand found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BrandResponse'
 *       404:
 *         description: Brand not found
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
brandRouter.get('/:id', getBrandById);

/**
 * @swagger
 * /api/v1/brand/{id}:
 *   put:
 *     summary: Update a brand
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Brand ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BrandRequest'
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BrandResponse'
 *       404:
 *         description: Brand not found
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
brandRouter.put('/:id', isAuthenticated, updateBrandById);

/**
 * @swagger
 * /api/v1/brand/{id}:
 *   delete:
 *     summary: Delete a brand
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Brand ID
 *     responses:
 *       200:
 *         description: Brand deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Brand deleted
 *       404:
 *         description: Brand not found
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
brandRouter.delete('/:id', isAuthenticated, deleteBrandById);

module.exports = brandRouter;

const express = require('express');
const accountRouter = express.Router();
const { isAuthenticated } = require('../middleware/authenticate');
const {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccountById,
  deleteAccountById,
} = require('../controllers/accountController');

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Account management
 */

/**
 * @swagger
 * /api/v1/account:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AccountRequest'
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccountResponse'
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
accountRouter.post('/', isAuthenticated, createAccount);

/**
 * @swagger
 * /api/v1/account:
 *   get:
 *     summary: Get all accounts
 *     tags: [Accounts]
 *     responses:
 *       200:
 *         description: List of all accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AccountResponse'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */
accountRouter.get('/', getAllAccounts);

/**
 * @swagger
 * /api/v1/account/{id}:
 *   get:
 *     summary: Get account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Account found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccountResponse'
 *       404:
 *         description: Account not found
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
accountRouter.get('/:id', getAccountById);

/**
 * @swagger
 * /api/v1/account/{id}:
 *   put:
 *     summary: Update an account
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AccountRequest'
 *     responses:
 *       200:
 *         description: Account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccountResponse'
 *       404:
 *         description: Account not found
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
accountRouter.put('/:id', isAuthenticated, updateAccountById);

/**
 * @swagger
 * /api/v1/account/{id}:
 *   delete:
 *     summary: Delete an account
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Account deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Account deleted
 *       404:
 *         description: Account not found
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
accountRouter.delete('/:id', isAuthenticated, deleteAccountById);

module.exports = accountRouter;

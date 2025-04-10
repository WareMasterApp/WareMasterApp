const express = require('express');
const accountRouter = express.Router();
const accountController = require('../controllers/accountController');

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
 *       400:
 *         description: Bad request
 */
accountRouter.post('/', accountController.createAccount);

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
 *         description: Internal server error
 */
accountRouter.get('/', accountController.getAllAccounts);

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
 *       500:
 *         description: Internal server error
 */
accountRouter.get('/:id', accountController.getAccountById);

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
 *       400:
 *         description: Bad request
 *       404:
 *         description: Account not found
 */
accountRouter.put('/:id', accountController.updateAccount);

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
 *       500:
 *         description: Internal server error
 */
accountRouter.delete('/:id', accountController.deleteAccount);

module.exports = accountRouter;

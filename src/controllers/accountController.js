const Account = require('../models/Account');

const registerAccount = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const account = await Account.register({ name, email }, password);
    res.status(201).redirect('/');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createAccount = async (req, res) => {
  try {
    const { name, email, size, plan, password } = req.body;
    const account = await Account.register(
      { name, email, size, plan },
      password
    );
    delete account._doc.hash;
    delete account._doc.salt;
    return res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAccountById = async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAccountById = async (req, res) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerAccount,
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccountById,
  deleteAccountById,
};

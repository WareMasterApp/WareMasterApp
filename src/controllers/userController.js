const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      users,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({ msg: 'User not found' });
    }
  } catch (error) {
    console.log('Error fetching user: ', error);
    return res.status(500).json({ error: 'Fetching User Error' });
  }
};

const createUser = async (req, res) => {
  const accountId = req.session.user._id;
  try {
    const { fName, lName, email, role, status } = req.body;
    const user = await User.create({
      fName,
      lName,
      email,
      role,
      status,
      accountId,
    });
    return res.status(201).json({ user });
  } catch (error) {
    res.status(422).json({ error });
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { fName, lName, email, role, status, accountId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { fName, lName, email, role, status, accountId },
      {
        new: true,
      }
    );
    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({ msg: 'User not found' });
    }
  } catch (error) {
    console.log('Error updating user: ', error);
    return res.status(500).json({ error: 'Updating User Error' });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      return res.status(200).json({ msg: 'User deleted successfully' });
    } else {
      return res.status(404).json({ msg: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Deleting User Error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};

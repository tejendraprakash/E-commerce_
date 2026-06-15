const userService = require("../services/userService");

const getAllUsers = (req, res) => {
  try {
    const users = userService.getAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserById = (req, res) => {
  try {
    const { id } = req.params;
    const user = userService.getById(id);
    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createUser = (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required fields" });
    }
    const newUser = userService.create({ name, email });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    
    // Check if user exists first or try to update
    const updatedUser = userService.update(id, { name, email });
    if (!updatedUser) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    const wasRemoved = userService.remove(id);
    if (!wasRemoved) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

const users = require("../models/users");

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((u) => u.id === Number(id));
};

const create = (userData) => {
  const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser = {
    id: nextId,
    name: userData.name,
    email: userData.email
  };
  users.push(newUser);
  return newUser;
};

const update = (id, userData) => {
  const user = users.find((u) => u.id === Number(id));
  if (!user) {
    return undefined;
  }
  
  if (userData.name !== undefined) user.name = userData.name;
  if (userData.email !== undefined) user.email = userData.email;
  
  return user;
};

const remove = (id) => {
  const index = users.findIndex((u) => u.id === Number(id));
  if (index === -1) {
    return false;
  }
  users.splice(index, 1);
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};

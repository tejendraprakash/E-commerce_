const products = require("../models/products");

const getAll = () => {
  return products;
};

const getById = (id) => {
  return products.find((p) => p.id === Number(id));
};

const create = (productData) => {
  const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = {
    id: nextId,
    name: productData.name,
    description: productData.description,
    price: productData.price,
    stock: productData.stock
  };
  products.push(newProduct);
  return newProduct;
};

const update = (id, productData) => {
  const product = products.find((p) => p.id === Number(id));
  if (!product) {
    return undefined;
  }
  
  if (productData.name !== undefined) product.name = productData.name;
  if (productData.description !== undefined) product.description = productData.description;
  if (productData.price !== undefined) product.price = productData.price;
  if (productData.stock !== undefined) product.stock = productData.stock;
  
  return product;
};

const remove = (id) => {
  const index = products.findIndex((p) => p.id === Number(id));
  if (index === -1) {
    return false;
  }
  products.splice(index, 1);
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};

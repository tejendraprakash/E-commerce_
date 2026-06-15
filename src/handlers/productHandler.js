const productService = require("../services/productService");

const getAllProducts = (req, res) => {
  try {
    const products = productService.getAll();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = productService.getById(id);
    if (!product) {
      return res.status(404).json({ message: `Product with ID ${id} not found` });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createProduct = (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    if (!name || price === undefined || stock === undefined) {
      return res.status(400).json({ message: "Name, price, and stock are required fields" });
    }
    const newProduct = productService.create({
      name,
      description: description || "",
      price: Number(price),
      stock: Number(stock)
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    
    const updatedProduct = productService.update(id, {
      name,
      description,
      price: price !== undefined ? Number(price) : undefined,
      stock: stock !== undefined ? Number(stock) : undefined
    });
    
    if (!updatedProduct) {
      return res.status(404).json({ message: `Product with ID ${id} not found` });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    const wasRemoved = productService.remove(id);
    if (!wasRemoved) {
      return res.status(404).json({ message: `Product with ID ${id} not found` });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

const { Layout, AddProductForm } = require("../templates.js");
const { listCategories } = require("../model/categories.js");
const { createProduct } = require("../model/products.js");

function get(req, res) {
  const title = "Add product";
  const categories = listCategories();
  const content = AddProductForm({ title, categories });
  const body = Layout({ title, content });
  res.send(body);
}

function post(req, res) {
  const { name, quantity_per_unit, unit_price, category_id } = req.body;
  const errors = {};
  if (!name) {
    errors.name = "Please enter a product name";
  }
  if (!quantity_per_unit) {
    errors.qty = "Please enter the quantity per unit";
  }
  if (!unit_price) {
    errors.qty = "Please enter a price";
  }
  if (!category_id) {
    errors.qty = "Please select a category";
  }
  if (Object.keys(errors).length > 0) {
    const title = "Error: Add product";
    const categories = listCategories();
    const content = AddProductForm({ title, categories, errors });
    const body = Layout({ title, content });
    res.status(400).send(body);
  } else {
    const newProduct = { name, quantity_per_unit, unit_price, category_id };
    const { id } = createProduct(newProduct);
    res.redirect(`/product/${id}`);
  }
}

module.exports = { get, post };

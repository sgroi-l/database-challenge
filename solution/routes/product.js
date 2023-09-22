const { Layout } = require("../templates.js");
const { getProduct } = require("../model/products.js");

function get(req, res) {
  const id = req.params.id;
  const product = getProduct(id);
  let title = "";
  let content = "";
  if (!product) {
    res.status(404);
    title = "Product not found";
    content = "<h1>Product not found</h1>";
  } else {
    title = product.name;
    content = /*html*/ `
      <h1>${product.name}</h1>
      <span>${product.category_name}, ${product.category_description}</span>
    `;
  }
  const body = Layout({ title, content });
  res.send(body);
}

module.exports = { get };

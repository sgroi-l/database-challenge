const { listProducts } = require("../model/products.js");
const { Layout, Table } = require("../templates.js");

function get(req, res) {
  const products = listProducts();
  let title = "";
  let content = "";
  if (!products.length) {
    res.status(404);
    title = "No products found";
    content = "<h1>No products found</h1>";
  } else {
    title = "Products";
    content = Table({ caption: title, data: products });
  }
  const body = Layout({ title, content });
  res.send(body);
}

module.exports = { get };

const test = require("node:test");
const assert = require("node:assert");
const { listProducts } = require("../src/model/products.js");

test("listProducts() calculates the stock value", () => {
  const products = listProducts();
  const product = products[0];
  assert.equal(product.stock_value, 702);
});

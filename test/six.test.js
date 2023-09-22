const test = require("node:test");
const assert = require("node:assert");
const { listProducts } = require("../src/model/products.js");

test("listProducts() returns formatted currencies", () => {
  const products = listProducts();
  const product = products[0];
  assert.equal(product.unit_price, "£18.00");
  assert.equal(product.stock_value, "£702.00");
});

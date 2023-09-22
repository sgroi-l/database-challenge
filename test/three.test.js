const test = require("node:test");
const assert = require("node:assert");
const { getProduct } = require("../src/model/products.js");

test("getProduct can retrieve a single product by ID", () => {
  const product = getProduct(1);
  assert.equal(product.id, 1);
  assert.equal(product.name, "Chai");
});

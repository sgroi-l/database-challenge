const test = require("node:test");
const assert = require("node:assert");
const { searchProducts } = require("../src/model/products.js");

test("searchProducts can match a single product", () => {
  const products = searchProducts("chai");
  assert.equal(
    products.length,
    1,
    `received ${products.length} products, expected 1`
  );
  const expected = {
    id: 1,
    name: "Chai",
  };
  assert.deepEqual(products[0], expected);
});

test("searchProducts can match many products", async () => {
  const products = searchProducts("ch");
  assert.equal(
    products.length,
    14,
    `received ${products.length} products, expected 6`
  );
  const expected = {
    id: 48,
    name: "Chocolade",
  };
  assert.deepEqual(products[5], expected);
});

const test = require("node:test");
const assert = require("node:assert");
const { listProducts } = require("../src/model/products.js");

test("listProducts() returns all products", () => {
  const products = listProducts();
  assert.equal(
    products.length,
    77,
    `received ${products.length} products, expected 77`
  );
  const product = products[0];
  assert.equal(product.id, 1);
  assert.equal(product.name, "Chai");
  assert.equal(product.quantity_per_unit, "10 boxes x 20 bags");
  assert.ok(product.unit_price);
  assert.equal(product.units_in_stock, 39);
  assert.equal(product.units_on_order, 0);
});

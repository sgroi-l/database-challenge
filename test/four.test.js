const test = require("node:test");
const assert = require("node:assert");
const { getProduct } = require("../src/model/products.js");

test("getProduct retrieves associated category info", () => {
  const product = getProduct(1);
  assert.equal(product.category_name, "Beverages");
  assert.equal(
    product.category_description,
    "Soft drinks, coffees, teas, beers, and ales"
  );
});

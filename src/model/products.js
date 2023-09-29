const db = require("../database/db.js");

const select_products = db.prepare(/*sql*/ `
SELECT
id,
name,
quantity_per_unit,
FORMAT('£%.2f', unit_price) AS unit_price,
units_in_stock,
FORMAT('£%.2f', unit_price * units_in_stock) AS stock_value,
units_on_order
FROM products`);

function listProducts() {
  return select_products.all();
}

const find_products = db.prepare(/*sql*/ `
SELECT 
    name,
    id
 FROM products
 WHERE name LIKE ?
 `);

function searchProducts(search_string) {
  return find_products.all("%" + search_string + "%");
}

const search_product = db.prepare(/*sql*/ `
SELECT 
    products.name,
    products.id,
    categories.name AS category_name,
    categories.description AS category_description

 FROM products
 JOIN categories ON products.category_id = categories.id
 WHERE products.id = ?
 `);

function getProduct(id) {
  return search_product.get(id);
}

const insert_product = db.prepare(/*sql*/ `
  INSERT INTO products (name, quantity_per_unit, category_id)
  VALUES(
    $name,
    $quantity_per_unit,
    $category_id
  )
  RETURNING id
`);

function createProduct(newProduct) {
  return insert_product.get(newProduct);
}

module.exports = { listProducts, searchProducts, getProduct, createProduct };

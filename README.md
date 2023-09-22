# Database challenge

Practice using a SQLite database to power a Node/Express web app.

## Setup

Make sure you have Git and Node (v18) installed.

1. [Use this template](https://github.com/foundersandcoders/database-challenge/generate), clone your copy, cd into it
1. Run `npm install` to install all the dependencies
1. Run `npm run seed` to seed the database with some example data
1. Run `npm run dev` to start the server.  
   This uses the `nodemon` library to auto-restart the server when you save changes.

This app already has the routes and templates created. Your job is to fill out the model functions so the routes can access the data they need.

Note: you won't be able to load pages without errors until you've completed the challenges below.

## Checking your work

Each challenge has associated unit tests. You can either run all the tests with `npm test`, or each individual challenge's tests with `npm run test:1`, `npm run test:2` etc.

Make sure you read test failures carefully—the output can be noisy but the error message should provide useful information to help you.

## Database schema

This app includes a database for a fake business. It includes information on the business' customers, products, orders etc. It's helpful to know the structure of the database before working with it. You can either read `database/schema.sql`, or expand the sections below.

<details>
<summary><code>products</code></summary>

| column            | type    | constraints                        |
| ----------------- | ------- | ---------------------------------- |
| id                | integer | primary key autoincrement          |
| product_name      | text    | not null                           |
| category_id       | integer | references categories(category_id) |
| quantity_per_unit | text    |                                    |
| unit_price        | numeric | default 0                          |
| units_in_stock    | integer | default 0                          |
| units_on_order    | integer | default 0                          |

</details>

<details>
<summary><code>categories</code></summary>

| column      | type    | constraints               |
| ----------- | ------- | ------------------------- |
| id          | integer | primary key autoincrement |
| name        | text    |                           |
| description | text    |                           |

</details>

## Challenge 1: List all products

Write and export a new function named `listProducts` in `model/products.js`. This function should retrieve all products from the `products` DB table and return the `id`, `name`, `quantity_per_unit`, `unit_price`, `units_in_stock` and `units_on_order` columns.

This function is used in `routes/products.js`. Once you've finished it you should be able to see a table of all products if you visit the `/` route in your browser.

## Challenge 2: Search products

Write and export a new function named `searchProducts` in `model/products`. This function should take a search string, then return any products in the `products` table whose name contains that string. Each product should include the `id` and `name` columns. For example `searchProducts("iscu")` should return `[{ id: 19, name: "Teatime Chocolate Biscuits" }]`.

This function is used in `routes/search.js`. Once you've finished it you should be able to visit `/search` in your browser and use the search form to browse the products.

## Challenge 3: Get specific product

Write and export a new function named `getProduct` in `model/products`. It should take an ID, then return the matching product from the `products`table. It should return the`id`and`name` columns.

This function is used in `routes/product.js`. Once you've finished it you should be able to see a page for one specific product if you visit the `/product/:id` in your browser (e.g. `/product/1`, `/product/34` etc).

## Challenge 4: Add category info

Amend the query used in `getProduct` to also include columns called `category_name` and `category_description`. You will need to retrieve this info from the `categories` table.

Once complete you should see this additional info show up on the product pages in your browser (e.g. `/product/1`).

## Challenge 5: calculate stock value

Amend the query used in `listProducts` to also calculate the `stock_value`—the result of multiplying `unit_price` by `units_in_stock` for each product. Try to do this without writing any JavaScript.

## Challenge 6: format currencies

The currencies in the products table are just normal numbers, with an arbitrary number of decimal places. It would be more user-friendly to format these as currency values rounded to 2 decimal places. Use the built-in SQLite [`format` function](https://www.sqlite.org/printf.html#formatting_details) to format the `unit_price` and `stock_value` columns as 2-decimal-place GBP (e.g. `£2.57`).

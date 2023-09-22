const { searchProducts } = require("../model/products.js");
const { Layout } = require("../templates.js");

function get(req, res) {
  const { search = "" } = req.query;
  let title = "Search";
  let results;
  if (search) {
    results = searchProducts(search);
    title = `${results.length} results | Search products`;
  } else {
    title = "Search products";
  }
  const content = /*html*/ `
    <h1>Search products</h1>
    <form method="GET">
      <p><input type="search" name="search" value="${search}"></p>
      <p><button>Search</button></p>
    </form>
    ${Output(results)}
  `;
  const body = Layout({ title, content });
  res.send(body);
}

/**
 * This isn't reused on other pages,
 * so we can keep it here for now.
 * If we want to re-use it later we can move to templates.js
 */
function Output(results) {
  console.log(results);
  // There was no search
  if (!results) {
    return "";
  }
  // There was a search, but no results
  if (!results.length) {
    return "<h2>No results found</h2>";
  }
  // There was a search and we got results
  return `
    <h2>Results</h2>
    <ul>${results.map(Result).join("")}</ul>
  `;
}

function Result(product) {
  return /*html*/ `
    <li>
      <a href="/products/${product.id}">${product.name}</a>
    </li>
  `;
}

module.exports = { get };

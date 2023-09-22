const db = require("../database/db.js");

module.exports = { listCategories };

const select_categories = db.prepare(/*sql*/ `
  SELECT id, name FROM categories
`);

function listCategories() {
  return select_categories.all();
}

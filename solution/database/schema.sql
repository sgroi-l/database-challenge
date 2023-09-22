PRAGMA foreign_keys = ON;

BEGIN;

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  quantity_per_unit TEXT,
  unit_price NUMERIC DEFAULT 0,
  units_in_stock INTEGER DEFAULT 0,
  units_on_order INTEGER DEFAULT 0,
  CHECK (unit_price>=(0)),
  CHECK (units_in_stock>=(0)),
  CHECK (units_on_order>=(0))
);

-- Help the DB quickly find products by their name later.
-- This will make searching by name faster.
-- E.g. the index will look like:
-- name  | row_id
-- Chai  | 1
-- Chang | 2
-- etc...
-- So when we say "find product with name Chai" it can jump straight to the row
-- If we include all columns we need here then SQLite will not even need to access the original table
CREATE INDEX IF NOT EXISTS product_names ON products(name);

COMMIT;

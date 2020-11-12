DROP TABLE IF EXISTS websites;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS product_data;

CREATE TABLE websites (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    brand TEXT NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE product_data (
    id SERIAL PRIMARY KEY,
    listed_name TEXT NOT NULL,
    price INTEGER NOT NULL CONSTRAINT positive_price CHECK (price > 0),
    website_id INTEGER REFERENCES websites (id),
    product_id INTEGER REFERENCES products (id),
    category_id INTEGER REFERENCES categories (id)
);

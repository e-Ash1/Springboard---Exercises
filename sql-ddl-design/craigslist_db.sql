DROP DATABASE IF EXISTS cl_db;

CREATE DATABASE cl_db;

/c cl_db;

CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    region TEXT NOT NULL
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    number_posts INTEGER NOT NULL DEFAULT 0,
    region_id INT REFERENCES regions(id)
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    post_text TEXT NOT NULL,
    user_id INT REFERENCES users(id),
    region_id INT REFERENCES regions(id)
);

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL
);

CREATE TABLE post_categories(
    post_id INT REFERENCES posts(id),
    category_id INT REFERENCES categories(id),
    PRIMARY KEY (post_id, category_id)
);


--Regions:
INSERT INTO regions (region) VALUES ('San Francisco');
INSERT INTO regions (region) VALUES ('Atlanta');
INSERT INTO regions (region) VALUES ('Seattle');

--Users:

INSERT INTO users (username, region_id) VALUES ('billyBob', 1);
INSERT INTO users (username, region_id) VALUES ('HippoBottleMus', 2);


--Posts:
INSERT INTO posts (title, post_text, user_id, region_id) VALUES ('Boston Creme Donuts are AMAZING', 'Boston is amazing, so are their donuts.', 1, 1);
INSERT INTO posts (title, post_text, user_id, region_id) VALUES ('Starbucks Coffee is overrated', 'I said what I said.... 2', 2, 2);

--Categories:
INSERT INTO categories (category_name) VALUES ('Food');
INSERT INTO categories (category_name) VALUES ('Other');
INSERT INTO categories (category_name) VALUES ('Housing');

--Post Categories:
INSERT INTO post_categories (post_id, category_id) VALUES (1, 1); 
INSERT INTO post_categories (post_id, category_id) VALUES (2, 2);  
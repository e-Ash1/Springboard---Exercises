DROP IF EXISTS pet_db;
CREATE DATABASE pet_db;

\c pet_db;

CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    species VARCHAR NOT NULL,
    photo_url VARCHAR,
    age INTEGER,
    notes TEXT,
    available BOOLEAN DEFAULT TRUE
);

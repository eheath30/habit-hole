-- DROP TABLE IF EXISTS users

CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar(16) NOT NULL UNIQUE,
    password_digest varchar(200) NOT NULL
);

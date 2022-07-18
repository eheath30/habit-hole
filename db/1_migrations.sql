-- DROP TABLE IF EXISTS users

CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar(16) NOT NULL UNIQUE,
    password_digest varchar(200) NOT NULL
);

CREATE TABLE habits (
    id serial PRIMARY KEY,
    userid int,
    sleeptarget int,
    sleepdate date[],
    sleephours int[]
);

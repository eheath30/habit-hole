-- DROP TABLE IF EXISTS users

CREATE TABLE users {
    id serial PRIMARY KEY,
    username varchar(16) NOT NULL UNIQUE
    password_digest varchar(20) NOT NULL
}

CREATE TABLE habits {
    id serial PRIMARY KEY,
    user_id int,
    sleep_target int,
    sleep_date date[10],
    sleep_hours int[10]
}

CREATE TABLE habits (
    id serial PRIMARY KEY,
    userid int,
    sleeptarget int,
    sleepdate date[],
    sleephours int[]
);

-- DROP TABLE IF EXISTS reset_codes;
-- DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friendships;

CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     first           VARCHAR NOT NULL CHECK (first != ''),
     last            VARCHAR NOT NULL CHECK (last != ''),
     email           VARCHAR NOT NULL UNIQUE CHECK (email != ''),
     hashed_password VARCHAR NOT NULL CHECK (hashed_password != ''),
     imageurl VARCHAR ,
     bio VARCHAR,
    
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

 CREATE TABLE friendships(
   id SERIAL PRIMARY KEY,
   sender_id INT REFERENCES users(id) NOT NULL,
   recipient_id INT REFERENCES users(id) NOT NULL,
   accepted BOOLEAN DEFAULT false
);

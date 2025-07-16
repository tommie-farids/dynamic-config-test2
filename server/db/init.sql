CREATE DATABASE IF NOT EXISTS carastoremini;

USE carastoremini;

GRANT ALL ON carastoremini.* TO 'admin'@'localhost';

FLUSH PRIVILEGES;

DROP TABLE IF EXISTS products;

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    img VARCHAR(255) NOT NULL
);
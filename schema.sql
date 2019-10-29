CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price INTEGER(10) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", 300, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Headphones", "Electronics", 100, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Boxing Gloves", "Fitness", 60, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jump Rope", "Fitness", 20, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sand Bags", "Fitness", 120, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Eggs", "Food", 5, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ribeye", "Food", 30, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Milk", "Food", 5, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tires", "Automotive", 200, 600);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Seat Covers", "Automotive", 45, 100);
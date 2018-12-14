create database bamazon_db;

use bamazon_db;

create table products (
item_id int not null auto_increment primary key,
product_name varchar(100),
department_name varchar(50),
price decimal(10, 2), 
stock_quantity int
);

insert into products (product_name, department_name, price, stock_quantity)
values
("Poinsettia", "Floral", 25.00, 20),
("Live Christmas Tree", "Floral", 50.00, 10),
("Wrapping paper, 1 roll", "Stationery", 4.50, 25),
("Bows, 1 bag", "Stationery", 1.99, 10),
("Scotch tape, 1 roll", "Stationery", 2.59, 15),
("Mistletoe", "Floral", 2.00, 10),
("Ham", "Grocery", 25.00, 15),
("Dark Chocolate Covered Peppermint Jo-Jos", "Grocery", 4.00, 8),
("Holiday Favorites CD", "Music", 9.99, 5),
("Christmas shopping completed for all your hard-to-buy-for-family-members", "Wishful_thinking", 10000.00, 1);




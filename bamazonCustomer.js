var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "JeepJKU2015",
    database: "bamazon_DB"
});

//Connect to mysql
connection.connect(function (err) {
    if (err) throw err;
    showProducts();
});

//Function to display inventory list, uses cli-table
function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table(
            {
                head: ["id", "product_name", "department_name", "price", "stock_quantity"],
                colWidths: [5, 15, 20, 10, 20],
            }
        );
        for (let i = 0; i < res.length; i++) {
            table.push(
                [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            )
        };
        console.log(table.toString());
        start();
    })
}

//function to initiate the app and ask user to submit what they would like to buy
function start() {
    console.log("--------------WELCOME TO BAMAZON!----------------")
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "Enter the ID Number of the product you would like to purchase",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "units",
                type: "input",
                message: "How many would you like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (shoppingCart) {
            const orderID = shoppingCart.item;
            const orderQuantity = shoppingCart.units;

            connection.query('SELECT * FROM products', function (err, chosenItem) {
                if (err) throw err;

                if (chosenItem[0].stock_quantity - orderQuantity >= 0) {
                    console.log("Item in stock");
                    console.log("Your total will be $" + (chosenItem[0].price * orderQuantity));
                    connection.query(
                        'UPDATE products SET ? WHERE ?',
                        [
                            {
                                stock_quantity: chosenItem[0].stock_quantity - orderQuantity
                            },
                            {
                                id: orderID
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " products updated!\n");
                            showProducts();
                        });
                } else {
                    console.log("Sorry, we currently have insufficent stock to complete your order")
                    showProducts();
                }
            })
        })
}



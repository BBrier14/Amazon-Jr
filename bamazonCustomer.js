var mysql = require("mysql");
var inquirer = require("inquirer");

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

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    showProducts();
});

function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        start();
    })
}

function start() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "Enter the ID Number of the product you would like to purchase"
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
                    connection.query('UPDATE products SET stock_quantity=? WHERE= ?', [chosenItem[0].stock_quantity - orderQuantity, orderID,],
                        function (err, inventory) {
                            if (err) throw err;
                            showProducts();
                        });
                } else{
                    console.log("Sorry, we currently have insufficent stock to complete your order")
                }
                start();
            })
        })
}
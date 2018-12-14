var mysql = require("mysql");

var inquirer = require("inquirer");

var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    displayTable();
});



function displayTable() {
    const table = new Table({
        head: ['ID', 'Product Name', 'Department Name', 'Price', "Stock Quantity"],
        colWidths: [10, 80, 20, 10, 15]
    });
    connection.query("SELECT * FROM products", function (err, res) {
          if (err) throw err;
          for (var i = 0; i < res.length; i++) {

            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            )
            
        };
        console.log(table.toString());
        sellProduct();
     }
    )};
    
function sellProduct(){
    inquirer
    .prompt([
        {
        name: "item",
        type: "integer",
        message: "What is the ID number of the item you would like?"
    },
    {
        name: "howmany",
        type: "integer",
        message:  "How many would you like?"
    }
]   ).then(function(answers){
    var itemID = answers.item;
    var numRequested = answers.howmany;
    verifyQty(itemID, numRequested);

})
};

function verifyQty(itemID, numRequested){
    connection.query("SELECT stock_quantity FROM products WHERE item_ID=?", itemID, function(err, res){
        if (err) throw err;
        if (numRequested > res[0].stock_quantity){
            console.log("Insufficient quantity");
            connection.end();
        } else {
            completeOrder(itemID, numRequested);
          
        }
    } )
};

function completeOrder(itemID, numRequested){
    connection.query("SELECT * FROM products WHERE item_ID=?", itemID, function(err, res){
        if (err) throw err;
        const newQuantity = res[0].stock_quantity - numRequested;
        const moneyDue = res[0].price * numRequested;
        console.log("The total cost of your purchase is $" +moneyDue);
        connection.query("UPDATE products SET stock_quantity = ? WHERE item_id=?", [newQuantity, itemID], function(err, res){
            if (err) throw err;
            console.log(newQuantity);
            
        });
        connection.end();
    })
};



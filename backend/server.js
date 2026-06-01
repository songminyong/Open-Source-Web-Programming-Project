const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "store_db"
});

con.connect(function(err) {
    if(err) throw err;
    console.log("Connected to MySQL Database");
});

app.get("/products", function(req, res) {
    var sql = "SELECT * FROM products";

    con.query(sql, function(err, result, fields) {
        if(err) throw err;
        res.send(result);
    });
});

app.get("/jewelery", function(req, res) {
    var sql = "SELECT * FROM products WHERE category = 'jewelery'";

    con.query(sql, function(err, result, fields) {
        if(err) throw err;
        res.send(result);
    });
});

app.post("/add-product", function(req, res) {
    const title = req.body.title;
    const price = req.body.price;
    const image = req.body.image;
    const category = req.body.category;

    const sql = 
        "INSERT INTO products (title, price, image, category) VALUES (?, ?, ?, ?)";

        con.query(sql, [title, price, image, category], function(err, result) {
            if(err) return res.json(err);
            return res.json({
                message: "Product inserted successfully"
            });
        });
});

app.listen(5000, function() {
    console.log("Server is running on port 5000");
});

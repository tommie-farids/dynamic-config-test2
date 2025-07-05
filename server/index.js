import "dotenv/config"

import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 8080

const mysqlHost = process.env.MYSQL_HOST,
    mysqlUser = process.env.MYSQL_USER,
    mysqlPassword = process.env.MYSQL_PASSWORD,
    mysqlDB = process.env.MYSQL_DATABASE;

const db = mysql.createConnection({
    host: mysqlHost,
    user: mysqlUser,
    password: mysqlPassword,
    database: mysqlDB
});

db.connect(err => {
    if (err) {
        console.error(`Error connecting to MySQL database: ${err.stack}`);
        return
    }
    app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello from the server!");
});

app.get("/products", (req, res) => {
    let q = "SELECT * FROM products"
    db.query(q, (err, results) => {
        if (err) {
            res.json(err.sqlMessage);
        }
        res.json(results);
    });
});

app.post("/products", (req, res) => {
    let { name, description, price, img } = req.body;
    let values = [name, description, price, img];
    let q = "INSERT INTO products ('name', 'description', 'price', 'img') ?"

    db.query(q, [values], (err, result) => {
        if (err) {
            res.json(err.sqlMessage);
        }
        res.json(result);
    });
});

app.put("/products/:id", (req, res) => {
    let productId = req.params.id;
    let { name, description, price, img } = req.body;
    let values = [name, description, price, img];
    let q = "UPDATE products SET ('name'= ?, 'description'= ?, 'price'= ?, 'img'= ? WHERE id = ?"

    db.query(q, [...values, productId], (err, result) => {
        if (err) {
            res.json(err.sqlMessage);
        }
        res.json(result);
    });
});

app.delete("/products/:id", (req, res) => {
    let productId = req.params.id;
    let q = "DELETE FROM products WHERE id = ?"

    db.query(q, [productId], (err, result) => {
        if (err) {
            res.json(err.sqlMessage);
        }
        res.json(result);
    });
});


// let q = "SHOW DATABASES LIKE 'carastoremini'";

// db.query(q, (err, result) => {
//     if (err) {
//         console.error(`Error executing query: ${err.stack}`);
//     }

//     if (result.length == 0) {
//         db.query("CREATE DATABASE carastoremini", (err, result) => {
//             if (err) {
//                 console.error(`Error creating database: ${err.stack}`);
//             }
//             console.log("Database created successfully");
//             db.query("USE carastoremini", err => {
//                 if (err) {
//                     console.error(`Error selecting database: ${err.stack}`);
//                 }
//             });
//         });
//     }
// });
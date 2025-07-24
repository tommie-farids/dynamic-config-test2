import "dotenv/config"

import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();

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
    console.log("Database connected with ID:", db.threadId);
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello from the server!");
});

app.get("/products", (_, res) => {
    let q = "SELECT * FROM products";
    db.query(q, (err, results) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json(results);
    });
});

app.post("/products", (req, res) => {
    let { name, description, price, img } = req.body;
    let values = [name, description, price, img];
    let q = "INSERT INTO products (`name`, `description`, `price`, `img`) VALUES (?)";

    db.query(q, [values], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.json(result);
    });
});

app.put("/products/:id", (req, res) => {
    let { id } = req.params;
    let { name, description, price, img } = req.body;
    let values = [name, description, price, img];
    let q = "UPDATE products SET `name` = ?, `description` = ?, `price` = ?, `img` = ? WHERE id = ?";

    db.query(q, [...values, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.json(result);
    });
});

app.delete("/products/:id", (req, res) => {
    let { id } = req.params;
    let q = "DELETE FROM products WHERE id = ?";

    db.query(q, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json(result);
    });
});

export {
    app,
    db
};
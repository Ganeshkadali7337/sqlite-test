const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(cors());

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
const db = require("./taskManagement");

// GET all books
app.get("/books", (req, res, next) => {
  db.all("SELECT * FROM books", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// POST a new book
app.post("/book", (req, res, next) => {
  const errors = [];
  if (!req.body.author) {
    errors.push("No author specified");
  }
  if (!req.body.name) {
    errors.push("No name specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  const data = {
    name: req.body.name,
    author: req.body.author,
  };
  const sql = "INSERT INTO books (name, author) VALUES (?,?)";
  const params = [data.name, data.author];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

// additional routes can be added for UPDATE and DELETE operations

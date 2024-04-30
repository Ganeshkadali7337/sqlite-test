const sqlite3 = require("sqlite3").verbose();
const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text, 
      author text
    )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          const insert = "INSERT INTO books (name, author) VALUES (?,?)";
          db.run(insert, ["Book One", "Author One"]);
          db.run(insert, ["Book Two", "Author Two"]);
        }
      }
    );
  }
});

module.exports = db;

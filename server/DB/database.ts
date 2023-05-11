import mysql from "mysql2";

require("dotenv").config();

const sqlPassword = process.env.SQLPASSWORD;
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: sqlPassword,
  database: "pizzaMesh",
});

connection.connect((err) => {
  try {
    if (err) throw err;
    console.log("SQL connected");
  } catch (error) {
    console.error(error);
  }
});

// const query = `INSERT INTO blockbuster.movies (title, duration) VALUES ("movie3", "55");`;
//   connection.query(query, (err, results, fields) => {
//     try {
//       if (err) throw err;
//       // console.log(results);
//     } catch (error) {
//       console.log(error);
//     }
//   });

const query = `SELECT * FROM pizzaMesh.pizzas;`;
  connection.query(query, (err, results, fields) => {
    try {
      if (err) throw err;
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  });

export default connection;
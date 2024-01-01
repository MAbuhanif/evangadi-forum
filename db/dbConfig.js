const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  user: process.env.USER,
  database: process.env.DATABASE,
  host: "localhost",
  password: process.env.PASSWORD,
  connectionLimit: 10,
});

// dbConnection.execute("select 'test'", (err, result) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(result);
//   }
// });

module.exports = dbConnection.promise();

// CREATE TABLE users(
// 	userid INT(20) NOT NULL AUTO_INCREMENT,
//     username VARCHAR(20) NOT NULL,
//     firstname VARCHAR(20) NOT NULL,
//     lastname VARCHAR(20) NOT NULL,
//     email VARCHAR(20) NOT NULL,
//     password VARCHAR(100) NOT NULL,
//     PRIMARY KEY(userid)
    
// );

// CREATE TABLE questions(
//  questionid INT NOT NULL AUTO_INCREMENT,
//     userid INT(20) NOT NULL,
//     title VARCHAR(50) NOT NULL,
//     description VARCHAR(200) NOT NULL,
//     tag VARCHAR(20),
//     PRIMARY KEY(questionid),
//     FOREIGN KEY(userid) REFERENCES users(userid)
// );
// CREATE TABLE answers(
//     questionid INT NOT NULL,
// 	answerid INT(20) NOT NULL AUTO_INCREMENT,
//     userid INT(20) NOT NULL,
//     answer VARCHAR(200) NOT NULL,
//     PRIMARY KEY(answerid),
//     FOREIGN KEY(questionid) REFERENCES questions(questionid),
//     FOREIGN KEY(userid) REFERENCES users(userid)
// );
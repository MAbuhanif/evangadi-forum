const express = require("express");
const app = express();
const port = 5500;

const dbConnection = require("./db/dbConfig");

//user route middleware file
const userRoutes = require("./routes/userRoute");

//question route middleware file
const questionRoutes = require("./routes/questionRoute");

//question route middleware file
const answerRoutes = require("./routes/answerRoute");

//JSON middleware
app.use(express.json());

//user route middleware
app.use("/api/users", userRoutes);
//question route middleware
app.use("/api/question", questionRoutes);
//user route middleware
app.use("/api/answer", answerRoutes);

async function start() {
  try {
    const result = await dbConnection.execute("select 'test'");
    await app.listen(port);
    console.log("database connection established");
    console.log(`listinig on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();

// app.listen(port, (err) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(`listining on ${port}`);
//   }
// });

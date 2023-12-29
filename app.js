const express = require("express");
const app = express();
const port = 5500;

const dbConnection = require("./db/dbConfig");

//user route middleware file
const userRoutes = require("./routes/userRoute");

//JSON middleware
app.use(express.json());

app.use("/api/users", userRoutes);
//user route middleware

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

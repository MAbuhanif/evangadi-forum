require("dotenv").config();
const express = require("express");
const app = express();
const port = 5500;

//security packeges
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const dbConnection = require("./db/dbConfig");

//user route middleware file
const userRoutes = require("./routes/userRoute");

//question route middleware file
const questionRoutes = require("./routes/questionRoute");

//question route middleware file
const answerRoutes = require("./routes/answerRoute");

//authentication middleware
const authMiddleware = require("./middleware/authMiddleware");

//using security middlewares
app.use(cors());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000, //5 minutes
    max: 100, //limit each IP to 100 requests per windowMs
  })
);

//JSON middleware
app.use(express.json());

//user route middleware
app.use("/api/users", userRoutes);
//question route middleware
app.use("/api/question", authMiddleware, questionRoutes);
//user route middleware
app.use("/api/answer", authMiddleware, answerRoutes);

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



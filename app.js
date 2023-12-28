const express = require("express");
const app = express();
const port = 5500;


const userRoutes = require("./routes/userRoute");//user route middleware file


app.use("/api/users", userRoutes);//user route middleware

app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`listining on ${port}`);
  }
});

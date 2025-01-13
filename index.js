const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080;

const userRouter = require("./routes/user");
const { connectMongoDB } = require("./connection");
const { logReqRes } = require("./middlewares");

// database connection
connectMongoDB("mongodb://localhost:27017/myApp");

// Middleware - plugin
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logReqRes("log.txt"));

//Routers
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`server is listening on PORT: ${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const ConnectionDB = require("./Database/db.js");
//database connection
ConnectionDB();

//Routes path
const authRoute = require("./routes/authRoutes.js");

//dotenv
dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE;

//API Routes
app.use("/", authRoute);
app.use("/openai", require("./routes/openaiRoutes.js"));

//server listen
app.listen(PORT, () => {
  console.log(
    `Server Start At ${DEV_MODE} Port Number ${PORT}.`.bgWhite.black.bold
  );
});

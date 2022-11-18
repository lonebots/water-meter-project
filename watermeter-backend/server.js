const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const sequelize = require("./config/db");
const error = require("./middlewares/error");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

//schema initialize
const User = require("./schemas/User");
const Muncipality = require("./schemas/Muncipality");
const Price = require("./schemas/Price");
const Billing = require("./schemas/Billing");

//initialize express app
const app = express();

//loads all env variables
dotenv.config({ path: "./config/config.env" });

//Body parsing
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//connecting to database
const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connectDb();

//syncing models sequelize
const syncModel = async () => {
  try {
    await User.sync();
    await Price.sync();
    await Muncipality.sync();
    await Billing.sync();

    console.log("Successfully synced all models");
  } catch (err) {
    console.error("Failed in syncing models", err);
  }
};
syncModel();

//Initialize routes
const auth = require("./routes/auth");
const muncipality = require("./routes/muncipality");

//use cors
app.use(cors());

//routes
app.use("/api/user", auth);
app.use("/api/munci", muncipality);

//Initialize morgan
app.use(logger("dev"));

//cookie parser
app.use(cookieparser());

//Error Handler
app.use(error);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);

//Handling unhandled promise rejections
process.on("SequelizeAccessDeniedError", (error, promise) => {
  console.log(`Error:${error.message}`);

  //Close the server and exit process
  server.close(() => process.exit(1));
});

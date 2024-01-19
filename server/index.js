const Express = require("express");
const app = Express();
// routes
const auth = require("./routes/auth");
const signup = require("./routes/signup");
const me = require("./routes/me");
const reset = require("./routes/forgotpassword");
const verify = require("./routes/verification");
const editUser = require("./routes/editUser");
const editSettings = require("./routes/editSettings");
const editTasks = require("./routes/editTasks");
const userData = require("./routes/userData");
const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound");
const cors = require("cors");

const feedBack = require("./routes/feedBack");

const cookieParser = require("cookie-parser");

// configurations
const localIP = require("./startup/privateIP");

const mongoose = require("mongoose");
require("dotenv").config();

// cors
app.use(cors());

// default engine
app.set("view engine", "pug");

// parse incoming data
app.use(Express.json());

// cookie parser
app.use(cookieParser());

// check if a secret pharase is set

if (!process.env.pro_focus_jwtKey) {
  console.log("jwtKey variable must be set");
  process.exit(1);
}

// send a static html
app.get("/", async (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// app routes
app.use("/auth", auth);
app.use("/signup", signup);
app.use("/me", me);
app.use("/verification", verify);
app.use("/resetpassword", reset);
app.use("/editUser", editUser);
app.use("/editSettings", editSettings);
app.use("/editTasks", editTasks);
app.use("/userData", userData);
app.use("/feed-back", feedBack);

// handlling express errors
app.use((err, req, res, next) => {
  console.log(err.message);
  // logger.debug(err.message);
  res.status(500).send("Something broke!");
});

// serve static files
app.use(Express.static("/"));

// unavailable routes
app.use(notFound);

// connecting to the database
const mongoDbUri = `mongodb+srv://${process.env.db_user_name}:${process.env.db_password}@atlascluster.t8zzfhk.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`;

const connectionParams = {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(mongoDbUri, connectionParams)
  .then(() => console.log("Connected to the database"))
  .catch((e) => {
    logger.error(`DB connection error: ${e.message}`);
    console.log(`error ${e.message}`);
  });

// stating the server
const port = process.env.PORT || 3000;

// for testing in the LAN
if (process.env.NODE_ENV == "development") {
  localIP();
}

app.listen(port, () => {
  if (process.env.NODE_ENV == "development") {
    console.log(`network ${process.env.app_domain_name}`);
  }
  console.log("app is running");
});

// projest base directory
global.__basedir = __dirname;

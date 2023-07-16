const Express = require("express");
const app = Express();
// routes
const auth = require("./routes/auth");
const signup = require("./routes/signup");
const me = require("./routes/me");
const reset = require("./routes/resetpassword");
const verify = require("./routes/verification");
const editUser = require("./routes/editUser");
const editTasks = require("./routes/editTasks");
// middlewares
const requestPath = require("./middleware/req");
// const logger = require("./startup/logging");
const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const cookieParser = require("cookie-parser");

// configurations
const localIP = require("./startup/privateIP");

const mongoose = require("mongoose");
require("dotenv").config();

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
  res.sendFile(__dirname + "/index.html");
});

// app routes
app.use("/auth", auth);
app.use("/signup", signup);
app.use("/me", me);
app.use("/verification", verify);
app.use("/resetpassword", reset);
app.use("/editUser", editUser);
app.use("/editTasks", editTasks);

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
const mongoDbUri = `mongodb+srv://proFocusDB:${process.env.db_password}@atlascluster.t8zzfhk.mongodb.net/?retryWrites=true&w=majority`;

const connectionParams = {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(mongoDbUri, connectionParams)
  .then(() => console.log("Connected to the database"))
  .catch((e) => logger.error(`DB connection error: ${e.message}`));

// stating the server
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

if (process.env.NODE_ENV == "development") {
  localIP();
}

// projest base directory
global.__basedir = __dirname;

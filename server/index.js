const Express = require("express");
const app = Express();
const auth = require("./routes/auth");
const signup = require("./routes/signup");
const me = require("./routes/me");
const reset = require("./routes/resetpassword");
const verify = require("./routes/verification");
const requestPath = require("./middleware/req");
const editUser = require("./routes/editUser");

const mongoose = require("mongoose");
const logger = require("./middleware/logger");
require("dotenv").config();

// parse incoming data

app.use(Express.json());

// check if a secret pharase is set

if (!process.env.pro_focus_jwtKey) {
  console.log("jwtKey variable must be set");
  process.exit(1);
}

// send a static html
app.get("/", async (req, res) => {
  res.sendFile(__dirname+"/index.html");
});

// log requested paths
app.use(requestPath);

app.use("/auth", auth);
app.use("/signup", signup);
app.use("/me", me);
app.use("/verification", verify);
app.use("/resetpassword", reset);
app.use("/editUser", editUser);

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


// projest base directory

global.__basedir = __dirname;
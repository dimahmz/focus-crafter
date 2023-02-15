const Express = require("express");
const app = Express();
const auth = require("./routes/auth");
const signup = require("./routes/signup");
const me = require("./routes/me");
const verify = require("./routes/verification")
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
require("dotenv").config();

app.use(Express.json());

if (!process.env.pro_focus_jwtKey) {
  console.log("jwtKey variable must be set");
  process.exit(1);
}

app.get("/", async (req, res) => {
  res.send("this the home page");
});

app.use("/auth", auth);

app.use("/signup", signup);

app.use("/verification", verify);


const mongoDbUri = `mongodb+srv://proFocusDB:${process.env.db_password}@atlascluster.t8zzfhk.mongodb.net/?retryWrites=true&w=majority`;

const connectionParams={
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(mongoDbUri, connectionParams)
.then(() => console.log("Connected to the database"))
  .catch((e) => logger.error(`DB connection error: ${e.message}`));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));


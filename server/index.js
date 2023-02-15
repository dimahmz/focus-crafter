const Express = require("express");
const app = Express();
const auth = require("./routes/auth");
const signup = require("./routes/signup");
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

const mongoDbUri = `mongodb+srv://proFocusDB:${process.env.db_password}@atlascluster.t8zzfhk.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(mongoDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" Mongoose is connected"))
  .catch((e) => logger.error(`MongoDB connection error: ${e.message}`));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

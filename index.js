const express = require("express");
const mongodb = require("./Mongodb/index");
const expressHbs = require("express-handlebars");
const bodyParser = require("body-parser");
const route = require("./Routes/index");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const app = express();
const post = 8000;
dotenv.config();
mongodb.connect();
app.engine(
  ".hbs",
  expressHbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: "views/layouts/",
    helpers: { sum: (a, b) => a + b },
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/upload", express.static("upload"));
app.use(methodOverride("_method"));
route(app);

app.listen(post, console.log("Trang Dang Chay Cong 8000"));

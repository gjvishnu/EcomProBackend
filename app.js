const express = require("express");
const app = express();
const cors = require("cors");
const product = require("./router/products");
const auth = require("./router/user");
const errMiddleware = require("./middleware/error");
const cookieParser = require('cookie-parser');
const cart = require("./router/cart")
const path = require("path")

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser())
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use("/api", product);
app.use("/api", auth);
app.use("/api", cart);

app.use(errMiddleware);

module.exports = app;

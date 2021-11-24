const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./api/routes");
const passport = require("passport");
const port = process.env.PORT || 7000;
const app = express();
const useragent = require("express-useragent");
require("dotenv").config();
require("./api/services/passport")(passport);


app.enable("trust proxy");
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    next();
});

app.use(useragent.express());
routes(app);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
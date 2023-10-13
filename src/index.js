const express = require("express");
const logger = require("morgan");
const handlebars = require("express-handlebars");
const sass = require("node-sass-middleware");
require("dotenv").config();

const router = require("./router/router");

const app = express();
app.engine("handlebars", handlebars.engine(handlebars.engine({
    helpers: require(`${__dirname}/views/helpers/helpers.js`)
})));

app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(logger("complete"));
app.use(sass({
    src: `${__dirname}/../public/scss`,
    dest: `${__dirname}/../public/css`,
    outputStyle: "compressed",
    prefix: "/css",
}));
app.use("/css", express.static(`${__dirname}/../public/css`));
app.use("/js", [
    express.static(`${__dirname}/../public/js`),
    express.static(`${__dirname}/../node_modules/bootstrap/dist/js/`)
]);

app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App running on port: ${PORT}`));
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const handlebars = require("express-handlebars");

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views"
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("public"));

// ROUTER
const router = require("./routes");
app.use("/api", router);

// manejo de errores de aplicación
app.use((err, req, res, next) => {
  console.error(err.message);
  return res.status(500).send("Se rompió todo");
});

const puerto = process.env.PORT || 8080;

const server = app.listen(puerto, () => {
  console.log(`servidor escuchando en http://localhost:${puerto}`);
});

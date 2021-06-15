const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

// ROUTER
const router = require("./routes");
app.use("/api", router);

app.get("/", (req, res) => {
  res.render("post");
  // res.redirect("/api/productos/listar")
});

// manejo de errores de aplicación
app.use((err, req, res, next) => {
  console.error(err.message);
  return res.status(500).send("Se rompió todo");
});

const puerto = process.env.PORT || 8080;

const server = app.listen(puerto, () => {
  console.log(`servidor escuchando en http://localhost:${puerto}`);
});

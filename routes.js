const express = require("express");
const router = express.Router();

// CONTROLLER
const Productos = require("./api/productos");
const instanceProductos = new Productos();

// RUTAS

router.get("/productos/vista", (req, res) => {
  const productos = instanceProductos.listar();
  res.render("layout", { productos: productos });
});

router.get("/productos/listar", (req, res) => {
  const products = instanceProductos.listar();
  products.length > 0 ? res.send(products) : res.send({ error: "no hay productos cargados" });
});

router.get("/productos/listar/:id", (req, res) => {
  const { id } = req.params;
  const product = instanceProductos.listarId(id);
  product ? res.send(product) : res.send({ error: "producto no encontrado" });
});

router.post("/productos/guardar", (req, res) => {
  console.log(req.query.params);
  console.log(req.body);
  const { body } = req;
  const product = instanceProductos.guardar(body);
  // res.send(product ?? { error: "Falta rellenar campos" });
  res.redirect("/");
});

router.put("/productos/actualizar/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const product = instanceProductos.actualizar(id, body);
  product ? res.send(product) : res.send({ error: "producto no encontrado" });
});

router.delete("/productos/borrar/:id", (req, res) => {
  const id = req.params.id;
  const product = instanceProductos.borrar(id);
  product ? res.send(product) : res.send({ error: "producto no encontrado" });
});

module.exports = router;

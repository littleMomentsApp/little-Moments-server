const router = require("express").Router();

const Product = require("../models/Product.model");
const List = require("../models/List.model");

router.post("/products", (req, res, next) => {
  const { title, description, image, price } = req.body;

  const newProduct = {
    title: title,
    image: image,
    description: description,
    price: price,
  };

  Product.create(newProduct)
    .then((response) => res.status(201).json(response))
    .catch((err) => {
      console.log("error creating a new Product", err);
      res.status(500).json({
        message: "error creating a new Product",
        error: err,
      });
    });
});

module.exports = router;

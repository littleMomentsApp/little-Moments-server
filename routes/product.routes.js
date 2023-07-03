const router = require("express").Router();

const Product = require("../models/Product.model");
const List = require("../models/List.model");
const { default: mongoose } = require("mongoose");

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

router.get("/products", (req, res, next) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log("error getting the products", err);
      res.status(500).json({
        message: "error getting the products",
        error: err,
      });
    });
});

router.put("/products/:productId",(req, res, next) =>{
  const {productId} = req.params;
  console.log(productId);
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({message: "Specified id is not valid"})
    return
  }
  const {title, image, description, category, price} = req.body;

  Product.findByIdAndUpdate(
    productId,
    {title, image, description, category, price},
    {
      new:true,
    })
    .then((response) =>{
      res.json(response)
    })
    .catch((err) => {
      console.log("error updating product", err);
      res.status(500).json({ message: "error updating product", error: err });
});
});

router.delete("/products/:productId", (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findByIdAndDelete(productId)
    .then((deletedProduct) => {
      console.log(deletedProduct);
      res.json({
        message: `Product with id: ${productId} deleted successfully.`,
    })
    })
    .catch((err) => {
      console.log(" error to delete product", err);
      res.status(500).json({ message: "error deleting product", error: err });
    });
});

module.exports = router;

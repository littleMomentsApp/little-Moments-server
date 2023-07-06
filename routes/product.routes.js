const router = require("express").Router();

const Product = require("../models/Product.model");
const List = require("../models/List.model");
const { default: mongoose } = require("mongoose");
const fileUploader = require("../config/cloudinary.config");

router.post("/products", (req, res, next) => {
  const { title, image, description, quantity, category, price } = req.body;

  const newProduct = {
    title: title,
    imageURL: image,
    description: description,
    quantity: quantity,
    category: category,
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

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});

router.get("/product-category", (req, res, next) => {
  const categories = Product.schema.path("category").enumValues;

  res.json(categories);
});

router.put("/products/:productId", (req, res, next) => {
  const { productId } = req.params;
  console.log(productId);
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  const { title, image, description, quantity, category, price } = req.body;

  Product.findByIdAndUpdate(
    productId,
    { title, image, description, quantity, category, price },
    {
      new: true,
    }
  )
    .then((response) => {
      res.json(response);
      console.log(response);
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

  Product.findByIdAndRemove(productId)
    .then((deletedProduct) => {
      console.log(deletedProduct);
      return Product.deleteMany({ _id: { $in: deletedProduct } });
    })
    .then(() => {
      res.json({
        message: `Product with id: ${productId} deleted successfully.`,
      });
    })
    .catch((err) => {
      console.log(" error to delete product", err);
      res.status(500).json({ message: "error deleting product", error: err });
    });
});

module.exports = router;

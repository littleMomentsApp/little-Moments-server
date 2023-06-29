const router = require("express").Router();
const { mongoose, Schema, model } = require("mongoose");

const List = require("../models/List.model");
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/list", (req, res, next) => {
  const { title, description, date } = req.body;

  const newList = {
    title: title,
    description: description,
    date: date,
    product: [],
    owner: req.payload._id,
  };

  List.create(newList)
    .then((response) => res.status(201).json(response))
    .catch((err) => {
      console.log("error creating a new list", err);
      res.status(500).json({
        message: "error creating a new list",
        error: err,
      });
    });
});

router.get("/list", (req, res, next) => {
  List.find()
    .populate("product")
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log("error getting the lists", err);
      res.status(500).json({
        message: "error getting the lists",
        error: err,
      });
    });
});

router.get("/list/:listId", (req, res, next) => {
  const { listId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(listId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  List.findById(listId)
    .populate("product")
    .then((list) => res.json(list))
    .catch((err) => {
      console.log("error getting details of a list", err);
      res.status(500).json({
        message: "error getting details of a list",
        error: err,
      });
    });
});

module.exports = router;

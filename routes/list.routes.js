const router = require("express").Router();
const { mongoose, Schema, model } = require("mongoose");

const List = require("../models/List.model");
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/lists", isAuthenticated, (req, res, next) => {
  const { title, description, date, products } = req.body;

  const { owner } = req.payload._id;

  List.create({ title, description, date, products, owner })
    .then((response) => res.status(201).json(response))
    .catch((err) => {
      console.log("error creating a new list", err);
      res.status(500).json({
        message: "error creating a new list",
        error: err,
      });
    });
});

router.get("/lists", (req, res, next) => {
  List.find()
    .populate("products")
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

router.get("/lists/:listId", (req, res, next) => {
  const { listId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(listId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  List.findById(listId)
    .populate("products")
    .then((list) => res.json(list))
    .catch((err) => {
      console.log("error getting details of a list", err);
      res.status(500).json({
        message: "error getting details of a list",
        error: err,
      });
    });
});

router.put("/lists/:listId", isAuthenticated, (req, res, next) => {
  const { listId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(listId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  console.log(req.body);
  const { title, description, data, addedProducts } = req.body;

  // Model.findByIdAndUpdate(id, newDetails [, options] )

  List.findByIdAndUpdate(
    listId,
    { title, description, data, products: addedProducts },
    {
      new: true,
    }
  )
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((err) => {
      console.log("error to update list", err);
      res.status(500).json({ message: "error to update list", error: err });
    });
});

router.delete("/lists/:listId", isAuthenticated, (req, res, next) => {
  const { listId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(listId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  List.findByIdAndDelete(listId)
    .then((deletedList) => {
      console.log(deletedList);
      res.json({
        message: `List with id: ${listId} & all associated products were removed successfully.`,
      });
    })
    .catch((err) => {
      console.log(" error to delete list", err);
      res.status(500).json({ message: "error deleting list", error: err });
    });
});

module.exports = router;
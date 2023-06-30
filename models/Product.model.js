const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    price: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;

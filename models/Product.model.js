const { text } = require("express");
const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: text,
    },
    imagem: {
      type: text,
    },
    description: {
      type: text,
    },
    price: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;

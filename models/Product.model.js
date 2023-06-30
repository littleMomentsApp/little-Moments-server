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
    category: {
      type: String,
      enum: ["Hygiene", "Baby Essentials", "Clothing", "Feeding", "Other"],
      default: "Other",
    },
    price: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;

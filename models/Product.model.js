const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
    },
    imageURL: {
      type: String,
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    category: {
      type: String,
      enum: [
        "Hygiene",
        "Baby Essentials",
        "Clothing",
        "Bedding",
        "Feeding",
        "Travel",
        "Other",
      ],
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

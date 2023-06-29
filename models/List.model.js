const { text } = require("express");
const { Schema, model } = require("mongoose");

const listSchema = new Schema(
  {
    title: {
      type: text,
    },
    description: {
      type: text,
    },
    date: {
      type: Date,
    },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],

    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const List = model("List", listSchema);

module.exports = List;

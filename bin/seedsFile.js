const { mongoose } = require("mongoose");
const Product = require("../models/Product.model");
const List = require("../models/List.model");

const listsTemplate = [
  {
    title: "List Template 1",
    description: "Lorem Ipsum",
    date: "10/12/2023",
    products: ["Nappie", "Comb", "Plaster"],
  },
  {
    title: "List Template 2",
    description: "Lorem Ipsum",
    date: "10/12/2023",
    products: ["Nappie", "Comb", "Plaster", "Water Bottle"],
  },
  {
    title: "List Template 3",
    description: "Lorem Ipsum",
    date: "10/12/2023",
    products: ["Nappie", "Comb", "Plaster", "Water Bottle"],
  },
];

const genericProducts = [
  {
    title: "Nappie",
    image: "test",
    description: "Nappie for babys",
    Category: "Hygiene",
    price: 30,
  },
  {
    title: "Comb",
    image: "test",
    description: "Make your baby's hair look good.",
    Category: "Hygiene",
    Price: 20,
  },
  {
    title: "Plaster",
    image: "11",
    description: "Take Care of our babys",
    Category: "Hygiene",
    price: 25,
  },
  {
    title: "Water Bottle",
    image: "12",
    description: "Our water personalized water bottle",
    Category: "Hygiene",
    price: 10,
  },
];

async function seedData() {
  try {
    const deletedLists = await List.deleteMany({}); //deleting all the lists on the database;
    const deletedProducts = await Product.deleteMany({}); //deleting all the products on the database;
    console.log(deletedLists, deletedProducts);

    const productsCreated = await Product.insertMany(genericProducts);
    console.log(`Number of products created.....${productsCreated.length}`);

    const listWithIds = [];

    for (const listObj of listsTemplate) {
      const newList = {
        title: listObj.title,
        description: listObj.description,
        date: listObj.date,
        products: [],
      };
      for (const product of listObj.products) {
        const productsDetails = await Product.findOne({ title: product });
        newList.products.push(productsDetails._id);
      }

      listWithIds.push(newList);
    }

    const listCreated = await List.insertMany(listWithIds);
    console.log(`the number of lists created....${listCreated.length}`);
  } catch (e) {
    console.log(e, "error seeding data in our DB...");
  }
}

seedData();
const { mongoose } = require("mongoose");
const Product = require("../models/Product.model");
const List = require("../models/List.model");

const listsTemplate = [
  {
    title: "Template 1",
    description: "Lorem Ipsum",
    date: "10/12/2023",
    products: [
      "Baby Comb",
      "Plaster for Kids",
      "Baby Carrier",
      "Baby Stroller",
      "Baby Shampoo",
      "Baby Wipes",
    ],
  },
  {
    title: "Template 2",
    description: "Lorem Ipsum",
    date: "10/12/2023",
    products: [
      "Baby Comb",
      "Plaster for Kids",
      "Water Bottle",
      "Baby Wipes",
      "Baby Lotion",
      "Baby Onesies",
      "Baby Blanket",
    ],
  },
  {
    title: "Template 3",
    description: "Lorem Ipsum",
    date: "10/12/2023",
    products: [
      "Baby Comb",
      "Plaster for Kids",
      "Water Bottle",
      "Baby Blanket",
      "Baby Shampoo",
      "Baby Carrier",
    ],
  },
];

const genericProducts = [
  {
    title: "Baby Comb",
    image: "https://img.fruugo.com/product/3/73/815613733_max.jpg",
    description: "Make your baby's hair look good.",
    Category: "Hygiene",
    Price: 20,
  },
  {
    title: "Plaster for Kids",
    image:
      "https://images-1.eucerin.com/~/media/hansaplast/international/packshot-visuals/animal-plaster/kids%20animal%20plasters%20strips%20overview.png?rx=0&ry=0&rw=1890&rh=1890",
    description: "Take Care of our babys",
    Category: "Hygiene",
    price: 25,
  },
  {
    title: "Water Bottle",
    image:
      "https://cdn.pixabay.com/photo/2015/07/11/23/00/bottle-841431_1280.jpg",
    description: "Our water personalized water bottle",
    Category: "Hygiene",
    price: 10,
  },
  {
    title: "Baby Diapers",
    image: "diapers.jpg",
    description: "Keep your baby dry and comfortable with these diapers.",
    category: "Hygiene",
    price: 15,
  },
  {
    title: "Baby Wipes",
    image: "wipes.jpg",
    description:
      "Gentle and soft wipes for cleaning your baby's delicate skin.",
    category: "Hygiene",
    price: 8,
  },
  {
    title: "Baby Shampoo",
    image: "shampoo.jpg",
    description: "A mild and tear-free shampoo for your baby's hair.",
    category: "Hygiene",
    price: 12,
  },
  {
    title: "Baby Lotion",
    image: "lotion.jpg",
    description:
      "Keep your baby's skin moisturized and smooth with this lotion.",
    category: "Hygiene",
    price: 10,
  },
  {
    title: "Baby Onesies",
    image: "onesies.jpg",
    description: "Cute and comfortable onesies for your little one.",
    category: "Clothing",
    price: 18,
  },
  {
    title: "Baby Blanket",
    image: "blanket.jpg",
    description: "Keep your baby warm and cozy with this soft blanket.",
    category: "Bedding",
    price: 25,
  },
  {
    title: "Baby Stroller",
    image: "stroller.jpg",
    description:
      "A convenient and lightweight stroller for easy travel with your baby.",
    category: "Travel",
    price: 150,
  },
  {
    title: "Baby Carrier",
    image: "carrier.jpg",
    description:
      "Keep your baby close and secure with this comfortable carrier.",
    category: "Travel",
    price: 40,
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
        console.log;
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

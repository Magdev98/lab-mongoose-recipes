const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    const tahitianSalad = {
      title: "Tahitian Salad",
      level: "Easy Peasy",
      ingredients: [
        "400 g fresh white fish deboned and skinless",
        "2 limes or lemons",
        "1 small cucumber deseeded, peeled and sliced",
        "4 cherry tomatoes quartered",
        "1 spring onion finely sliced",
        "⅓ cup coconut milk",
        "½ cup coconut and lime dressing",
        "salt and pepper",
      ],
      cuisine: "Tahitian",
      dishType: "main_course",
      image:
        "https://fresh.co.nz/wp-content/uploads/2017/11/F2445E79-BBFB-49FB-93B8-DBD1E0BE526B-e1568757937961.jpeg",
      duration: 15,
      creator: "Marianne",
      created: Date(2023, 02, 10),
    };
    await Recipe.create(tahitianSalad).then(console.log(tahitianSalad.title));

    const multipleRecipes = await Recipe.insertMany(data);

    const updateDurationRigatoni = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: "100" },
      { new: true } //update the original variable not only Mongo DB
    );

    const removeCarrotCake = await Recipe.findOneAndDelete({
      title: "Carrot Cake",
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    mongoose.connection.close();
  });

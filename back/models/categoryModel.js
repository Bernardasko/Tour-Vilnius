const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tours: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
    },
  ],
  
});


const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;

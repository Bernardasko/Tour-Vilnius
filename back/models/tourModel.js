const mongoose = require("mongoose");
const validator = require("validator");
const Category = require("./categoryModel");

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  dates: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  }
});

tourSchema.methods.calculateAverageRating = function() {
    let sum = 0;
    for (let i = 0; i < this.ratings.length; i++) {
      sum += this.ratings[i];
    }
    return sum / this.ratings.length;
  };

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;

const mongoose = require("mongoose");
const validator = require("validator");

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
   
  },
  photo: {
    type: String,
  
  },
  duration: {
    type: Number,
   
  },
  dates: {
    type: String,
   
  },
  price: {
    type: Number,
  
  },
  // rating: {
  //   type: Number,
  //   default: 0,
  // },
  comment: {
    type: String,
  },
  category: {
    type: String,
    // enum: ["Solo", "Group"], 
    // required: [true, "Category is required"]
  },
  // category: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Category",
  // }
});

// tourSchema.methods.calculateAverageRating = function() {
//     let sum = 0;
//     for (let i = 0; i < this.ratings.length; i++) {
//       sum += this.ratings[i];
//     }
//     return sum / this.ratings.length;
//   };

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;

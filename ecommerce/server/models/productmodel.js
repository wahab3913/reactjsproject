const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const products = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
  },
  Stock: {
    type: Number,
    maxLength: [4, "stock cannot exceed 4 "],
    default: 1,
  },
  numOfReviews: {
    type: Number,
  },
  reviews: [
    {
      name: {
        type: String,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Products", products);

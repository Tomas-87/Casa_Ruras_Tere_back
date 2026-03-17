import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    texto: {
      type: String,
      required: true,
      trim: true,
    },
    puntuacion: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    origen: {
      type: String,
      default: "web",
      trim: true,
    },
  },
  { timestamps: true },
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;

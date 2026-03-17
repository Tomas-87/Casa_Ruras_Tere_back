import Review from "../models/Review.js";

export const getReview = async (req, res) => {
  try {
    const reseñas = await Review.find().lean();

    if (!reseñas || reseñas.length === 0) {
      return res.status(404).json({ error: "Reviews not found" });
    }
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ error: "error retrieving reviews" });
  }
};

export const createReview = async (req, res) => {
  try {
    const reseñas = await Review.create(req.body);
    res.status(201).json(reseñas);
  } catch (error) {
    res.status(500).json({ error: "Error created review" });
  }
};

import db from "../db/connection.js";
import cloudinary from "../config/cloudinary.js";

export const getImages = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM imagenes");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

export const createImagen = async (req, res) => {
  try {
    const { title, casa_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "casa_rural",
    });

    const url = result.secure_url;

    const [dbResult] = await db.query(
      "INSERT INTO imagenes (url, title, casa_id) VALUES (?, ?, ?)",
      [url, title, casa_id || 1],
    );

    res.json({
      id: dbResult.insertId,
      url,
      title,
      casa_id: casa_id || 1,
    });
  } catch (error) {
    res.status(500).json({ error: "Upload error" });
  }
};

import Casa from "../models/Casa.js";
import cloudinary from "../config/cloudinary.js";

export const getImages = async (req, res) => {
  try {
    const casa = await Casa.findOne().lean();

    if (!casa) {
      return res.status(404).json({ error: "Casa no encontrada" });
    }

    res.json(casa.imagenes || []);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

export const createImagen = async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "casa_rural",
    });

    const nuevaImagen = {
      url: result.secure_url,
      title,
      description,
    };

    const casa = await Casa.findOneAndUpdate(
      {},
      { $push: { imagenes: nuevaImagen } },
      { new: true },
    );

    if (!casa) {
      return res.status(404).json({ error: "Casa no encontrada" });
    }

    res.json(nuevaImagen);
  } catch (error) {
    res.status(500).json({ error: "Upload error" });
  }
};

import multer from "multer";

//filtro para subir solo imagens
const fileFilter = (req, file, cb) => {
  const types = ["image/jpeg", "image/png", "image/webp"];

  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;

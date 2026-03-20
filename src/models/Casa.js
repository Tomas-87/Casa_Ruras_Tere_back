import mongoose from "mongoose";

const imagenSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { _id: true },
);

const temporadaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    fecha_inicio: { type: Date, required: true },
    fecha_fin: { type: Date, required: true },
    precio: { type: Number, required: true },
  },
  { _id: true },
);

const casaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true }, // precio base
    capacidad: { type: Number, required: true },
    telefono: { type: String, required: true },
    estancia_minima: { type: Number, required: true, default: 2 },
    imagenes: [imagenSchema],
    temporadas: [temporadaSchema],
  },
  { timestamps: true },
);

export default mongoose.model("Casa", casaSchema);

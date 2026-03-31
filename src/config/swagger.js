import swaggerJSDoc from "swagger-jsdoc";
import paths from "../docs/swagger.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Casa Rural Tere",
      version: "1.0.0",
      description: "Documentación de la API de Casa Rural Tere",
    },
    servers: [
      {
        url: "http://localhost:3001/api",
        description: "Servidor local",
      },
      {
        url: "https://casa-ruras-tere-back.onrender.com/api",
        description: "Servidor Render",
      },
    ],
    paths: paths,
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

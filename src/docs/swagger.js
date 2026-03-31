const paths = {
  "/casa": {
    get: {
      summary: "Obtiene la información principal de la casa",
      tags: ["Casa"],
      responses: {
        200: {
          description: "Datos de la casa obtenidos correctamente",
        },
        404: {
          description: "Casa no encontrada",
        },
        500: {
          description: "Error del servidor",
        },
      },
    },
  },
  "/casa/imagenes": {
    get: {
      summary: "Obtiene todas las imagenes de la casa",
      tags: ["Imagenes"],
      responses: {
        200: {
          description: "Lista de imagenes obtenida correctamente",
        },
        404: {
          description: "Lista de imagenes no encontrada",
        },
        500: {
          description: "Error del servidor",
        },
      },
    },
    post: {},
  },
};

export default paths;

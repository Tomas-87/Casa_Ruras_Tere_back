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
    post: {
      summary: "Sube una nueva imagen",
      tags: ["Imagenes"],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                image: {
                  type: "string",
                  format: "binary",
                },
                title: {
                  type: "string",
                  example: "Fachada",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Imagen subida correctamente",
        },
        404: {
          description: "Error al subir la imagen",
        },
        500: {
          description: "Error del servidor",
        },
      },
    },
  },
  "/casa/precio": {
    get: {
      summary: "Obtiene el precio actual segun la temporada",
      tags: ["Precios"],
      responses: {
        200: {
          description: "Precio actual obtenido",
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
  "/casa/temporadas": {
    get: {
      summary: "Obtiene las temporadas de precios",
      tags: ["Precios"],
      responses: {
        200: {
          description: "Temporadas obtenidas",
        },
        404: {
          description: "Temporadas no encontradas",
        },
        500: {
          description: "Error del servidor",
        },
      },
    },
  },
  "/casa/review": {
    get: {
      summary: "Obtiene todas las reseñas",
      tags: ["Reviews"],
      responses: {
        200: {
          description: "Reseñas obtenidas correctamente",
        },
        404: {
          description: "Reviews not found",
        },
        500: {
          description: "Error del servidor",
        },
      },
    },
    post: {
      summary: "Crea una nueva reseña",
      tags: ["Reviews"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nombre: {
                  type: "string",
                  example: "Tomás",
                },
                texto: {
                  type: "string",
                  example: "La casa estaba muy bien y muy limpia",
                },
                puntuacion: {
                  type: "number",
                  example: 5,
                },
                origen: {
                  type: "string",
                  example: "web",
                },
              },
              required: ["nombre", "texto", "puntuacion"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Reseña creada correctamente",
        },
        500: {
          description: "Error del servidor",
        },
      },
    },
  },
  "/casa/reservas": {
    post: {
      summary: "Envia una solicitud de reserva por correo electronico",
      tags: ["Reservas"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nombre: {
                  type: "string",
                  example: "Carlos",
                },
                apellidos: {
                  type: "string",
                  example: "Data",
                },
                email: {
                  type: "string",
                  example: "data@gmail.com",
                },
                telefono: {
                  type: "string",
                  example: "696968875",
                },
                entrada: {
                  type: "string",
                  format: "date",
                  example: "2026-08-10",
                },
                salida: {
                  type: "string",
                  format: "date",
                  example: "2026-08-14",
                },
                mensaje: {
                  type: "string",
                  example: "Querría saber disponibilidad para esas fechas",
                },
              },
              required: [
                "nombre",
                "apellidos",
                "email",
                "telefono",
                "entrada",
                "salida",
              ],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Correo enviado correctamente",
        },
        400: {
          description: "Faltan campos o los datos no son válidos",
        },
        500: {
          description: "Error al enviar el correo",
        },
      },
    },
  },
};

export default paths;

// Importar bibliotecas
const swagger = require("swagger-jsdoc");

// Opciones de Swagger
const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Twitter DAW",
      version: "0.1.0",
      description: "API que recrea Twitter, por Victoria Rodríguez (DAW - U-TAD)",
      license: {
        name: "",
        url: "",
      },
      contact: {
        name: "Victoria",
        url: "",
        email: "",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    schemas: {
      user: {
        type: "object",
        required: ["username", "fullname", "email", "pwd"],
        properties: {
            username: { type: "string", example: "user" },
            fullname: { type: "string", example: "Name Surname" },
            description: { type: "string", example: "This is a description." },
            email: { type: "string", example: "user@mail.com" },
            profile_pic: { type: "string", example: "" },
            pwd: { type: "string" }
        },
    },
    post: {
        type: "object",
        required: ["txt"],
        properties: {
            txt: { type: "string", example: "Este es un post de prueba" },
            img: { type: "string", example: "url_de_la_imagen" }
        },
    },
    follower: {
        type: "object",
        required: ["following", "followed"],
        properties: {
            following: { type: "string", example: "ID del usuario que sigue" },
            followed: { type: "string", example: "ID del usuario seguido" }
        },
    },
    like: {
        type: "object",
        required: ["user_liking", "liked"],
        properties: {
            user_liking: { type: "string", example: "ID del usuario que da like" },
            liked: { type: "string", example: "ID del post que recibe el like" }
        },
      },
    },
  },
  apis: ["./api/routes/*.js"],
};


// Exportar módulos
module.exports = swagger(options);

// http://localhost:3000/api-docs
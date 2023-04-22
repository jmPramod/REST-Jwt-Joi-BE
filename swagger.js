const swaggerAutogen =require( "swagger-autogen")
require("dotenv").config();
const doc = {
  info: {
    version: "1.0.0",
    title: "Crud Api",
    description: "User CRUD with JWT authentication",
  },
  host: `localhost:${process.env.PORT}`,
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "User",
      description: "Endpoints",
    },
    {
      name: "Login/Register",
      description: "Endpoints",
    },
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", // can be "header", "query" or "cookie"
      name: "Authorization", // name of the header, query parameter or cookie
      description: "any description...",
    },
  },
  security: [
    {
      AuthToken: [],
    },
  ],
  definitions: {},
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  await import("./index.js");
});
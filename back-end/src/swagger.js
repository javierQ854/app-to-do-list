import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Usuarios',
    version: '1.0.0',
    description: 'Documentación de la API de usuarios',
  },
  servers: [
    {
      url: 'http://localhost:3000/',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // Rutas donde pondrás los comentarios Swagger
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
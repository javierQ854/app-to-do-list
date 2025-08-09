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
      url: 'https://proyects.sytes.net/api',
      description: 'Servidor producción (HTTPS)',
    }

  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // Rutas donde pondrás los comentarios Swagger
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
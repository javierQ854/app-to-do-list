import app from './src/app.js';
import swaggerSpec from './src/swagger.js';
import swaggerUi from 'swagger-ui-express';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const carRoutes = require('./src/routes/carRoutes');
const errorHandler = require('./src/middlewares/errorHandler');

dotenv.config();

const app = express();
app.use(express.json());

// Import models
require('./src/models/Make');
require('./src/models/ModelCar');
require('./src/models/Variant');
require('./src/models/VehicleSpec');
require('./src/models/RTOCode');
require('./src/models/City');
require('./src/models/Insurer');
require('./src/models/Registration');

// Routes
app.use('/api', carRoutes);

// Swagger Docs
const swaggerDocument = yaml.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error Handler (LAST middleware)
app.use(errorHandler);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: '🚗 Car Registration API v1.0', 
    docs: 'http://localhost:3000/api-docs',
    endpoints: '/api/makes, /api/register, etc.'
  });
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`Server: http://localhost:${PORT}`);
      console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
      console.log(`API Base: http://localhost:${PORT}/api`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB Error:', err);
    process.exit(1);
  });
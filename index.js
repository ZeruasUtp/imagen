const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const imagenRoutes = require('./routes/imagenRoutes'); // Ruta de imágenes

// Crear una instancia de la aplicación Expres
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/images', imagenRoutes); // Solo la ruta de imágenes

// Configurar el puerto
const PORT = process.env.PORT || 5000;

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

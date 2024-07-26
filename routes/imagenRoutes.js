// routes/imagenRoutes.js
const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../controllers/imagenController');

const router = express.Router();
const upload = multer();

// Ruta para cargar imágenes
router.put('/upload/:id', upload.single('image'), uploadImage);

module.exports = router;

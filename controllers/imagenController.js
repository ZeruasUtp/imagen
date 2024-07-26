// controllers/imagenController.js
const { v2: cloudinary } = require('cloudinary');
const streamifier = require('streamifier');
const db = require('../config/db'); // Asegúrate de que esta ruta sea correcta segun la base de datos que importes xd

// Configurar Cloudinary
cloudinary.config({ 
    cloud_name: 'dkdapj1br', 
    api_key: '894354184461489', 
    api_secret: 'u17smQXEPFgtovjbwyTPRjRSyPQ'
});

// Función para cargar una imagen a Cloudinary y actualizar la URL en la base de datos
const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        // Cargar la imagen a Cloudinary
        const stream = cloudinary.uploader.upload_stream(async (error, result) => {
            if (error) {
                console.error('Error uploading to Cloudinary:', error);
                return res.status(500).json({ error: 'Failed to upload image' });
            }

            try {
                // Guardar la URL de la imagen en la base de datos con una consulta SQL directa
                db.query(
                    'UPDATE usuarios SET fotoPerfil = ? WHERE usuario_id = ?',
                    [result.secure_url, req.params.id],
                    (err, results) => {
                        if (err) {
                            console.error('Error saving image URL in database:', err);
                            return res.status(500).json({ error: 'Failed to save image URL in the database' });
                        }

                        res.json({ message: 'Image uploaded successfully', url: result.secure_url });
                    }
                );
            } catch (err) {
                console.error('Error saving image URL in database:', err);
                res.status(500).json({ error: 'Failed to save image URL in the database' });
            }
        });

        // Convertir el buffer del archivo a stream y luego pipe al stream de Cloudinary 
        streamifier.createReadStream(req.file.buffer).pipe(stream);
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

module.exports = {
    uploadImage
};

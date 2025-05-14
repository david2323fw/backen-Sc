const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const fechaHistoricaRoutes = require('./routes/fechaHistoricaRoutes');
const dbConnect = require('./db');

dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuración de CORS: permitir cualquier localhost y tu dominio de producción
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Permitir herramientas como Postman

    const allowedOrigins = [
      'https://frontend-sc-git-main-david2323fws-projects.vercel.app',
    ];

    if (
      origin.startsWith('http://localhost') || 
      origin.startsWith('http://127.0.0.1') ||
      allowedOrigins.includes(origin)
    ) {
      return callback(null, true);
    }

    return callback(new Error('No permitido por CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Archivos estáticos (si usas la carpeta "public")
app.use(express.static('public'));

// Rutas de tu API
app.use('/fechas-historicas', fechaHistoricaRoutes);

// Usar el puerto proporcionado por Render, o 3007 para desarrollo local
const PORT = process.env.PORT || 3007;

// Conectar a la base de datos y luego arrancar el servidor
dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar a la base de datos:', error);
    process.exit(1);
  });


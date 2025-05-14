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

// Configuración de CORS específica para tu frontend en Vercel
app.use(cors({
  origin: 'https://frontend-sc-git-main-david2323fws-projects.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Archivos estáticos (si usas la carpeta "public")
app.use(express.static('public'));

// Rutas de tu API
app.use('/fechas-historicas', fechaHistoricaRoutes);

// Arrancar servidor una vez conectada la base de datos
const PORT = process.env.PORT;

if (!PORT) {
  throw new Error('PORT no definido en las variables de entorno');
}

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar a la base de datos:', error);
    process.exit(1); // Salir del proceso si falla la conexión
  });


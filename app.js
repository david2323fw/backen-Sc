const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const fechaHistoricaRoutes = require('./routes/fechaHistoricaRoutes');
const dbConnect = require('./db');

dotenv.config();

const app = express();

// Conectar a la base de datos
dbConnect();

// Middleware para parsear JSON
app.use(express.json());

// Configuración de CORS
app.use(cors({
  origin: 'https://frotend-git-main-david2323fws-projects.vercel.app',  // URL de tu frontend en Vercel
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Archivos estáticos (si los usas)
app.use(express.static('public'));

// Rutas
app.use('/fechas-historicas', fechaHistoricaRoutes);

// Arrancar servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});

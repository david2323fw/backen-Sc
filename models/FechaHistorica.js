// models/FechaHistorica.js
const mongoose = require('mongoose');

const fechaHistoricaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  fecha: { type: String, required: true },
  imagen: { type: String, required: false, default: null },  // Cambiado a 'required: false' y valor por defecto 'null'
  descripcion: { type: String, required: true }
});

module.exports = mongoose.model('FechaHistorica', fechaHistoricaSchema);

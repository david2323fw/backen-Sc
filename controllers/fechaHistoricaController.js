const FechaHistorica = require('../models/FechaHistorica');

exports.addFechaHistorica = async (req, res) => {
  const { titulo, fecha, descripcion, imagen } = req.body;

  try {
    const nueva = new FechaHistorica({ titulo, fecha, descripcion, imagen });
    await nueva.save();
    res.status(201).json({ message: 'Fecha histórica agregada', fechaHistorica: nueva });
  } catch (error) {
    console.error('Error al agregar fecha histórica:', error);
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

exports.updateFechaHistorica = async (req, res) => {
  const { id } = req.params;
  const { titulo, fecha, descripcion, imagen } = req.body;

  try {
    const updateData = { titulo, fecha, descripcion, imagen };

    const fechaHistorica = await FechaHistorica.findByIdAndUpdate(id, updateData, { new: true });
    if (!fechaHistorica) return res.status(404).json({ message: 'Fecha no encontrada' });

    res.json({ message: 'Fecha histórica actualizada', fechaHistorica });
  } catch (error) {
    console.error('Error al actualizar fecha histórica:', error);
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

exports.deleteFechaHistorica = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await FechaHistorica.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'No encontrada' });

    res.json({ message: 'Fecha histórica eliminada' });
  } catch (error) {
    console.error('Error al eliminar fecha histórica:', error);
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

exports.deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    const fechaHistorica = await FechaHistorica.findById(id);
    if (!fechaHistorica) return res.status(404).json({ message: 'Fecha histórica no encontrada' });

    fechaHistorica.imagen = null;
    await fechaHistorica.save();

    res.json({ message: 'Imagen eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la imagen:', error);
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

exports.getFechasHistoricas = async (req, res) => {
  try {
    const fechasHistoricas = await FechaHistorica.find();
    res.json({ fechasHistoricas });
  } catch (error) {
    console.error('Error al obtener fechas:', error);
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

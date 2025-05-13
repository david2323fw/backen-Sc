const express = require('express');
const router = express.Router();
const {
  addFechaHistorica,
  updateFechaHistorica,
  deleteFechaHistorica,
  getFechasHistoricas,
  deleteImage
} = require('../controllers/fechaHistoricaController');

router.get('/', getFechasHistoricas);
router.post('/', addFechaHistorica);
router.put('/:id', updateFechaHistorica);
router.delete('/:id', deleteFechaHistorica);
router.delete('/:id/imagen', deleteImage);

module.exports = router;

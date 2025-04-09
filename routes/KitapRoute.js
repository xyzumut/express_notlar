const express = require('express');
const KitapController = require('../controllers/KitapController');

const router = express.Router();
router.get('', KitapController.kitaplariGetir);
router.get('/:id', KitapController.kitapGetir);
router.post('/ekle', KitapController.kitapEkle);

module.exports = router;
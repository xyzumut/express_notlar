const express = require('express');
const YazarController = require('../controllers/YazarController');

const router = express.Router();

// Yazarları listeleme
router.get('', YazarController.yazarlariGetir);

// Belirli bir yazarı getirme
router.get('/:id', YazarController.yazarGetir);

// Belirli bir yazarın kitaplarını getirme
router.get('/:id/kitaplar', YazarController.yazarinKitaplariniGetir);

// Yeni yazar ekleme
router.post('/ekle', YazarController.yazarEkle);

// Yazar düzenleme
router.put('/duzenle/:id', YazarController.yazarDuzenle);

// Yazar silme
router.delete('/sil/:id', YazarController.yazarSil);

module.exports = router;
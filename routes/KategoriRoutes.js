const express = require('express');
const KategoriController = require('../controllers/KategoriController');

const router = express.Router();

// Kategorileri listeleme
router.get('', KategoriController.kategorileriGetir);

// Belirli bir kategoriyi getirme
router.get('/:id', KategoriController.kategoriGetir);

// Yeni kategori ekleme
router.post('/ekle', KategoriController.kategoriEkle);

// Kategori düzenleme
router.put('/duzenle/:id', KategoriController.kategoriDuzenle);

// Kategori silme
router.delete('/sil/:id', KategoriController.kategoriSil);

module.exports = router;
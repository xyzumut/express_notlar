const express = require('express');
const KitapController = require('../controllers/KitapController');

const router = express.Router();
router.get('', KitapController.kitaplariGetir);
router.get('/:id', KitapController.kitapGetir);
router.post('/ekle', KitapController.kitapEkle);
router.put('/duzenle/:id', KitapController.kitapDuzenle);
router.delete('/sil/:id', KitapController.kitapSil);


router.post('/ekle-kategori/:id/:kategori_id', KitapController.kitapKategoriGir);
router.delete('/sil-kategori/:id/:kategori_id', KitapController.kitapKategoriSil);

module.exports = router;
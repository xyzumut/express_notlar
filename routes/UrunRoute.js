const express = require('express');
const router = express.Router();
const UrunController = require('../controllers/UrunController');

//  [ /urun isteği devamına gelmekte ]

router.get('/urunler', UrunController.urunleriGetir);

router.get('/urun-getir/:urunID', UrunController.urunGetir);

router.post('/ekle', UrunController.urunEkle);

router.delete('/sil/:urunID', UrunController.urunSil);

module.exports = router;
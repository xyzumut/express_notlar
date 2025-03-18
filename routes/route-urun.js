const express = require('express');
const Router = express.Router();
const urunController = require('../controllers/UrunController');

Router.get('/urun-ekle', urunController.urunEkleSayfasiniRenderla);
Router.post('/urun-ekle', urunController.urunEkle);
Router.post('/urun-getir', urunController.urunGetir);
Router.get('/urun-getir/:id?', urunController.urunGetirId);
module.exports = Router;
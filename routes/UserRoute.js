const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

// Kullanıcıları listeleme
router.get('', UserController.userlariGetir);

// Belirli bir kullanıcıyı getirme
router.get('/:id', UserController.userGetir);

// Yeni kullanıcı ekleme
router.post('/ekle', UserController.userEkle);

// Kullanıcı düzenleme
router.put('/duzenle/:id', UserController.userDuzenle);

// Kullanıcı silme
router.delete('/sil/:id', UserController.userSil);

module.exports = router;
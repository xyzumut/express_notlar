const express = require('express');
const path = require('path');
const __rootdir = require('../utils/path');
const Router = express.Router();

Router.get('/urun-ekle', (req, res, next) => {
    res.sendFile(path.join(__rootdir, 'views', 'urun-ekle.html'));
});

Router.post('/urun-getir', (req, res, next) => { 
    console.log(req.body);
    res.redirect('/urun/urun-ekle');
});

module.exports = Router;
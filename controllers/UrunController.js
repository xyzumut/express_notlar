const path = require('path');
const __rootdir = require('../utils/path');
const Urun = require('../models/Urun');

exports.urunEkleSayfasiniRenderla = (req, res, next) => {
    res.sendFile(path.join(__rootdir, 'views', 'urun-ekle.html'));
}

exports.urunEkle = (req, res, next) => { 
    const body = req.body;
    const urun = new Urun(body.urun_adi, body.fiyat);
    urun.save();
    res.redirect('/urun/urun-ekle');
}

exports.urunGetir = (req, res, next) => { 
    console.log('fetchall', Urun.fetchAll());
    res.redirect('/urun/urun-ekle');
}
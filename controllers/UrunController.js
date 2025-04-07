
const Urun = require('../models/Urun');

class UrunController{

    urunGetir = async (req, res, next) => {
        const urunID = req.params.urunID;
        try {
            const result = await Urun.urunGetir(urunID);
            if ( result.length === 0 ) {
                res.status(404).send({ message: 'Veri Bulunamadi', data:null });
            }
            else{
                res.status(200).send({ message: 'Veri Başarıyla Getirildi', data:result });
            }
        } 
        catch (error) {
            res.status(400).send({ message: error.message, result:null });
        }
    }

    urunleriGetir = async (req, res, next) => {
        try {
            const result = await Urun.urunleriGetir();
            res.status(200).send({ message: 'Veri Başarıyla Getirildi', data:result });
        } 
        catch (error) {
            res.status(400).send({ message: error.message, result:null });
        }
    }
    
    urunEkle = async (req, res, next) => { 
        try {
            const result = await Urun.urunEkle({urun_adi:req.body.urunAdi, urun_fiyati:req.body.urunFiyati});
            res.status(200).send({ message: 'Veri Başarıyla Eklendi', data:result });
        } 
        catch (error) {
            res.status(400).send({ message: error.message, result:null });
        }
    }
    
    urunSil = async (req, res, next) => {
        const urunID = req.params.urunID;
        try {
            const affectedRows = await Urun.urunSil(urunID);
            if ( affectedRows === 0 ) {
                res.status(404).send({ message: 'Veri Bulunamadi', data:null });
            }
            else{
                res.status(200).send({ message: 'Veri Başarıyla Silindi', data:null });
            }
        } 
        catch (error) {
            res.status(400).send({ message: error.message, result:null });
        }
    }
}

module.exports = new UrunController();

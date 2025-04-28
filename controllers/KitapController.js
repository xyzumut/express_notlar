const Kitap = require("../models/Kitap");
const Yazar = require("../models/Yazar");

class KitapController{

    kitapEkle = async (req, res) => {

        const { kitap_adi, basim_yili, sayfa_sayisi, fiyat, img, yazarId } = req.body;

        try {

            if (!kitap_adi || !basim_yili || !sayfa_sayisi || !yazarId) {
                const error = new Error('Kitap adı, basım yılı ve sayfa sayısı boş olamaz!');
                error.statusCode = 400;
                throw error;
            }

            const yazar = await Yazar.findOne({ where: { id: yazarId } });
        
            if (!yazar) {
                const error = new Error('Yazar bulunamadı!');
                error.statusCode = 404;
                throw error;
            }

            const result = await yazar.createKitap( {
                kitap_adi,
                basim_yili,
                sayfa_sayisi,
                fiyat,
                img,
                yazarId
            })
            
            res.status(200).send({ data : result, message: 'Kitap Eklendi' });
        } 
        catch (error) {
            res.status( error?.statusCode || 500 ).send({ data : null, message: error.message });
        }
    }

    kitaplariGetir = async (req, res) => {  

        const kitaplar = await Kitap.findAll({
            include:{ model: Yazar }
        });

        kitaplar.forEach( kitap => {
            kitap.yazarId = undefined;
        })

        res.status(200).send({ data : kitaplar, message: 'Kitaplar Listelendi' });
    }

    kitapGetir = async (req, res) => {  
        // const kitap = await Kitap.findByPk(req.params.id);
        const kitap = await Kitap.findOne({ where: { id: req.params.id } });
        res.status(200).send({ data : kitap, message: 'Kitaplar Listelendi' });
    }

    kitapDuzenle = async (req, res) => {

        const { kitap_adi, basim_yili, sayfa_sayisi, fiyat, img, yazar } = req.body;

        const kitapID = req.params.id;

        try {
            
            if (!kitapID) {
                const error = new Error('Kitap ID\'si boş olamaz!');
                error.statusCode = 400;
                throw error;
            }

            const kitap = await Kitap.findByPk(kitapID);
    
            if (!kitap) {
                const error = new Error('Kitap bulunamadı!');
                error.statusCode = 404;
                throw error;
            }
    
            const affectedCount = await Kitap.update({
                kitap_adi       : kitap_adi    !== undefined ? kitap_adi    : kitap.kitap_adi,
                basim_yili      : basim_yili   !== undefined ? basim_yili   : kitap.basim_yili,
                sayfa_sayisi    : sayfa_sayisi !== undefined ? sayfa_sayisi : kitap.sayfa_sayisi,
                fiyat           : fiyat        !== undefined ? fiyat        : kitap.fiyat,
                img             : img          !== undefined ? img          : kitap.img,
                yazar           : yazar        !== undefined ? yazar        : kitap.yazar
            }, { where: { id: kitapID } });
            

            res.status(200).send({ data : null, message: kitap.id+'id\'li Kitap Düzenlendi' });
        } 
        catch (error) {
            res.status( error?.statusCode || 500 ).send({ data : null, message: error.message });            
        }

    }

    kitapSil = async (req, res) => {

        const kitapID = req.params.id;

        try {

            if (!kitapID) {
                const error = new Error('Kitap ID\'si boş olamaz!');
                error.statusCode = 400;
                throw error;
            }

            const kitap = await Kitap.findByPk(kitapID);

            if (!kitap) {
                const error = new Error('Kitap bulunamadı!');
                error.statusCode = 404;
                throw error;
            }

            await Kitap.destroy({ where: { id: kitapID } });

            res.status(200).send({ data : null, message: kitap.id+'id\'li Kitap Silindi' });
        } 
        catch (error) {
            res.status( error?.statusCode || 500 ).send({ data : null, message: error.message });
        }
    }

}

module.exports = new KitapController();
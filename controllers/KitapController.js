const Kitap = require("../models/Kitap");

class KitapController{

    kitapEkle = async (req, res) => {
        const { kitap_adi, basim_yili, sayfa_sayisi, fiyat, img, yazar } = req.body;
        try {
            if (!kitap_adi || !basim_yili || !sayfa_sayisi) {
                const error = new Error('Kitap adı, basım yılı ve sayfa sayısı boş olamaz!');
                error.statusCode = 400;
                throw error;
            }
            const result = await Kitap.create({
                kitap_adi,
                basim_yili,
                sayfa_sayisi,
                fiyat,
                img,
                yazar
            });
            res.status(200).send({ data : result, message: 'Kitap Eklendi' });
        } 
        catch (error) {
            res.status( error?.statusCode || 500 ).send({ data : null, message: error.message });
        }
    }

    kitaplariGetir = async (req, res) => {  
        const kitap = await Kitap.findAll();
        res.status(200).send({ data : kitap, message: 'Kitaplar Listelendi' });
    }

    kitapGetir = async (req, res) => {  
        // const kitap = await Kitap.findByPk(req.params.id);
        const kitap = await Kitap.findOne({ where: { id: req.params.id } });
        res.status(200).send({ data : kitap, message: 'Kitaplar Listelendi' });
    }
}

module.exports = new KitapController();
const Yazar = require("../models/Yazar");

class YazarController {

    yazarEkle = async (req, res) => {
        const { isim, dogumTarihi, biyografi } = req.body;
        try {
            if (!isim) {
                const error = new Error('Yazar ismi boş olamaz!');
                error.statusCode = 400;
                throw error;
            }
            const result = await Yazar.create({
                isim,
                dogumTarihi,
                biyografi
            });
            res.status(200).send({ data: result, message: 'Yazar Eklendi' });
        } catch (error) {
            res.status(error?.statusCode || 500).send({ data: null, message: error.message });
        }
    }

    yazarlariGetir = async (req, res) => {
        try {
            const yazarlar = await Yazar.findAll();
            res.status(200).send({ data: yazarlar, message: 'Yazarlar Listelendi' });
        } catch (error) {
            res.status(500).send({ data: null, message: error.message });
        }
    }

    yazarGetir = async (req, res) => {
        try {
            const yazar = await Yazar.findOne({ where: { id: req.params.id } });
            if (!yazar) {
                const error = new Error('Yazar bulunamadı!');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send({ data: yazar, message: 'Yazar Getirildi' });
        } catch (error) {
            res.status(error?.statusCode || 500).send({ data: null, message: error.message });
        }
    }

    yazarinKitaplariniGetir = async (req, res) => {
        try {
            
            const yazar = await Yazar.findOne({ where: { id: req.params.id } });
            
            if (!yazar) {
                const error = new Error('Yazar bulunamadı!');
                error.statusCode = 404;
                throw error;
            }

            const kitaplar = await yazar.getKitaps({
                attributes: ['id', 'kitap_adi', 'basim_yili', 'sayfa_sayisi', 'fiyat', 'img'],
            });

            const result = {
                yazar: yazar,
                kitaplar: kitaplar
            }

            res.status(200).send({ data: result, message: 'Yazar Getirildi' });
        } catch (error) {
            res.status(error?.statusCode || 500).send({ data: null, message: error.message });
        }
    }
    
    yazarDuzenle = async (req, res) => {
        const { isim, dogumTarihi, biyografi } = req.body;
        const yazarID = req.params.id;

        try {
            if (!yazarID) {
                const error = new Error('Yazar ID\'si boş olamaz!');
                error.statusCode = 400;
                throw error;
            }

            const yazar = await Yazar.findByPk(yazarID);

            if (!yazar) {
                const error = new Error('Yazar bulunamadı!');
                error.statusCode = 404;
                throw error;
            }

            await Yazar.update({
                isim: isim !== undefined ? isim : yazar.isim,
                dogumTarihi: dogumTarihi !== undefined ? dogumTarihi : yazar.dogumTarihi,
                biyografi: biyografi !== undefined ? biyografi : yazar.biyografi
            }, { where: { id: yazarID } });

            res.status(200).send({ data: null, message: yazar.id + ' id\'li Yazar Düzenlendi' });
        } catch (error) {
            res.status(error?.statusCode || 500).send({ data: null, message: error.message });
        }
    }

    yazarSil = async (req, res) => {
        const yazarID = req.params.id;

        try {
            if (!yazarID) {
                const error = new Error('Yazar ID\'si boş olamaz!');
                error.statusCode = 400;
                throw error;
            }

            const yazar = await Yazar.findByPk(yazarID);

            if (!yazar) {
                const error = new Error('Yazar bulunamadı!');
                error.statusCode = 404;
                throw error;
            }

            await Yazar.destroy({ where: { id: yazarID } });

            res.status(200).send({ data: null, message: yazar.id + ' id\'li Yazar Silindi' });
        } catch (error) {
            res.status(error?.statusCode || 500).send({ data: null, message: error.message });
        }
    }

}

module.exports = new YazarController();
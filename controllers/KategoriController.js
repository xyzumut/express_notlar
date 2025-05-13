const Yazar = require("../models/Yazar");
const Kategori = require("../models/Kategori");

class KategoriController {

    kategoriEkle = async (req, res) => {
        const { kategori_adi, aciklama } = req.body;
        try {
            if (!kategori_adi) {
                const error = new Error('Kategori ismi boş olamaz!');
                error.statusCode = 400;
                throw error;
            }
            const result = await Kategori.create({
                kategori_adi,
                aciklama
            });
            res.status(200).send({ data: result, message: 'Kategori Eklendi' });
        } catch (error) {
            res.status(error?.statusCode || 500).send({ data: null, message: error.message });
        }
    }

    kategorileriGetir = async (req, res) => {
        try {
            const kategoriler = await Kategori.findAll();
            res.status(200).send({ data: kategoriler, message: 'Kategoriler Listelendi' });
        } catch (error) {
            res.status(500).send({ data: null, message: error.message });
        }
    }

    kategoriGetir = async (req, res) => {
        try {
            const kategori = await Kategori.findOne({ where: { id: req.params.id } });
            if (!kategori) {
                const error = new Error('Kategori bulunamadı!');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send({ data: kategori, message: 'Kategori Getirildi' });
        } catch (error) {
            res.status(error?.statusCode || 500).send({ data: null, message: error.message });
        }
    }

    kategoriDuzenle = async (req, res) => {
        const { kategori_adi, aciklama } = req.body;
        const kategoriID = req.params.id;

        try {
            if (!kategoriID) {
                const error = new Error('Kategori ID\'si boş olamaz!');
                error.statusCode = 400;
                throw error;
            }

            const kategori = await Kategori.findByPk(kategoriID);

            if (!kategori) {
                const error = new Error('Kategori bulunamadı!');
                error.statusCode = 404;
                throw error;
            }

            await Kategori.update({
                kategori_adi: kategori_adi !== undefined ? kategori_adi : kategori.kategori_adi,
                aciklama: aciklama !== undefined ? aciklama : kategori.aciklama
            }, { where: { id: kategoriID } });

            res.status(200).send({ data: null, message: kategori.id + ' id\'li Kategori Düzenlendi' });
        } catch (error) {
            res.status(error?.statusCode || 500).send({ data: null, message: error.message });
        }
    }

    kategoriSil = async (req, res) => {
        const kategoriID = req.params.id;

        try {
            if (!kategoriID) {
                const error = new Error('Kategori ID\'si boş olamaz!');
                error.statusCode = 400;
                throw error;
            }

            const kategori = await Kategori.findByPk(kategoriID);

            if (!kategori) {
                const error = new Error('Kategori bulunamadı!');
                error.statusCode = 404;
                throw error;
            }

            await Kategori.destroy({ where: { id: kategoriID } });

            res.status(200).send({ data: null, message: kategori.id + ' id\'li Kategori Silindi' });
        } catch (error) {
            res.status(error?.statusCode || 500).send({ data: null, message: error.message });
        }
    }

}

module.exports = new KategoriController();
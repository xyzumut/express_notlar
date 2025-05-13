const Kategori = require("../models/Kategori");
const Kitap = require("../models/Kitap");
const Yazar = require("../models/Yazar");
const { Op } = require("sequelize");

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
            
            
            const result = await yazar.createKitap({
                kitap_adi,
                basim_yili,
                sayfa_sayisi,
                fiyat,
                img,
                yazarId
            });
            
            res.status(200).send({ data : result, message: 'Kitap Eklendi' });
        } 
        catch (error) {
            res.status( error?.statusCode || 500 ).send({ data : null, message: error.message });
        }
    }

    kitaplariGetir = async (req, res) => {  

        try {

            const orderby = req.query.orderby || 'id';
            const order = req.query.order || 'ASC';
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || '';
            const page = parseInt(req.query.page) || 1;
            const offset = (page - 1) * limit;

            // Kategori filtresi
            let kategoriFilter = null;
            if (req.query.kategoriler) {
                try {
                    // Gelen kategori parametresini array'e çevir
                    const kategoriArray = JSON.parse(req.query.kategoriler);

                    if (Array.isArray(kategoriArray) && kategoriArray.every(Number.isInteger)) {
                        kategoriFilter = kategoriArray;
                    }

                } catch (error) {
                    kategoriFilter = [];
                    console.warn('Kategori filtresi yanlış formatta, sorguya eklenmedi.');
                }
            }


            const kitaplar = await Kitap.findAll({
                include:[
                    { model: Yazar, as:'yazar'},
                    { 
                        model: Kategori, 
                        as: 'kategoriler',
                        attributes: ['id', 'kategori_adi'], // sadece id ve kategori_adi alanlarını al
                        through: { attributes: [] }, // pivot tablosunu dahil etme 
                        where: kategoriFilter ? { id: { [Op.in]: kategoriFilter } } : null // kategori filtresi uygula
                    }
                ],
                order: [[orderby, order]],
                limit:limit,
                offset:offset,
                where: {
                    [Op.or]: [
                        { kitap_adi : { [Op.like]: `%${search}%` } },
                    ]
                },
            });

            res.status(200).send({ data : kitaplar, message: 'Kitaplar Listelendi' });
        } 
        catch (error) {
            res.status(500).send({ data: null, message: error.message });
        }
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

    kitapKategoriGir = async (req, res) => {

        const kitapID = req.params.id;
        const kategori_id = req.params.kategori_id;

        try {
            if (!kitapID || !kategori_id) {
                const error = new Error('Kitap ID\'si ve Kategori ID\'si boş olamaz!');
                error.statusCode = 400;
                throw error;
            }

            const kitap = await Kitap.findByPk(kitapID);

            if (!kitap) {
                const error = new Error('Kitap bulunamadı!');
                error.statusCode = 404;
                throw error;
            }

            const kategori = await Kategori.findByPk(kategori_id);

            if (!kategori) {
                const error = new Error('Kategori bulunamadı!');
                error.statusCode = 404;
                throw error;
            }

            const result = await kitap.addKategoriler(kategori_id);
            // const result = await kategori.addKitap(kitapID);

            res.status(200).send({ data : result, message: kitap.id+'id\'li Kitap Kategorisi Güncellendi' });
        } 
        catch (error) {
            res.status( error?.statusCode || 500 ).send({ data : null, message: error.message });
        }
    }

    kitapKategoriSil = async (req, res) => {

        const kitapID = req.params.id;
        const kategori_id = req.params.kategori_id;

        try {
            if (!kitapID || !kategori_id) {
                const error = new Error('Kitap ID\'si ve Kategori ID\'si boş olamaz!');
                error.statusCode = 400;
                throw error;
            }

            const kitap = await Kitap.findByPk(kitapID);

            if (!kitap) {
                const error = new Error('Kitap bulunamadı!');
                error.statusCode = 404;
                throw error;
            }

            const kategori = await Kategori.findByPk(kategori_id);

            if (!kategori) {
                const error = new Error('Kategori bulunamadı!');
                error.statusCode = 404;
                throw error;
            }

            const result = await kitap.removeKategori(kategori_id);

            res.status(200).send({ data : result, message: kitap.id+'id\'li Kitap Kategorisi Güncellendi' });
        } 
        catch (error) {
            res.status( error?.statusCode || 500 ).send({ data : null, message: error.message });
        }
    }
}

module.exports = new KitapController();
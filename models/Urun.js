
const db = require('../utils/database');

class Urun{

    ad;
    fiyat;

    constructor(ad, fiyat){
        this.ad     = ad;
        this.fiyat  = fiyat;
    }

    static urunEkle = async (urun = {urun_adi, urun_fiyati}) => {
        const result = await db.execute(
            'INSERT INTO urunler (urun_adi, urun_fiyat) VALUES (?, ?)', 
            [urun.urun_adi, urun.urun_fiyati]
        );
        return {...urun, id:result[0].insertId};
    }

    static urunGetir = async (id) => {
        const queryExecute = await db.execute('SELECT * FROM urunler WHERE id = ?', [id]);
        const result = queryExecute[0];
        return result;
    }

    static urunleriGetir = async () => {
        const queryExecute = await db.execute('SELECT * FROM urunler');
        const result = queryExecute[0];
        return result;
    }

    static urunSil = async (id) => {
        const queryExecute = await db.execute('DELETE FROM urunler WHERE id = ?', [id]);
        const affectedRows = queryExecute[0].affectedRows;
        return affectedRows;
    }
}

module.exports = Urun;
const fs = require('fs');
const path = require('path');
const __rootdir = require('../utils/path');

class Urun{

    static path = path.join(__rootdir, 'data', 'urunler.json');
    static urunler = [];

    constructor(ad, fiyat){
        this.ad = ad;
        this.fiyat = fiyat;
    }

    save = () => {

        fs.readFile(Urun.path, (err, data) => {

            if(!err){
                Urun.urunler = data.toString() === '' ? [] : JSON.parse(data);
            }

            Urun.urunler.push({ad: this.ad, fiyat: this.fiyat});

            fs.writeFile(Urun.path, JSON.stringify(Urun.urunler), (err) => {
                console.log(err);
            });

        });
    }

    static fetchAll = () => {
        
        try {
            const data = fs.readFileSync(Urun.path);
            Urun.urunler = data.toString() === '' ? [] : JSON.parse(data);
        } 
        catch (err) {
            console.error(err);
            Urun.urunler = [];
        }

        return Urun.urunler;
    }
}

module.exports = Urun;
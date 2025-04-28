const Sequalize = require('sequelize');
const sequelize = require('../utils/database');

const Kitap = sequelize.define('kitap', {
    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    kitap_adi: {
        type: Sequalize.STRING,
        allowNull: false
    },
    basim_yili: {
        type: Sequalize.DATE,
        allowNull: false
    },
    sayfa_sayisi: {
        type: Sequalize.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
            min: 1,
        }
    },
    fiyat:{
        type:Sequalize.INTEGER.UNSIGNED,
        allowNull:true,
        validate:{
            min:0,
        }
    },
    img:{
        type:Sequalize.STRING,
        allowNull:true
    },
});

module.exports = Kitap;
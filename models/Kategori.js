const Sequalize = require('sequelize');
const sequelize = require('../utils/database');

const Kategori = sequelize.define('kategori', {
    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    kategori_adi: {
        type: Sequalize.STRING,
        allowNull: false
    },
    aciklama: {
        type: Sequalize.STRING,
        allowNull: true
    }
});

module.exports = Kategori;
const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Yazar = sequelize.define('Yazar', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    isim: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dogumTarihi: {
        type: Sequelize.DATE,
        allowNull: true
    },
    biyografi: {
        type: Sequelize.TEXT,
        allowNull: true
    }
});

module.exports = Yazar;
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database:'express',
    username: 'root',
    password: 'Allods06.',
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
const Sequalize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('user', {
    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequalize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3, 20], 
                msg: 'Kullanıcı adı uzunluğu 3 ile 20 karakter arasında olmalıdır', 
            }
        },
    },
    password: {
        type: Sequalize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 20], 
                msg: 'Şifre uzunluğu 6 ile 20 karakter arasında olmalıdır', 
            }, 
        },
    },
    email: {
        type: Sequalize.STRING,
        allowNull: false,
        unique: {
            msg: 'Bu e-posta adresi zaten kayıtlı', 
        },
        validate: {
            isEmail: {
                msg: 'Lütfen geçerli bir e-posta adresi girin',
                deneme:true
            },
        },

    },
});

module.exports = User;
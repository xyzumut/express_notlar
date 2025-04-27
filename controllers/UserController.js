const User = require("../models/User");

class UserController {

    userEkle = async (req, res) => {
        const { username, email, password } = req.body;
        try {
            if (!username || !email || !password) {
                const error = new Error('İsim, email ve şifre boş olamaz!');
                error.statusCode = 400;
                throw error;
            }
            const result = await User.create({
                username,
                email,
                password
            });
            res.status(200).send({ data: result, message: 'Kullanıcı Eklendi' });
        } catch (error) {
            res.status(error?.statusCode || 500).send({ data: null, message: error.message.replaceAll('Validation error: ', '') });
        }
    }

    userlariGetir = async (req, res) => {
        try {
            const users = await User.findAll();
            res.status(200).send({ data: users, message: 'Kullanıcılar Listelendi' });
        } catch (error) {
            res.status(500).send({ data: null, message: error.message });
        }
    }

    userGetir = async (req, res) => {
        try {
            const user = await User.findOne({ where: { id: req.params.id } });
            if (!user) {
                const error = new Error('Kullanıcı bulunamadı!');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).send({ data: user, message: 'Kullanıcı Getirildi' });
        } catch (error) {
            res.status(error?.statusCode || 500).send({ data: null, message: error.message });
        }
    }

    userDuzenle = async (req, res) => {
        const { username, email, password } = req.body;
        const userID = req.params.id;

        try {
            if (!userID) {
                const error = new Error('Kullanıcı ID\'si boş olamaz!');
                error.statusCode = 400;
                throw error;
            }

            const user = await User.findByPk(userID);

            if (!user) {
                const error = new Error('Kullanıcı bulunamadı!');
                error.statusCode = 404;
                throw error;
            }

            await User.update({
                username: username !== undefined ? username : user.username,
                email: email !== undefined ? email : user.email,
                password: password !== undefined ? password : user.password
            }, { where: { id: userID } });

            res.status(200).send({ data: null, message: user.id + ' id\'li Kullanıcı Düzenlendi' });
        } catch (error) {
            res.status(error?.statusCode || 500).send({ data: null, message: error.message });
        }
    }

    userSil = async (req, res) => {
        const userID = req.params.id;

        try {
            if (!userID) {
                const error = new Error('Kullanıcı ID\'si boş olamaz!');
                error.statusCode = 400;
                throw error;
            }

            const user = await User.findByPk(userID);

            if (!user) {
                const error = new Error('Kullanıcı bulunamadı!');
                error.statusCode = 404;
                throw error;
            }

            await User.destroy({ where: { id: userID } });

            res.status(200).send({ data: null, message: user.id + ' id\'li Kullanıcı Silindi' });
        } catch (error) {
            res.status(error?.statusCode || 500).send({ data: null, message: error.message });
        }
    }

}

module.exports = new UserController();
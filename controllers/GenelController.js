
class GenelController{

    errorDeneme = (req, res, next) => {
        try {
            throw {...(new Error('Bu bir hata mesajıdır!')), statusCode:404};
            res.status(200).send({ message: 'İşlem Başarılı' }); 
        } 
        catch (error) {
            res.status(error?.statusCode || 400 ).send({ message: error.message }); 
        }
    }
}

module.exports = new GenelController();

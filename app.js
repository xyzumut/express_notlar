const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./utils/database');

const KitapRoute  = require('./routes/KitapRoute');
const UserRoute = require('./routes/UserRoute');
const YazarRoute = require('./routes/YazarRoute');
const GenelRoute = require('./routes/GenelRoutes');

const User = require('./models/User');
const Yazar = require('./models/Yazar');
const Kitap = require('./models/Kitap');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next(); 
});

//*******************************************************/
// Modellerin birbirleriyle olan ilişkilerini tanımlıyoruz
Yazar.hasMany(Kitap, { onDelete: 'CASCADE', foreignKey: {name:'yazarId', allowNull:false} });
// Bir yazarın birden fazla kitabı olabilir
Kitap.belongsTo(Yazar, { foreignKey: {name:'yazarId', allowNull:false} });
// Bir kitabın bir yazarı olabilir
//*******************************************************/


sequelize.sync({force:false})
    .then(() => {
        console.log('Veritabani ve tablolar oluşturuldu!');

        app.listen(8081, () => {
            app.use(GenelRoute);
            app.use('/kitap', KitapRoute);
            app.use('/user', UserRoute);
            app.use('/yazar', YazarRoute);
        
            app.use((req, res, next) => {
                res.status(404).send({ message: 'Not Found' });
            });
        });
    })
    .catch((err) => {
        console.error('Veritabani ve tablolar olusturulurken hata olustu:', err);
    });
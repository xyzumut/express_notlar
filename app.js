/**
 * Notlar
 * - 'as' anahtar kelimesi için olan notu mutlaka ekle
 * - Üstteki maddeyi halledince buraya kadarki kısmı nota ekle
 * - Düzgün filtrelemeli Yazar ve Kitap controllerlarını döküme et
 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./utils/database');

const KitapRoute  = require('./routes/KitapRoute');
const UserRoute = require('./routes/UserRoute');
const YazarRoute = require('./routes/YazarRoute');
const GenelRoute = require('./routes/GenelRoutes');
const KategoriRoute = require('./routes/KategoriRoutes');

const Kategori = require('./models/Kategori');
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
Yazar.hasMany(Kitap, { onDelete: 'CASCADE', foreignKey: {allowNull:false, name:'yazarId'} }); // allowNull:false olduğu için yazarId boş olamaz
// Bir yazarın birden fazla kitabı olabilir
Kitap.belongsTo(Yazar, { foreignKey: { name:'yazarId' }, as:'yazar' }); // allowNull:false olduğu için yazarId boş olamaz
// Bir kitabın bir yazarı olabilir
//*******************************************************/

// *******************************************************/
// Kitap ve Kategori arasındaki ÇOKA ÇOK ilişkiyi tanımlıyoruz
Kitap.belongsToMany(Kategori, { through: 'pivot_kategori_kitap', foreignKey: 'kitapId', as: 'kategoriler' });
Kategori.belongsToMany(Kitap, { through: 'pivot_kategori_kitap', foreignKey: 'kategoriId', as: 'kitaplar' });
// (!) Foreign keylere dikkat edilmeli (!)
// ********************************************************/


sequelize.sync({force:false})
    .then(() => {

        console.log('Veritabani ve tablolar oluşturuldu!');

        const server = app.listen(8081, () => {
            app.use(GenelRoute);
            app.use('/kitap', KitapRoute);
            app.use('/user', UserRoute);
            app.use('/yazar', YazarRoute);
            app.use('/kategori', KategoriRoute);
            app.get('/sayfa', (req, res) => {
                console.log('sayfa isteği geldi');
                res.sendFile('./views/page.html', { root: __dirname });
            });


            app.use((req, res, next) => {
                res.status(404).send({ message: 'Not Found' });
            });
        });

        const io = require('socket.io')(server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        });

        const userCounters = {}; // socket.id -> sayaç

        io.on('connection', (socket) => {
            // Her yeni kullanıcı için sayaç başlat
            userCounters[socket.id] = 0;

            // Tüm kullanıcılara güncel sayaçları gönder
            io.emit('counters', userCounters);

            // Butona basılınca
            socket.on('increment', () => {
                userCounters[socket.id] = (userCounters[socket.id] || 0) + 1;
                io.emit('counters', userCounters); // Herkese güncel sayaçları gönder
            });56

            socket.on('disconnect', () => {
                delete userCounters[socket.id];
                io.emit('counters', userCounters); // Herkese güncel sayaçları gönder
            });
        });

    })
    .catch((err) => {
        console.error('Veritabani ve tablolar olusturulurken hata olustu:', err);
    });
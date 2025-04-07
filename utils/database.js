const mysql = require('mysql2');

// Veritabanı bağlantısı için bir veritabanı istek havuz oluşturduk
const pool = mysql.createPool({
    host: 'localhost',
    user:'root',
    password: 'Allods06.',
    database:'express',
});
// Bir bağlantı havuzu oluşturur. Bağlantı havuzu, birden fazla
//  istemcinin aynı anda veritabanına bağlanmasını yönetir ve 
// performansı artırır.


module.exports = pool.promise();
// mysql2 modülü, hem callback tabanlı hem de Promise tabanlı 
// API sağlar. Bu satır, bağlantı havuzunu Promise tabanlı bir 
// API ile dışa aktarır.
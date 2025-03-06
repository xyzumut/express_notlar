const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const urunRoute = require('./routes/route-urun');
const path = require('path');
const __rootdir = require('./utils/path');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__rootdir, 'public')));

app.listen(3000, () => {

    app.use('/urun', urunRoute);

    app.use((req, res, next) => {
        res.status(404).sendFile(path.join(__rootdir, 'views', '404.html'));
    });

});
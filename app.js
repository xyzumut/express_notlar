const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const UrunRoute  = require('./routes/UrunRoute');
const GenelRoute = require('./routes/GenelRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next(); 
});

app.listen(8081, () => {

    app.use('/urun', UrunRoute);
    app.use(GenelRoute);

    app.use((req, res, next) => {
        res.status(404).send({ message: 'Not Found' });
    });
});
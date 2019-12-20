'use strict';

exports = module.exports = function(app) {
    //Tussenpersonen
    console.info('Routes')
    app.get('/Tussenpersonen', require('./Tussenpersoon').init);
    app.get('/Tussenpersonen/LoadData', require('./Tussenpersoon').LoadData);
    app.post('/Tussenpersonen/UpdateData', require('./Tussenpersoon').UpdateData);
    app.post('/Tussenpersonen/InsertData', require('./Tussenpersoon').InsertData);
    app.post('/Tussenpersonen/DeleteData', require('./Tussenpersoon').DeleteData);
    app.get('/', require('../views/index').init);
    
    //route not found
    app.all('*', require('../views/http/index').http404);
};

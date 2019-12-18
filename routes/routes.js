'use strict';

exports = module.exports = function(app) {
    //front end
    console.info('Routes')
    app.get('/Tussenpersonen', require('./Tussenpersoon').init);
    app.get('/Tussenpersonen/LoadData', require('./Tussenpersoon').LoadData);
    app.get('/Tussenpersonen/UpdateData', require('./Tussenpersoon').UpdateData);
    app.get('/Tussenpersonen/InsertData', require('./Tussenpersoon').InsertData);
    app.get('/Tussenpersonen/DeleteData', require('./Tussenpersoon').DeleteData);
    app.get('/sql', require('./mssql').getData);

    app.get('/', require('../views/index').init);
    
    //route not found
    app.all('*', require('../views/http/index').http404);
};

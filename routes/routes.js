'use strict';

exports = module.exports = function(app) {
    //Tussenpersonen
    app.get('/Tussenpersonen/LoadData', require('./Tussenpersoon').LoadData);
    app.post('/Tussenpersonen/UpdateData', require('./Tussenpersoon').UpdateData);
    app.post('/Tussenpersonen/InsertData', require('./Tussenpersoon').InsertData);
    app.post('/Tussenpersonen/DeleteData', require('./Tussenpersoon').DeleteData);

    //Rol
    app.get('/Rol/LoadData',    require('./Rol').LoadData);
    app.post('/Rol/UpdateData', require('./Rol').UpdateData);
    app.post('/Rol/InsertData', require('./Rol').InsertData);
    app.post('/Rol/DeleteData', require('./Rol').DeleteData);


    app.get('/', require('../views/index').init);
    
    //route not found
    app.all('*', require('../views/http/index').http404);
};

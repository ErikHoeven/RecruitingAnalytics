var Connection = require('tedious').Connection;
var config = {
    userName: 'ehoeven@wisdomasaservice.nl',
    password: 'M@r13ke1sl13f10',
    server: 'srvdvgenerator.database.windows.net',
    'authentication': {
        'type': 'azure-active-directory-password',  
    // When you connect to Azure SQL Database, you need these next options.
    options: {encrypt: true, database: 'ontw-DataVaultGen'}
};
var connection = new Connection(config);
var query = "SELECT * from [wp_ra].[tussenpersoon];"
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

function executeStatement() {
    request = new Request(query, function(err) {
    if (err) {
        console.log(err);} 
    });
    var result = "";
    request.on('row', function(columns) {
        columns.forEach(function(column) {
          if (column.value === null) {
            console.log('NULL');
          } else {
            result+= column.value + " ";
          }
        });
        console.log(result);
        result ="";
    });

    request.on('done', function(rowCount, more) {
    console.log(rowCount + ' rows returned');
    });
    connection.execSql(request);

}

exports.getData = function (req, res, next){
    connection.on('connect', function(err) {
        // If no error, then good to proceed.
        console.log("Connected");
        executeStatement();
        //executeStatement1();
    
    });

}

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var uuid = require('node-uuid');
var async = require('async');

var config = {
    server: 'srvdvgenerator.database.windows.net',
    authentication: {
        type: 'azure-active-directory-password',
        options: {
            userName: 'ehoeven@wisdomasaservice.nl', // update me
            password: 'M@r13ke1sl13f10' // update me
        }
    },
    options: {
        database: 'ontw-DataVaultGen', encrypt: true
    }
};


var connection = new Connection(config);

function Start(callback) {
    console.log('Starting...');
    callback(null, 'Wier', 'Wieringa', 'plaats', 'postcode', 'telefoon', 'contactpersoon', 3, 2);
}


function Insert(naam, adres, plaats, postcode,telefoon, contactpersoon, contactpersoonId, marge,  callback) {
    request = new Request(
        'exec wp_ra.invoerenTussenPersoon ' + '\'' + naam + '\',\'' +  adres  + '\',\'' + plaats  + '\',\'' + postcode + '\',\'' + telefoon + '\',\'' + contactpersoon + '\',' + contactpersoonId  + ','  + marge,
        function(err, rowCount, rows) {
        if (err) {
            callback(err);
        } else {
            console.log(rowCount + ' row(s) inserted');
            callback(null);
        }
    })
    connection.execSql(request)
}
    
        
function Read(callback) {
    console.log('Reading rows from the Table...');

    // Read all rows from table
    request = new Request(
    'SELECT * from [wp_ra].[tussenpersoon];',
    function(err, rowCount, rows) {
    if (err) {
        callback(err);
    } else {
        console.log(rowCount + ' row(s) returned');
        callback(null);
    }
    });

    // Print the rows read
    var result = "";
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });

    // Execute SQL statement
    connection.execSql(request);
}

function Complete(err, result) {
    if (err) {
        callback(err);
    } else {
        console.log("Done!");
    }
}

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected');
  
      // Execute all functions in the array serially
      async.waterfall([
          Start,
          Insert,
          Read
      ], Complete)
    }
  });



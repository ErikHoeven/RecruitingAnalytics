var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var uuid = require('node-uuid');
var async = require('async');
var underscor = require('underscore')

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

function invoerenTussenPersoon(naam, adres, plaats, postcode,telefoon, contactpersoon, contactpersoonId, marge) {
    connection.on('connect', function (err) {
        request = new Request(
            'exec wp_ra.invoerenTussenPersoon ' + '\'' + naam + '\',\'' +  adres  + '\',\'' + plaats  + '\',\'' + postcode + '\',\'' + telefoon + '\',\'' + contactpersoon + '\',' + contactpersoonId  + ','  + marge,
            function(err, rowCount, rows) {
            if (err) {
                console.info(err);
            } else {
                console.log(rowCount + ' row(s) inserted');
                connection.close()
            }
        })
        connection.execSql(request)
    })   
}

function wijzigenTussenPersoon(naam, adres, plaats, postcode,telefoon, contactpersoon, contactpersoonId, marge) {
    connection.on('connect', function (err) {
        request = new Request(
            'exec wp_ra.wijzigenTussenPersoon ' + '\'' + naam + '\',\'' +  adres  + '\',\'' + plaats  + '\',\'' + postcode + '\',\'' + telefoon + '\',\'' + contactpersoon + '\',' + contactpersoonId  + ','  + marge,
            function(err, rowCount, rows) {
            if (err) {
                console.info(err);
            } else {
                console.log(rowCount + ' row(s) updated');
                connection.close()
            }
        })
        connection.execSql(request)
    })   
}

function verwijderenTussenPersoon(naams) {
    connection.on('connect', function (err) {
        request = new Request(
            'exec wp_ra.wijzigenTussenPersoon ' + '\'' + naam + '\',\'' +  adres  + '\',\'' + plaats  + '\',\'' + postcode + '\',\'' + telefoon + '\',\'' + contactpersoon + '\',' + contactpersoonId  + ','  + marge,
            function(err, rowCount, rows) {
            if (err) {
                console.info(err);
            } else {
                console.log(rowCount + ' row(s) removed');
                connection.close()
            }
        })
        connection.execSql(request)
    })   
}


function toonTussenPersoon(naams) {
    connection.on('connect', function (err) {
        request = new Request(
            'SELECT * from [wp_ra].[tussenpersoon];',
            function(err, rowCount, rows) {
            if (err) {
                console.info(err);
            } else {
                console.log(rowCount + ' row(s) returned');
                connection.close()
            }
        })

        // Print the rows read
        var result = "";
        var tussenperoon = {}
        var lstTussenPersonen = []
        request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                tussenperoon[column.metadata.colName] = column.value
            }
            pushToArray(lstTussenPersonen,tussenperoon)           
        })
        console.info(lstTussenPersonen)
        })

        connection.execSql(request)
    })   
}

function pushToArray ( arr, obj ) {
    var existingIds = arr.map((obj) => obj.id);
  
      if (! existingIds.includes(obj.id)) {
        arr.push(obj);
      } else {
        arr.forEach((element, index) => {
          if (element.id === obj.id) {
            arr[index] = obj;
          };
        });
      };
  };
  



//wijzigenTussenPersoon('Wier', 'Wieringaaann', 'Rijswijks', 'postcode', 'telefoon', 'contactpersoon', 3, 2)
toonTussenPersoon()




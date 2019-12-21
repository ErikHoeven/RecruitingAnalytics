var express = require('express');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
    server: 'srvdvgenerator.database.windows.net',
    authentication: {
        type: 'azure-active-directory-password',
        options: {
            userName: 'ehoeven@wisdomasaservice.nl', 
            password: 'M@r13ke1sl13f10' 
        }
    },
    options: {
        database: 'ontw-DataVaultGen', encrypt: true, rowCollectionOnRequestCompletion: true
    }
};

exports.LoadData = function (req, res, next){
    console.info('LoadData')
    var connection = new Connection(config);
    connection.on('connect', function (err) {
        request = new Request(
            'select t.RolNaam, t.RolMinTarief ,t.RolMaxTarief, t.RolId from wp_ra.rol t;',
            function(err, rowCount, rows) {
            if (err) {
                console.info(err);
            } else {
                console.log(rowCount + ' row(s) returned');
                jsonArray = []
                rows.forEach(function (columns) {
                    var rowObject ={}
                    columns.forEach(function(column) {
                        rowObject[column.metadata.colName] = column.value;
                    });
                    jsonArray.push(rowObject)
                })
                console.info(jsonArray)

                var theader = ''
                , tbody = ''
                , optionlist = ''
                , table = ''
                , columns = ['Rolnaam','RolMinTarief','RolMaxTarief']
                , body = setBody(jsonArray)
                , header = setHeader(columns)
                
                res.status(200).json({header: header, body: body, count: jsonArray.count})
                
                connection.close()
                
            }
        })
        // Print the rows read
        request.on('row', function(columns) {         
        })
        connection.execSql(request)
    }) 
}  
      
exports.UpdateData = function (req, res, next){
    console.info('UpdateData')
    var item = req.body.rol;
    console.info(item)
    console.info(item.RolId)
    wijzigenRol(item.RolNaam, item.RolMinTarief, item.RolMaxTarief, item.RolId)
    res.status(200).json({message:"Succesvol bijgewerkt"})
    
}

exports.InsertData = function (req, res, next){
    console.info('InsertData')
    var item = req.body.rol;
    console.info(item)
    invoerenRol(item.RolNaam, item.RolMinTarief, item.RolMaxTarief)
    res.status(200).json({message:"Succesvol toegevoegd"})


    
}

exports.DeleteData = function (req, res, next){
    var item = req.body.id
    console.info('item')
    console.info(item)
    verwijderenRol(item)
 




}

  function setHeader(lstColumns) {
    var strHeader = '<theader>'

    var strHeader = '<theader>'

    lstColumns.forEach(function (c) {
        strHeader = strHeader + '<th>' + c + '</th>'
    })

    strHeader = strHeader + '</theader>'

    return strHeader
}


function setBody(ds) {
    var strBody = '<tbody>'
    console.info('setBody')
    console.info(ds)

    ds.forEach(function (row) {

            if (!row.hide_input){
                strBody = strBody + 
                    '<tr><td id="RolNaam' + row.RolId +'">'+ row.RolNaam + '</td>' +
                    '<td id="RolMinTarief' + row.RolId +'">'+ row.RolMinTarief + '</td>' +
                    '<td id="RolMaxTarief' + row.RolId +'">'+ row.RolMaxTarief + '</td>' +                    
                    '<td id="edit'+ row.RolId + '"><button type="button" class="btn btn-primary" onclick="updateRolFields(\'' +row.RolId + '\',\'' + row.RolNaam + '\',\''+  row.RolMinTarief + '\',\'' + row.RolMaxTarief + '\')"><span id="span"'+ row.TussenPersoonId +' class="glyphicon glyphicon-edit"></span> Edit</button></td>' +
                    '<td id="del'+ row.RolId + '"><button type="button"  class="btn btn-primary" onclick="removeRol(\'' +row.RolId + '\')"><span id="span"'+ row.RolId +' class="glyphicon glyphicon-remove"></span> Remove</button></td>' +
                    '</tr>'
            }
            else{
                strBody = strBody + '<tr><td id="firstname' + row.TussenPersoonId +'">'+ row.firstname + '</td>' +
                '<td id="lastname' + row.TussenPersoonId +'">'+ row.lastname + '</td>' +
                '<td id="role' + row.TussenPersoonId +'">'+ row.role + '</td>' +
                '<td id="percFullTime' + row.TussenPersoonId +'">'+ row.percFullTime + '</td></tr>'
            }
    })

    strBody = strBody + '</tbody>'
    return strBody
}

function wijzigenRol(RolNaam, RolMinTarief, RolMaxTarief, RolId) {
    var connection = new Connection(config);   
    var query = 'exec wp_ra.wijzigenRol ' + '\'' + RolNaam  + '\',' + RolMinTarief  + ',' + RolMaxTarief + ',' + RolId 
    connection.on('connect', function (err) {
        request = new Request(query,function(err, rowCount, rows) {
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


function invoerenRol(RolNaam, RolMinTarief, RolMaxTarief) {
    var connection = new Connection(config);
    var query = 'exec wp_ra.invoerenRol ' + '\'' + RolNaam + '\',' +  RolMinTarief  + ',' + RolMaxTarief
    console.info(query)
    connection.on('connect', function (err) {
        request = new Request(
            query,
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

function verwijderenRol(id) {
    var connection = new Connection(config);
    connection.on('connect', function (err) {
        request = new Request(
            'DELETE FROM [wp_ra].[Rol] WHERE RolId = ' + id ,
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
   
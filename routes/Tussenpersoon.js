var express = require('express');
var router = express.Router();
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var async = require('async');
var underscore = require('underscore')

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
            'select t.TussenPersoonId, t.Naam, t.Adres, t.Plaats, t.Postcode, t.Telefoon, t.Postcode, t.ContactPersoon, t.Marge from wp_ra.tussenpersoon t;',
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
                , columns = ['Naam','Adres','Plaats','Postcode','Telefoon','ContactPersoon','Marge']
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
    var item = req.body.tussenpersoon;
    console.info(item)
    console.info(item.TussenPersoonId)
    wijzigenTussenPersoon(item.Naam, item.Adres, item.Plaats,item.Postcode, item.Telefoon, item.ContactPersoon, item.Marge, item.TussenPersoonId)
    res.status(200).json({message:"Succesvol bijgewerkt"})
    
}

exports.InsertData = function (req, res, next){
    console.info('InsertData')
    var item = req.body.tussenpersoon;
    console.info(item)
    invoerenTussenPersoon(item.Naam, item.Adres, item.Plaats, item.Postcode, item.Telefoon, item.ContactPersoon, item.Marge)
    res.status(200).json({message:"Succesvol toegevoegd"})


    
}

exports.DeleteData = function (req, res, next){
    var item = req.body.id

    verwijderenTussenPersoon(item)
 




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


    ds.forEach(function (row) {

            if (!row.hide_input){
                strBody = strBody + 
                    '<tr><td id="Naam' + row.TussenPersoonId +'">'+ row.Naam + '</td>' +
                    '<td id="Adres' + row.TussenPersoonId +'">'+ row.Adres + '</td>' +
                    '<td id="Plaats' + row.TussenPersoonId +'">'+ row.Plaats + '</td>' +
                    '<td id="Postcode' + row.TussenPersoonId +'">'+ row.Postcode + '</td>' +
                    '<td id="Telefoon' + row.TussenPersoonId +'">'+ row.Telefoon + '</td>' +
                    '<td id="ContactPersoon' + row.TussenPersoonId +'">'+ row.ContactPersoon + '</td>' +
                    '<td id="Marge' + row.TussenPersoonId +'">'+ row.Marge + '</td>' +
                    '<td id="edit'+ row.TussenPersoonId + '"><button type="button" class="btn btn-primary" onclick="updateTussenPersoon(\'' +row.TussenPersoonId + '\',\'' + row.Naam + '\',\''+  row.Adres + '\',\'' + row.Plaats + '\',\'' + row.Postcode + '\',\'' + row.Telefoon + '\',\'' + row.ContactPersoon + '\',\'' + row.Marge + '\')"><span id="span"'+ row.TussenPersoonId +' class="glyphicon glyphicon-edit"></span> Edit</button></td>' +
                    '<td id="del'+ row.TussenPersoonId + '"><button type="button"  class="btn btn-primary" onclick="removeTussenPersoon(\'' +row.TussenPersoonId + '\')"><span id="span"'+ row.TussenPersoonId +' class="glyphicon glyphicon-remove"></span> Remove</button></td>' +
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

function wijzigenTussenPersoon(naam, adres, plaats, postcode, telefoon, contactpersoon, marge, TussenPersoonId) {
    var connection = new Connection(config);   
    var query = 'exec wp_ra.wijzigenTussenPersoon ' + '\'' + naam + '\',\'' +  adres  + '\',\'' + plaats  + '\',\'' + postcode + '\',\'' + telefoon + '\',\'' + contactpersoon + '\','  + marge + ','  + TussenPersoonId
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


function invoerenTussenPersoon(naam, adres, plaats, postcode,telefoon, contactpersoon, marge) {
    var connection = new Connection(config);
    var query = 'exec wp_ra.invoerenTussenPersoon ' + '\'' + naam + '\',\'' +  adres  + '\',\'' + plaats  + '\',\'' + postcode + '\',\'' + telefoon + '\',\'' + contactpersoon + '\','  + marge
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

function verwijderenTussenPersoon(id) {
    var connection = new Connection(config);
    connection.on('connect', function (err) {
        request = new Request(
            'DELETE FROM [wp_ra].[tussenpersoon] WHERE TussenPersoonId = ' + id ,
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
   
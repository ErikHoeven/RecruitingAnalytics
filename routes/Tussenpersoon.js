var express = require('express');
var router = express.Router();
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
            userName: 'ehoeven@wisdomasaservice.nl', 
            password: 'M@r13ke1sl13f10' 
        }
    },
    options: {
        database: 'ontw-DataVaultGen', encrypt: true, rowCollectionOnRequestCompletion: true
    }
};

exports.init = function (req, res, next) {
    console.info('Tussenpersoon.js')
        res.render('../views/tussenpersonen/Tussenpersoon');
}

exports.LoadData = function (req, res, next){
    console.info('LoadData')
  
    var connection = new Connection(config);
    connection.on('connect', function (err) {
        request = new Request(
            'select t.TussenPersoonId, t.Naam, t.Adres, t.Plaats, t.Postcode, t.Telefoon, t.Postcode, t.ContactPersoon from wp_ra.tussenpersoon t;',
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
                , columns = ['Naam','Adres','Plaats','Telefoon','ContactPersoon']
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
    var item = prepareItem(req.body);

    db.update({ _id: item._id }, item, {}, function(err) {
        res.json(item);
    }
)}

exports.InsertData = function (req, res, next){
    db.insert(prepareItem(req.body), function(err, item) {
        res.json(item);
    }
)}

exports.DeleteData = function (req, res, next){
    var item = prepareItem(req.body);

    db.remove({ _id: item._id }, {}, function(err) {
        res.json(item);
    }
)}


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
                    '<td id="Telefoon' + row.TussenPersoonId +'">'+ row.Telefoon + '</td>' +
                    '<td id="ContactPersoon' + row.TussenPersoonId +'">'+ row.ContactPersoon + '</td>' +
                    '<td id="edit'+ row.TussenPersoonId + '"><button type="button" class="btn btn-primary" onclick="updateTussenPersoon(\'' +row.TussenPersoonId + '\',\'' + row.Naam + '\',\''+  row.Adres + '\',\'' + row.Plaats + '\',\'' + row.Telefoon + '\',\'' + row.ContactPersoon + '\')"><span id="span"'+ row.TussenPersoonId +' class="glyphicon glyphicon-edit"></span> Edit</button></td>' +
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
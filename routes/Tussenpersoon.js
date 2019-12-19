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

                strBody = strBody + '<tr><td id="firstname' + row._id +'">'+ row.Name + '</td>' +
                    '<td id="lastname' + row._id +'">'+ row.lastname + '</td>' +
                    '<td id="role' + row._id +'">'+ row.role + '</td>' +
                    '<td id="percFullTime' + row._id +'">'+ row.percFullTime + '</td>' +
                    '<td id="edit'+ row._id + '"><button type="button" class="btn btn-default btn-sm" onclick="updateEmployeeField(\'' +row._id + '\',\'' + row.firstname + '\',\''+  row.lastname + '\',\'' + row.role + '\',\'' + row.percFullTime + '\')"><span id="span"'+ row._id +' class="glyphicon glyphicon-edit"></span> Edit</button></td>' +
                    '<td id="del'+ row._id + '"><button type="button" class="btn btn-default btn-sm" onclick="removeEmployeeValue(\'' +row._id + '\')"><span id="span"'+ row._id +' class="glyphicon glyphicon-remove"></span> Remove</button></td>' +
                    '</tr>'
            }
            else{
                strBody = strBody + '<tr><td id="firstname' + row._id +'">'+ row.firstname + '</td>' +
                '<td id="lastname' + row._id +'">'+ row.lastname + '</td>' +
                '<td id="role' + row._id +'">'+ row.role + '</td>' +
                '<td id="percFullTime' + row._id +'">'+ row.percFullTime + '</td></tr>'
            }
    })

    strBody = strBody + '</tbody>'
    return strBody
}
var express = require('express');
var router = express.Router();
var clientsData = require('../db/client.json');
var Datastore = require('nedb');
var db = new Datastore();
db.insert(clientsData);

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



var prepareItem = function(source) {
    var result = source;
    result.Married = source.Married === 'true' ? true : false;
    result.Country = parseInt(source.Country, 10);
    return result;
}

var getClientFilter = function(query) {
    var result = {
        Name: new RegExp(query.Name, "i"),
        Address: new RegExp(query.Address, "i")
    };

    if(query.Married) {
        result.Married = query.Married === 'true' ? true : false;
    }

    if(query.Country && query.Country !== '0') {
        result.Country = parseInt(query.Country, 10);
    }

    return result;
};

exports.init = function (req, res, next) {
    console.info('Tussenpersoon.js')
        res.render('../views/tussenpersonen/Tussenpersoon');
}

exports.LoadData = function (req, res, next){
    console.info('LoadData')
    
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
        res.json(lstTussenPersonen)
        })

        connection.execSql(request)
    })   
}
    
    
    
    
    
    
    // db.find(getClientFilter(req.query), function(err, items) {
    //     res.json(items);
    // }
// )}
    
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



var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/sportdb';
var str = "";

app.route('/sports').get(function(req, res)

    {
        MongoClient.connect(url, function(err, db) {
            var cursor = db.collection('sports').find();
            //noinspection JSDeprecatedSymbols
            cursor.each(function(err, item) {

                if (item != null) {
                    str = str + "    sport id  " + item.sport.id + "</br>";
                }
            });
            res.send(str);
            db.close();
        });
    });

var server = app.listen(8080, function() {}); 
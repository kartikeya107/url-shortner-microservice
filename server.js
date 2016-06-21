'use strict';

var express = require('express');
var mongo = require('mongodb').MongoClient;
var route = require("./app/routes/index.js");

var app = express();

mongo.connect("mongodb://localhost:27017/urlshorten", function(err, db) {
    if(err) {
        throw new Error(err);
    }
    else {
        route(app, db);
        
        app.listen("8080", function() {
            console.log("Listening on port 8080");
        })
    }
})

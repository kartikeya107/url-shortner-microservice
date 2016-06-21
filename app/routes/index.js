"use strict";

module.exports = function (app, db) {
    
    app.route("/new/http://:longUrl").get(function(req, res) {
        var longUrl = req.params.longUrl;
        console.log(longUrl);
        if(longUrl.indexOf(".")==-1) {
             res.send(JSON.stringify({"error": "not a valid url"}));
        }
        else {
        
        var urlCollection = db.collection("shorturls");
        urlCollection.count({}, function(err, count){
            if(err) {
                throw new Error(err);
            }
            else {
                count++;
                urlCollection.insert({"long": longUrl, "short": count});
                res.send(JSON.stringify({"original_url": longUrl, "short_url": "http://" + req.headers.host + "/" + (count)}));
            }
        })
        }
    });
    
    
    app.route("/:shortUrl").get(function (req, res) {
        var shortUrlParam = req.params.shortUrl;
        console.log(shortUrlParam);
        var urlCollection = db.collection("shorturls");
        
        urlCollection.find({"short" : parseInt(shortUrlParam)}).toArray(function(err, doc) {
            if(err) {
                throw new Error(err);
            }
            else {
            //console.log(doc);
            if(doc.length==0) {
                res.send(JSON.stringify({"error": "Url not found in our database"}));
            }
            else {
                res.redirect("http://" + doc[0].long);
            }
            }
        });
        
    });
    
    app.route("/new/:longUrl").get(function(req, res) {
        res.send(JSON.stringify({"error": "not a valid url"}));
    });
}
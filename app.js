const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs')

const app = express();

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "/");

app.use(express.static(publicPath));
app.use(bodyParser());
app.set("view engine", "ejs");


app.get("/", (req, res, next ) => {
    res.render("index.html");

});

app.post("/", (req, responce, next ) => {
    console.log(req.body);
    request({
        url:`http://www.mapquestapi.com/geocoding/v1/address?key=cRxoUwcGCmTPSTNYeq0jtVidw9sFQ8wU&location=${req.body.city}`,
        json: true
    }, (err, res, body) => {
        var city = req.body.city;
     
        if(err) {
            responce.render('index', {city: "Unable to connect to server"})
        } else if ( body.info.statuscode == 400){
            responce.render('index', {city: "not a valid location"})
        } else if (status != 400) {
            var lat =  body.results[0].locations[0].latLng.lat;
            var lng = body.results[0].locations[0].latLng.lng;
            responce.render('index', {city: city})
        }

        console.log(city)
    });
});




app.listen(port, () => {
    console.log("server is running on port 3000");
});

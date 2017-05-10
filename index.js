const express           = require('express'),
      url               = require('url'),
      app               = express(),
      bodyParser        = require('body-parser'),
      RealityManager    = require('./VodRealityManager.js'),
      path              = require('path'),   
      port              = process.env.port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.all('*', (req,res,next) => {
    console.log("logged in");
    req.next();
});


app.get('/', (req,res) => {
    console.log(`Get show api ${path.join(__dirname + '/index.html')}`);

    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/getAllRealityShows', (req,res) => {

    console.log(`Get all Reality shows`);

    res.json(RealityManager.getAllRealityShows());
});

app.post('/getRealityShowById', (req,res) => {
    var showId = req.body.id;

    console.log(`Get Reality show with id: ${showId}`);

    res.json(RealityManager.getRealityShowById(showId));
});

app.get('/getRealityShowByJannerAndRating', (req,res) => {
    var urlPart = url.parse(req.url, true);
    var query   = urlPart.query;

    var janner = query.janner;
    var minRating = query.minRating;
    var maxRating = query.maxRating;

    console.log(
        `Searching for reality shows from rating: ${minRating}
        to: ${maxRating} and Janner is ${janner}`
        );

    var result = RealityManager.getRealityShowByJannerAndRating(
            minRating, maxRating, janner
        );

    res.json(result);
});

app.all('*', (req,res) => {
    res.status(404).json({
        Error: 'http verd is wrong, pls check the route and try again'
    });

});

app.listen(port);

console.log('listening');
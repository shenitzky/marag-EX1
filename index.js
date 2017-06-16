const express           = require('express'),
      url               = require('url'),
      app               = express(),
      bodyParser        = require('body-parser'),
      RealityManager    = require('./VodRealityManager.js'),
      path              = require('path'),
      consts            = require('./consts'),   
      port              = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use(
  (req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
      "Access-Control-Allow-Methods",
      "GET, POST"
  );
    res.header(
      "Access-Control-Allow-Credentials", true
  );
  res.set("Content-Type", "application/json");
  next();
});

app.all('*', (req,res,next) => {
    console.log("logged in");
    req.next();
});


app.get('/', (req,res) => {
    console.log(`Get show api ${path.join(__dirname + '/index.html')}`);

    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/getAllRealityShows', (req,res) => {

    console.log(`Get all Reality shows res-${res}`);

    return RealityManager.getAllRealityShows(req,res);
});

app.post('/getRealityShowById', (req,res) => {
    var showId = req.body.id;

    console.log(`Get Reality show with id: ${showId} res-${res}`);

    return RealityManager.getRealityShowById(req,res,showId);
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

    return RealityManager.getRealityShowByJannerAndRating(
            req,res, minRating, maxRating, janner
        );
});

app.all('*', (req,res) => {
    res.status(404).json({
        Error: 'http verd is wrong, pls check the route and try again'
    });

});

app.listen(port);

console.log('listening');
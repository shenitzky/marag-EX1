const mongoose  =   require('mongoose'),
      consts    =   require('./consts'),
      Janner    =   require('./janner');

mongoose.Promise = global.Promise;

mongoose.connect(consts.MLAB_KEY);

const conn = mongoose.connection;//get default connection

conn.on('error',(err) => {
        console.log(`connection error: ${err}`);
        return genarateErrorJson("Connction with Data Base failed");
});

exports.getAllRealityShows = (req,res) => {    
    conn.collection('janners').find({},{_id: 0}).toArray(function(err, items) {
             console.log(items);
             res.send(items);
         });
}
exports.getRealityShowById = (req,res,showId) => {
    conn.collection('janners').find({},{_id: 0}).toArray(function(err, items) {
             for(var index in items){
                console.log(items[index]);
                for(var showIndex in items[index].shows){
                    if(items[index].shows[showIndex].id == showId){
                        return res.send(items[index].shows[showIndex]);
                    }
                }
             }
             return res.json(genarateErrorJson(`No show with id ${showId} was found`));
         });
    }

exports.getRealityShowByJannerAndRating = (req,res, minRating, maxRating, janner) => {
    minRating = parseInt(minRating);
    maxRating = parseInt(maxRating);
    if(minRating > 100 || minRating < 0 || maxRating > 100 || maxRating < 0 || maxRating < minRating){
        return res.json(genarateErrorJson("Values are not valid"));
    }

    if(janner != "doco" && janner != "survive" && janner != "sing" && janner != "dance"){
        return res.json(genarateErrorJson(`There is no janner as ${janner}`));
    }
    conn.collection('janners').find({janner: janner},{_id: 0}).toArray(function(err, items) {
            var result = [];
            for(var showIndex in items[0].shows){
                if(items[0].shows[showIndex].rating > minRating && items[0].shows[showIndex].rating < maxRating){
                    console.log(items[0].shows[showIndex].rating);
                    result.push(items[0].shows[showIndex]);
                }
            }
            return res.send(result);
         });
}

const genarateErrorJson = (msg) => {
    var errorJson = {};
    errorJson['Error'] = msg;
    return errorJson;
}
const db        =   require('./data/data.js').realityShows,
      allShows  =   db.shows,
      janners   =   db.janners;


exports.getAllRealityShows = () => {
    var resultJson = [];
    for(var index in janners){
        var jannerObj = janners[index];

        var jannerJson = {};
        jannerJson.janner = jannerObj.janner;
        jannerJson.shows = [];

        for(var jannerShowIndex in jannerObj.shows){
            for(var showIndex in allShows){
                 if(allShows[showIndex].id == jannerObj.shows[jannerShowIndex]){
                     jannerJson.shows.push(allShows[showIndex]);
                 }
            }
        }
        resultJson.push(jannerJson);
    }
    console.log(resultJson);
    return resultJson;
}

exports.getRealityShowById = (showId) => {
        return getShowById(showId)
    }

exports.getRealityShowByJannerAndRating = (minRating, maxRating, janner) => {
    minRating = parseInt(minRating);
    maxRating = parseInt(maxRating);
    if(minRating > 100 || minRating < 0 || maxRating > 100 || maxRating < 0 || maxRating < minRating){
        return genarateErrorJson("Values are not valid");
    }

    if(janner != "doco" && janner != "survive" && janner != "sing" && janner != "dance"){
        return genarateErrorJson(`There is no janner as ${janner}`);
    }

    for(var index in janners){
        var jannerObj = janners[index];

        var jannerJson = {};
        jannerJson.shows = [];

        if(jannerObj.janner == janner){
            jannerJson.janner = janner;
            for(var jannerShowIndex in jannerObj.shows){
                var show = getShowById(jannerObj.shows[jannerShowIndex]);

                if(show.rating > minRating && show.rating < maxRating){
                    jannerJson.shows.push(show);
                }
            }
            return jannerJson;
        }
    }
    return genarateErrorJson("No shows found");
}

const genarateErrorJson = (msg) => {
    var errorJson = {};
    errorJson['Error'] = msg;
    return errorJson;
}

const getShowById = (id) => {
    for(var index in allShows){
        if(allShows[index].id == id){
            return allShows[index];
        }
    }
    return genarateErrorJson(`No show with id ${id} was found`);
}
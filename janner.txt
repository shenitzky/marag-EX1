var mongoose = require('mongoose'),
    show = require('./show.js'),
    schema = mongoose.Schema,
    jannerSchema = new schema({
        janner: {type:String, required:true, unique:true},
        id: {type:Number, index:1, required:true, unique:true},
        shows: [show]
    }, {collection: 'janners'});


var Janner = mongoose.model('Janner', jannerSchema); 

module.exports = Janner;
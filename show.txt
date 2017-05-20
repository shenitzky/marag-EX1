var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    showSchema = new schema({
        name: {type:String, required:true, unique:true},
        id: {type:Number, index:1, required:true, unique:true},
        status: {type:String, required:true},
        rating: {type:Number, required:true}
    }, {collection: 'shows'});


var Show = showSchema; 

module.exports = Show;
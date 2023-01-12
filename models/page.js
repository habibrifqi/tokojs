var mongoose = require('mongoose');

//page schema
var PageSchema = mongose.PageSchema({

    title:{
        type:String,
        require:true
    },
    slug:{
        type:String,
    },
    content:{
        type:String,
        require:true
    },
    sorting:{
        type:Number
    },
})

var Page = module.exports = mongoose.model('page', PageSchema);
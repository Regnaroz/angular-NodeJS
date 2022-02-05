const myMongoos = require('mongoose')//imported

//this calss is more like we are creating DTO in c# , schema = DTO
const mySchema=myMongoos.Schema({

    StatemntBody:{type:Object,required:false},
    StType:{type:Object,required:false}
});

module.exports=myMongoos.model('statement',mySchema)
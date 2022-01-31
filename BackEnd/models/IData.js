const myMongoos= require('mongoose')//imported

//this calss is more like we are creating DTO in c# 
const mySchema=myMongoos.Schema({

    name:{type:String,required:false},
    phone:{type:Number,required:false}
});

module.exports=myMongoos.model('IData',mySchema)
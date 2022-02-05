const express = require("express");
const mybody = require("body-parser"); //npm
const cors = require("cors"); //npm
const app = express();
const mongoos = require("mongoose"); //npm
const IData = require("./models/IData"); //created folder called models and made this interface
const Statemnt = require("./models/statement");
const { json } = require("express");

//moongo local url mongodb://127.0.0.1:27017/DatabaseName
const url = "mongodb://127.0.0.1:27017/myDB";
mongoos.connect(url, { useNewUrlParser: true });
const db = mongoos.connection;
db.once("open", (_) => {
  console.log("Database connected:", url);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

//very Important to set cors like this
const mycors = { origin: "*", Credential: true, optionSucessStatus: 200 };
app.use(cors(mycors));
app.use(mybody.json());

app.use("", (req, res, next) => {
  next();
});

//get Method
app.get("/api/getData", (req, res, next) => {
  //calling the interface *dto* from the models file , since it has the mongoose import it will work as mongood object
 
    Statemnt.find().then(document=>{
   
    res.status(200).json(document)
  })
});

app.post('/LRS/getQuizzReview',(req,res)=>{
  stdId = req.body.stdId
  scormId = req.body.ScormId
  
    Statemnt.find().where('StType').equals('Question').where('StatemntBody.actor.mbox').equals(scormId).where('StatemntBody.actor.name').equals(stdId).then(stm=>{
  
    res.status(200).json({
    result:true,
    data:stm})
    })
 
 })
app.put('/LRS/xAPI/activities/state',(req,res,next)=>{

  res.status(201).json({
    result: true,
    decribtion: "Done!",
  });

})
app.post('/LRS/getResultStatmentByScorm',(req,res)=>{
 
 Statemnt.find().where('StatemntBody.actor.mbox').equals(req.body.scormId).where('StType').equals('Result').then(stm=>{
   console.log(stm.length);
   res.status(200).json({
     result:true,
     data:stm
   })
 })

})
app.post('/LRS/getStatmentsByVerb',(req,res)=>{
 
  verb = req.body.Verb
  fullVerb='http://adlnet.gov/expapi/verbs/'+verb
  Statemnt.find().where('StatemntBody.verb.id').equals(fullVerb).then(stm=>{
    res.status(200).json({
      result:true,
      data:stm
    })
  })
})
app.post('/LRS/getStudentByName',(req,res,next)=>{
const name = req.body.Name
 Statemnt.find().where('StatemntBody.actor.name').equals(name).then(stm=>{
   res.status(200).json({
     result:true,
     data:stm
   })
 })

})


app.get('/LRS/getQuery',(req,res,next)=>{
  db.collection('books').find().toArray(function(err,result){
    if (err) throw err;
  
    db.close();
  })
})
app.post('/LRS/xAPI/statements',(req,res,next)=>{
  try{

  

    for(let i = 0 ; i <req.body.length ;i++){
      isQuestion='http://adlnet.gov/expapi/verbs/answered'
      req.body[i].type='Normal'
      req.body[i].actor.mbox=2
      req.body[i].actor.name='Ali Ahmad'
     
       if(req.body[i].result){
        req.body[i].type='Result'
       }
       if(req.body[i].verb.id == isQuestion){
        req.body[i].type = 'Question'
       }
       console.log( req.body[i]);
        const myStm = new Statemnt({
          StatemntBody:req.body[i],
          StType:req.body[i].type
        })


        myStm.save();

    }


  res.status(200).json({result:true})
  }catch{
   res.status(200).json({result:false})
  }
})
//post Method
app.post("/api/mypost", (req, res, next) => {

  try {
    //getting the data from the request Body
    const newData = new IData({
      name: req.body.name,
      phone: req.body.phone,
    });
    
    //newData is object of the interface Idata that has moongose imported , so it has the functions,proerties we need
    //newData.save() it will save the data in the mongoDB
    newData.save() // save() you need to write it , it will not pop out

    //return a message that data has been saved Succefully
    res.status(201).json({
      result: true,
      decribtion: "Done!",
    });

    //if any error happened
  } catch {
    res.json({
      result: false,
      decribtion: "Internal Error",
    });
  }
});


//publish for api
module.exports = app;

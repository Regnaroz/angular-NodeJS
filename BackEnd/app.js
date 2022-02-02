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

  Statemnt.find({}).where('StatemntBody.verb.id').equals('http://adlnet.gov/expapi/verbs/attempted') //find() you need to write it , it will not pop out
    .then((data) => {
      res.status(200).json({
        result: true,
        data: data,
      });
    })
    //sending the error back
    .catch((err) => {
      res.status(200).json({
        result: false,
        data: err,
      });
    });
});
app.put('/LRS/xAPI/activities/state',(req,res,next)=>{

  res.status(201).json({
    result: true,
    decribtion: "Done!",
  });

})

app.post('/LRS/xAPI/statements',(req,res,next)=>{
  try{

    console.log(req.body.length);

    for(let i = 0 ; i <req.body.length ;i++){

        const myStm = new Statemnt({
          StatemntBody:req.body[i]
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

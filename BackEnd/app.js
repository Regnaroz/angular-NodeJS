const express = require("express");
const mybody = require("body-parser");
const cors = require("cors");
const app = express();
const mongoos = require('mongoose')
const IData = require('./models/IData')

//moongo local url mongodb://127.0.0.1:27017/DatabaseName
const url = 'mongodb://127.0.0.1:27017/myDB'
mongoos.connect(url,{ useNewUrlParser: true })
const db = mongoos.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})


  
//very Important 
const mycors = { origin: "*", Credential: true ,optionSucessStatus:200};
app.use(cors(mycors))


app.use(mybody.json());
app.use("", (req, res, next) => {
  next();
});

app.get("/api/getData", (req, res, next) => {
 
 
  list:any= IData.find().then(document=>{
    res.status(200).json({
        result: true,
        data: document,
      });
   }).catch(err=>{
       console.log(err);
   })

});

app.post("/api/mypost", (req, res, next) => {
    
try{

  const post = new IData({
      name:req.body.name,
      phone:req.body.phone
  });
  post.save()

  console.log(post);
  res.status(201).json({
    result: true,
    decribtion: "Done!",
  });

}catch{
  res.json({
      result:false,
      decribtion:'error'
  })
}
});
module.exports = app;

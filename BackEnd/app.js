const express = require("express");
const mybody = require("body-parser");
const cors = require("cors");
const app = express();
//very Important 
let list = [
    { name: "khalid", phone: 123 },
    { name: "Ali", phone: 321 },
    { name: "MOhammad", phone: 1234 },
  ];
  
  

const mycors = { origin: "*", Credential: true ,optionSucessStatus:200};
app.use(cors(mycors))
app.use(mybody.json());
app.use("/api/posts", (req, res, next) => {
  next();
});

app.get("/api/getData", (req, res, next) => {
 
 

  res.status(200).json({
    result: true,
    data: list,
  });
});

app.post("/api/mypost", (req, res, next) => {
    
try{

  const post = req.body;
 list.append(post)
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

const fs = require('fs')
const express = require('express')
const responseTime = require("response-time");

const app = express()

app.use(express.json());

app.use(responseTime((req,res,time)=>{
  const data = JSON.stringify({ url:req.url,method:req.method,duration:time });
fs.writeFile("./log.txt",data,{flag: "a"},(err)=>{
    if (err) {
     console.log("error writing to log file");
    } else {
     console.log("log has been written");
    }
  })
}));


app.get('/file',(req,res)=>{
  fs.readFile("./content.txt","utf8",(err,data)=>{
    if (err) {
      res.statusCode = 500;
      res.write("Internal Error");
      res.end();
      console.log(err);
    } else {
      res.statusCode = 200;
      res.write(data, "utf8", () => {
        console.log("response sent");
      });
      res.end();
    }
  })  
})

app.post('/file',(req,res)=>{
    const data = JSON.stringify(req.body);
    console.log(data);

  fs.writeFile('./content.txt',data,{"flag": "a"},(err)=>{
    if (err) {
      res.statusCode = 500;
      res.write("Internal Error");
      res.end();
      console.log(err);
    } else {
      res.statusCode = 200;
      res.write(data, "utf8", () => {
        console.log("response sent");
      });
      res.end();
    }
  })
})

function logger(req,res, next){
  console.log('middleware');
  next()
}

app.listen (5000)
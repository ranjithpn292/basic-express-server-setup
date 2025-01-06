const http = require('http')
const fs =  require("fs")

const myServer = http.createServer((req,res)=>{
    fs.appendFile("log.txt", `${new Date()} : ${req.url} new request recieved\n`,(err,data)=>{
        switch(req.url){
          case "/":
            res.end("Home")
            break
          case "/about":
            res.end(" Im ranjith")
            break;
         default:
            res.end("404")
        }
    })
});

myServer.listen(8000,()=>{
    console.log("server is listening on port:" , )
})

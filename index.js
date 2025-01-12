const express = require("express");
const users = require("./MOCK_DATA.json")
const fs = require('fs')
const app = express()
const PORT = 8080

// Middleware plugin
app.use(express.urlencoded({ extended : false})); 

app.use((req,res,next) => {
  console.log(" hello from middleware 1");
  req.hostname = "www.youtube.com";
  req.path = "";
  console.log("host and paths",req.path,req.hostname)
  fs.appendFile("logfile.txt", `${Date.now()} , ${req.method} : ${ req.path} ${req.hostname} \n`, (err, data)=> {
  next();
  })
})

//ROUTES
// for websites just return JSON
app.get("/users",(req,res)=>{
  const html = `
  <ul>
    ${users.map((user)=> (`<li>${user.first_name}</li>`)).join("")}
  </ul>
  `
  return res.send(html);
})



// for mobiles append /api/ return JSON
app.get("/api/users",(req,res)=>{
  return res.json(users);
})

app.get("/api/users/:id",(req,res)=>{
  const id = req.params.id;
  const user = users.find((user)=> user.id == id)
  return res.json(user);
})

app.post("/api/users",(req,res)=>{
  const body = req.body;
  users.push({...body, id: users.length+1})
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
    return res.status(201).json({status: "USER ADDED"});
  })
})




app.listen(PORT, ()=>{
  console.log(`server is listening on PORT: ${PORT}`)
})
const express = require("express");
const users = require("./MOCK_DATA.json")
const bodyParser = require("body-parser")
const fs = require('fs')
const app = express()
const PORT = 8080

// Middleware plugin
app.use(express.urlencoded({ extended : false}));
app.use(bodyParser.json()) 

app.use((req,res,next) => {
  fs.appendFile("logfile.txt", `${Date.now()} , ${req.method} : ${ req.path} ${req.hostname} \n`, (err, data)=> {
  next();
  })
})

// import mongodb connection
const mongoose  = require("mongoose")

// connect database
mongoose.connect("mongodb://localhost:27017/myApp")
.then(()=> console.log(" Mongo DB connected"))
.catch((err) => console.log("MOngo Err", err))

// schema - for tabble
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required : true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required : true,
    unique: true,
  },
  gender: {
    type: String,
  },
 jobTitle: {
    type: String,
  }
})

// create Model
const User = mongoose.model("user", userSchema);

//ROUTES
// for websites just return JSON
app.get("/users",async (req,res)=>{
  const allDbUsers = await User.find({});
  const html = `
  <ul>
    ${allDbUsers.map((user)=> (`<li>${user.firstName} - ${user.email}</li> `)).join("")}
  </ul>
  `
  return res.send(html);
})



// for mobiles append /api/ return JSON
app.get("/api/users", async (req,res)=>{
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
})

app.get("/api/users/:id",async (req,res)=>{
  const user = await User.findById(req.params.id);
  return res.json(user);
})

app.post("/api/users",async (req,res)=>{
  const body = req.body;
  console.log("re body", body);
  // users.push({...body, id: users.length+1})
  // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
  //   return res.status(201).json({status: "USER ADDED"});
  // })

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    gender: body.gender,
    email: body.email,
    jobTitle: body.job_title,
  })

  console.log("db user created", result)

  return res.status(201).json({msg: "user created"});
})


// for updating the user 
app.patch("/api/users/:id", async (req,res)=>{
  const user = await User.findByIdAndUpdate(req.params.id, {lastName: "Updated"});
  return res.json({ msg : "User Updated"});
})

// for updating the user 
app.delete("/api/users/:id", async (req,res)=>{
  const user = await User.findByIdAndDelete(req.params.id);
  return res.json({ msg : "User Deleted"});
})



app.listen(PORT, ()=>{
  console.log(`server is listening on PORT: ${PORT}`)
})
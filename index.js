const express = require("express");
const users = require("./MOCK_DATA.json")
const app = express()
const PORT = 8080

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




app.listen(PORT, ()=>{
  console.log(`server is listening on PORT: ${PORT}`)
})
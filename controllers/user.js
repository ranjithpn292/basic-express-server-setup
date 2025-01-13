const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handleGetAllUsersAsHTML(req, res) {
  const allDbUsers = await User.find({});
  const html = `
      <ul>
        ${allDbUsers
          .map((user) => `<li>${user.firstName} - ${user.email}</li> `)
          .join("")}
      </ul>
      `;
  return res.send(html);
}

async function createUser(req, res) {
  const body = req.body;
  console.log("re body", body);
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    gender: body.gender,
    email: body.email,
    jobTitle: body.job_title,
  });
  return res.status(201).json({ msg: "user created" });
}

async function getUserById(req, res) {
  // getting user by Id
  const user = await User.findById(req.params.id);
  return res.json(user);
}

async function patchUserById(req, res) {
  // for updating the user
  const user = await User.findByIdAndUpdate(req.params.id, {
    lastName: "Updated",
  });
  return res.json({ msg: "User Updated" });
}

async function deleteUserById(req, res) {
  // for updating the user
  const user = await User.findByIdAndDelete(req.params.id);
  return res.json({ msg: "User Deleted" });
}

module.exports = {
  handleGetAllUsers,
  handleGetAllUsersAsHTML,
  createUser,
  getUserById,
  patchUserById,
  deleteUserById,
};

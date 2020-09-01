const express = require("express");
const { response } = require("express");

function createUsersRouter(database) {
  const router = express.Router();

  const usersCollection = database.collection("users");

  router.post("/login", async (request, response) => {
    // const { email, password } = request.body;
    // console.log(email, password);
    // response.send("Logged in");
    try {
const { email, password } = request.body;
const user = await usersCollection.findOne({
    email, 
    password,
    
});
if (!user) {
    response.status(401).send("Wrong email or password");
    return;
}

console.log(user);
response.send("Logged in");
    } catch (error) {
        console.error(error);
        response.status(500).send(error.message);
    }
  });
  return router;
}

module.exports = createUsersRouter;

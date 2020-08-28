require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");
const { writePassword, readPassword } = require("./lib/passwords");
const { encrypyt } = require("./libcrypto");
const bodyParser = require("body-parser");
const { decrypt } = require("./lib/crypto");

const client = new MongoClient (process.env.MONGO_URI);

const app = express();
app.use(bodyParser.json());

const port = 3000;

async function main() {
    await client.connect();
    const database = client.db(process.env.MONGO_DB_NAME);
    const masterPassword = process.env.MASTER_PASSWORD;


app.get("/api/passwords/:name", async (request, response) => {
  const { name } = request.params; 
  const password = await readPassword(name, database);
  const decryptedPassword = decrypt(password, masterPassword);
  response.send(decryptedPassword);
});

app.post("/api/passwords", async (request, response) => {
  console.log("POST on /api/passwords");
  const { name, value } = request.body;
  const encrypytedPassword = encrypyt(value, masterPassword);
  await writePassword(name, encrypytedPassword, database);
  response.status(201).send("Password created");
});

app.listen(port, () => {
  console.log(`Well, hellöchen! App is listening on http://localhost:${port}`);
});

}
main ();
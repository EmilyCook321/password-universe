require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");
const { writePassword, readPassword } = require("./lib/passwords");
const { decrypt, encrypyt } = require("./lib/crypto");
const bodyParser = require("body-parser");
const { response } = require("express");

const client = new MongoClient(process.env.MONGO_URI, {
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());

const port = 3000;

// app.use((request, response, next) => {
//  console.log(`Request ${request.method} on ${request.url}`);
//  next();
// });

async function main() {
  await client.connect();
  const database = client.db(process.env.MONGO_DB_NAME);
  const masterPassword = process.env.MASTER_PASSWORD;

  app.use(bodyParse.json());

  app.use((request, response, next) => {
    console.log(`Request ${request.method} on ${request.url}`);
    next();
  });


  app.get("/api/passwords/:name", async (request, response) => {
    try {
      const { name } = request.params;
      const encryptedPassword = await readPassword(name, database);
      if (!encryptedPassword) {
        response.status(404).send(`Password ${name} not found`);
        return;
      }
      const password = decrypt(encryptedPassword, masterPassword);

      response.send(password);
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  });

  app.post("/api/passwords", async (request, response) => {
    try {
      const { name, value } = request.body;
      const encryptedPassword = encrypt(value, masterPassword);
      await writePassword(name, encryptedPassword, database);
      response.status(201).send(`Password ${name} created`);
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  });

  app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
  });

  app.listen(port, () => {
    console.log(
      `Well, hey there! App is listening on http://localhost:${port}`
    );
  });
}
main();

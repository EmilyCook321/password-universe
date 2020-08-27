const { express } = require("express");
const { response } = require("express");

const express = require("express");

const app = express();

const port = 3000;

app.get("/", (request, response) => {
    console.log("Request /");
    response.send(equest succeeded);
});

app.listen(port, () => {
    console.log(`Ready! App is listening on http://localhost:${port}`);
});
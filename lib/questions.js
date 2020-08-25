const inquirer = require("inquiere");

const CHOICE_GET = "Read a password";
const CHOICE_SET = "Set a password";

const questionsStart = [
  {
    type: "password",
    name: "masterPassword",
    message: "What's your master password?",
  },
  {
    type: "list",
    name: "action",
    message: "What do you want to do?",
    choices: [CHOICE_GET, CHOICE_SET],
  },
];

const questionsGet = [
  {
    type: "input",
    name: "key",
    message: "Which password do you need?",
  },
];

const questionSet = [
  {
    type: "input",
    name: "key",
    message: "Which password would you like to set?",
  },
  {
    type: "password",
    name: "password",
    message: "Please enter your password",
  },
];

function askStartQuestions() {
  return inquirer.prompt(questionsStart);
}

function askSetPasswordQuestions() {
  return inquirer.prompt(questionSet);
}

exports.askStartQuestions = askStartQuestions;
exports.askGetPasswordQuestions = askGetPasswordQuestions;
exports.askSetPasswordQuestions = askSetPasswordQuestions;
exports.CHOICE_GET = CHOICE_GET;
exports.CHOICE_SET = CHOICE_SET;
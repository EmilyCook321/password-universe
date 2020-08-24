// // function sayHi() {
// //   console.log("Hello Fwends");
// // }

const {
  fetchAsyncQuestionPropertyQuestionProperty,
} = require("inquirer/lib/utils/utils");

// // setInterval(() => {
// //   sayHi();
// // }, 2000);

// const readlineSync = require('readline');

// const interface= readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// interface.question("Please enter your password", password => {
//     console.log(`Your password is ${password}`);
//     if (password !== 'abc') {
//         console.log('Wrong password');
//         interface.close();
//         return;
//     }

//     interface.question("What's your name?", name => {
//         console.log(`Your name is ${name}`);
//         interface.close();
//     })
// })

const inquirer = require("inquirer");

const questions = [
  {
    type: "password",
    name: "password",
    message: "What's your password?",
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log(`Your password is ${answers.password}!`);
  console.log(`Your name is ${answers.name}!`);
});

const {
  askStartQuestions,
  askGetPasswordQuestions,
  askSetPasswordQuestions,
  CHOICE_GET,
  CHOICE_SET,
} = require("./lib/questions");
const { readPassword, writePassword } = require("./lib/passwords");

async function main() {
  const { masterPassword, action } = await askStartQuestions();

  if (masterPassword === "123") {
    console.log("Master Password is correct");
    if (action === CHOICE_GET) {
      console.log("Now Get a Password");
      const { key } = await askGetPasswordQuestions();
      try {
        const password = await readPassword(key);
        console.log(`Your ${key} password is ${password}`);
      } catch (error) {
        console.error("Something went wrong");
      }
    } else if (action === CHOICE_SET) {
      console.log("Now Set a password");
      const { key, password } = await askSetPasswordQuestions();
      await writePassword(key, password);
      console.log(`New password set`);
    }
  } else {
    console.log("Master Password is incorrect!");
  }
}

main();

// const inquirer = require("inquirer");
// const questions = [
//   {
//     type: "password",
//     name: "password",
//     message: "What's your master password?",
//   },
//   {
//     type: "input",
//     name: "key",
//     message: "Which password do you need?",
//   },
// ];

// inquirer.prompt(questions).then((answers) => {
//   console.log(`Your password is the password of ${answers.password}!`);

//   if (answers.password === "123") {
//     console.log("Password is correct!");
//   } else {
//     console.log("Password is incorrect");
//   }
// });

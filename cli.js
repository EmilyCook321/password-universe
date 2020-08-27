const {
  askStartQuestions,
  askGetPasswordQuestions,
  askSetPasswordQuestions,
  CHOICE_GET,
  CHOICE_SET,
  askForNeWMasterPassword,
} = require("./lib/questions");
const {
  readPassword,
  writePassword,
  readMasterPassword,
  writeMasterPassword,
} = require("./lib/passwords");
const { encrypt, decrypt, createHash, verifyHash } = require("./lib/crypto");
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://emilycook321:<password>@cluster0.1nxms.mongodb.net?retryWrites=true&w=majority";

const client = new MongoClient(process.env.MONGO_URL);

async function main() {
  try {
    await client.connect();
    const database = client.db(process.env.password_universe);

    const originalMasterPassword = await readMasterPassword();
    if (!originalMasterPassword) {
      const { newMasterPassword } = await askForNewMasterPassword();
      const hashedMasterPassword = createHash(newMasterPassword);
      await writeMasterPassword(hashedMasterPassword);
      console.log("Master Password set!");
      return;
    }

    const { masterPassword, action } = await askStartQuestions();
    if (!verifyHash(masterPassword, originalMasterPassword)) {
      console.log("Master Password is incorrect!");
      return;
    }

    console.log("Master Password is correct");
    if (action === CHOICE_GET) {
      console.log("Now Get a password");
      const { key } = await askGetPasswordQuestions();
      try {
        const encryptedPassword = await readPassword(key, database);
        const password = decrypt(encryptedPassword, masterPassword);

        console.log(`Your ${key} password is ${password}`);
      } catch (error) {
        console.error("Oh no! Something went wrong!");
      }
    } else if (action === CHOICE_SET) {
      console.log("Now Set a password");
      try {
        const { key, password } = await askSetPasswordQuestions();
        const encryptedPassword = encrypt(password, masterPassword);
        await writePassword(key, encryptedPassword, database);
        console.log(`New Password set`);
      } catch (error) {
        console.error("Something went wrong");
      }
    }
  } finally {
    await client.close();
  }
}

main();

//   if (masterPassword === "123") {
//     console.log("Master Password is correct");
//     if (action === CHOICE_GET) {
//       console.log("Now Get a Password");
//       const { key } = await askGetPasswordQuestions();
//       try {
//         const password = await readPassword(key);
//         console.log(`Your ${key} password is ${password}`);
//       } catch (error) {
//         console.error("Something went wrong");
//       }
//     } else if (action === CHOICE_SET) {
//       console.log("Now Set a password");
//       try {
//       const { key, password } = await askSetPasswordQuestions();
//       console.log(`New Password: ${key} = ${password}`);
//     } catch (error) {
//      console.error("Something went wrong");
//     }
//   } else {
//     console.log("Master Password is incorrect!");
//   }
// }
// }

// main();

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

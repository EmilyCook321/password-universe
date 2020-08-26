const {
  askStartQuestions,
  askGetPasswordQuestions,
  askSetPasswordQuestions,
  CHOICE_GET,
  CHOICE_SET,
  askForNewMasterPassword,
} = require("./lib/questions");
const {
  readPassword,
  writePassword,
  readMasterPassword,
  writeMasterPasssword,
} = require("./lib/passwords");
const { encrypt, decrypt } = require("./lib/crypto");
const { Console } = require("console");

async function main() {
  const originalMasterPassowrd = await readMasterPassword();
  if (!originalMasterPassword) {
    const { newMasterPassword } = await askForNewMasterPassword();
    await writeMasterPasssword(newMasterPassword);
    console.log("Master Password set!");
    return;
  }
  const { masterPassword, action } = await askStartQuestions();

  if (masterPassword !== originalMasterPassowrd) {
    console.log("Master Password is incorrect!");
    return;
  }

  console.log("Master Password is correct!");
  if (action === CHOICE_GET) {
    console.log("Now Get a password");
    const { key } = await askGetPasswordQuestions();
    try {
      const encryptedPassword = await readPassword(key);
      const password = decrypt(encryptedPassword, masterPassword);

      console.log(`Your ${key} password is ${password}`);
    } catch (error) {
      console.error("Something went wrong");
    }
  } else if (action === CHOICE_SET) {
    console.log("Now Set a password");
    try {
      const { key, passowrd } = await askSetPasswordQuestions();
      const encryptedPassword = encrypt(password, masterPassword);
      await writePassword(key, encryptedPassword);
      console.log(`New Password set`);
    } catch (error) {
      console.error("Something went wrong");
    }
  }
}
main();

import { EOL } from "os";
import readline from "readline";
import displayCurrentDirectory from "./functions/displayCurrentDirectory.js";
import list from "./functions/list.js";
import read from "./functions/read.js";

const args = process.argv;
const usernameArg = args.find((arg) => arg.startsWith("--username="));
let username = "Anonymous";

const welcomeColor = "\x1b[34m";
const promptColor = "\x1b[32m";
const unknownCommandColor = "\x1b[31m";
const resetColor = "\x1b[0m";

if (usernameArg) {
  username = usernameArg.split("=")[1];
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `Enter your command: ${resetColor}`,
});

async function handleCommand(command) {
  const [commandName, ...args] = command.trim().split(" ");
  try {
    switch (commandName) {
      case "ls": {
        await list();
        break;
      }

      case "cat": {
        await read(args[0]);
        break;
      }

      case "exit": {
        process.stdout.write(
          `Thank you for using File Manager, ${username}, goodbye!` + EOL + EOL
        );
        rl.close();
        break;
      }
      default: {
        process.stdout.write(
          EOL +
            `${unknownCommandColor}Unknown command: "${command}"` +
            EOL +
            EOL
        );
        break;
      }
    }
  } catch (error) {
    process.stdout.write(EOL + `${unknownCommandColor}${error}` + EOL);
  }
  displayCurrentDirectory(promptColor);
  rl.prompt();
}

process.stdout.write(
  EOL + `${welcomeColor}Welcome to the File Manager, ${username}!` + EOL
);
displayCurrentDirectory(promptColor);

rl.prompt();

rl.on("line", (input) => {
  handleCommand(input);
});

rl.on("close", () => {
  process.stdout.write(
    EOL +
      EOL +
      `${welcomeColor}Thank you for using File Manager, ${username}, goodbye!` +
      EOL +
      EOL
  );
  process.exit(0);
});

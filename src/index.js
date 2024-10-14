import { EOL } from "os";
import readline from "readline";
import displayCurrentDirectory from "./navigation/displayCurrentDirectory.js";
import toUpDirectory from "./navigation/toUpDirectory.js";
import copy from "./fs/copy.js";
import list from "./fs/list.js";
import read from "./fs/read.js";
import create from "./fs/create.js";
import rename from "./fs/rename.js";
import calculateHash from "./hash/calcHash.js";
import compress from "./zip/compress.js";
import decompress from "./zip/decompress.js";
import toCertainDirectory from "./navigation/toCertainDirectory.js";
import move from "./fs/move.js";
import remove from "./fs/delete.js";
import eol from "./system/eol.js";
import cpusInfo from "./system/cpusInfo.js";
import homeDirInfo from "./system/homeDirInfo.js";
import userNameInfo from "./system/IuserNameInfo.js";

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
      case "up": {
        toUpDirectory();
        break;
      }

      case "cd": {
        toCertainDirectory(args[0]);
        break;
      }

      case "ls": {
        await list();
        break;
      }

      case "cat": {
        await read(args[0]);
        break;
      }

      case "add": {
        await create(args[0]);
        break;
      }

      case "rn": {
        await rename(args[0], args[1]);
        break;
      }

      case "cp": {
        await copy(args[0], args[1]);
        break;
      }

      case "mv": {
        await move(args[0], args[1]);
        break;
      }

      case "rm": {
        await remove(args[0]);
        break;
      }

      case "os": {
        if (args[0] === "--EOL") eol();
        if (args[0] === "--cpus") cpusInfo();
        if (args[0] === "--homedir") homeDirInfo();
        if (args[0] === "--username") userNameInfo();
        else {
          process.stdout.write(
            EOL +
              `${unknownCommandColor}Unknown command: "${command}"` +
              EOL +
              EOL
          );
        }

        break;
      }

      case "hash": {
        await calculateHash(args[0]);
        break;
      }

      case "compress": {
        await compress(args[0], args[1]);
        break;
      }

      case "decompress": {
        await decompress(args[0], args[1]);
        break;
      }

      case ".exit": {
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
      `${welcomeColor}Thank you for using File Manager, ${username}, goodbye!` +
      EOL +
      EOL
  );
  process.exit(0);
});

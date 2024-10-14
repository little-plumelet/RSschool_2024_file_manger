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
// import eol from "./system/eol.js";
// import cpusInfo from "./system/cpusInfo.js";
// import homeDirInfo from "./system/homeDirInfo.js";
// import userNameInfo from "./system/userNameInfo.js";
// import architectureInfo from "./system/architectureInfo.js";
import welcomeUser from "./general/welcomeUser.js";
import goodbyeUser from "./general/goodbyeUser.js";
import { colors } from "./colors.js";
import osCommandsHandler from "./osCommandsHandler.js";

const args = process.argv;
const usernameArg = args.find((arg) => arg.startsWith("--username="));
let username = "Anonymous";

const { promptColor, resetColor, unknownCommandColor } = colors;

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
        osCommandsHandler(args, unknownCommandColor);
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

welcomeUser(username);
displayCurrentDirectory(promptColor);

rl.prompt();

rl.on("line", (input) => {
  handleCommand(input);
});

rl.on("close", () => {
  goodbyeUser(username);
  process.exit(0);
});

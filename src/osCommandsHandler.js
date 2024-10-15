import eol from "./system/eol.js";
import cpusInfo from "./system/cpusInfo.js";
import homeDirInfo from "./system/homeDirInfo.js";
import userNameInfo from "./system/userNameInfo.js";
import architectureInfo from "./system/architectureInfo.js";
import { EOL } from "os";

function osCommandsHandler(args, color) {
  switch (args[0]) {
    case "--EOL":
      eol();
      break;
    case "--cpus":
      cpusInfo();
      break;
    case "--homedir":
      homeDirInfo();
      break;
    case "--username":
      userNameInfo();
      break;
    case "--architecture":
      architectureInfo();
      break;
    default:
      process.stdout.write(
        EOL + `${color}Unknown command: "${command}"` + EOL + EOL
      );
  }
}

export default osCommandsHandler;

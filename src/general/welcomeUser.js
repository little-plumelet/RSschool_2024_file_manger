import { EOL } from "os";
import { colors } from "../colors.js";

const { welcomeColor, resetColor } = colors;

export function welcomeUser(username) {
  process.stdout.write(
    EOL +
      `${welcomeColor}Welcome to the File Manager, ${username}!${resetColor}` +
      EOL
  );
}

export default welcomeUser;

import { EOL } from "os";
import { colors } from "../colors.js";

const { welcomeColor: goodbyeColor, resetColor } = colors;

export function goodbyeUser(username) {
  process.stdout.write(
    EOL +
      `${goodbyeColor}Thank you for using File Manager, ${username}, goodbye!${resetColor}` +
      EOL +
      EOL
  );
}

export default goodbyeUser;

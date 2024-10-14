import { EOL } from "os";

const goodbyeColor = "\x1b[34m";
const resetColor = "\x1b[0m";

export function goodbyeUser(username) {
  process.stdout.write(
    EOL +
      `${goodbyeColor}Thank you for using File Manager, ${username}, goodbye!${resetColor}` +
      EOL +
      EOL
  );
}

export default goodbyeUser;

import { EOL } from "os";

const welcomeColor = "\x1b[34m";
const resetColor = "\x1b[0m";

export function welcomeUser(username) {
  process.stdout.write(
    EOL +
      `${welcomeColor}Welcome to the File Manager, ${username}!${resetColor}` +
      EOL
  );
}

export default welcomeUser;

import { EOL } from "os";

export default function displayCurrentDirectory(color) {
  const currentDirectory = process.cwd();
  process.stdout.write(
    `${color}You are currently in: ${currentDirectory}` + EOL
  );
}

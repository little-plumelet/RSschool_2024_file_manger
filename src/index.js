const args = process.argv;
const usernameArg = args.find((arg) => arg.startsWith("--username="));

let username = "Anonymous";
if (usernameArg) {
  username = usernameArg.split("=")[1];
}

console.log(`Welcome to the File Manager, ${username}!`);

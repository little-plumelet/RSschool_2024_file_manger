import path from "node:path";

function toUpDirectory() {
  const currentDir = process.cwd();

  const parentDir = path.resolve(currentDir, "..");
  if (currentDir === parentDir) {
    return;
  }

  try {
    process.chdir(parentDir);
  } catch (error) {
    throw new Error(`Failed to change directory: ${error.message}`);
  }
}

export default toUpDirectory;

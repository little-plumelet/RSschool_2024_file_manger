import path from "node:path";

function toCertainDirectory(directoryPath) {
  const resolvedPath = path.isAbsolute(directoryPath)
    ? directoryPath
    : path.resolve(process.cwd(), directoryPath);

  const currentDirPath = process.cwd();

  if (currentDirPath === resolvedPath) {
    return;
  }

  try {
    process.chdir(resolvedPath);
  } catch (error) {
    throw new Error(`Failed to change directory: ${error.message}`);
  }
}

export default toCertainDirectory;

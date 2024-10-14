import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function toCertainDirectory(directoryPath) {
  const resolvedPath = directoryPath.startsWith("./")
    ? path.resolve(__dirname, "../", directoryPath)
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

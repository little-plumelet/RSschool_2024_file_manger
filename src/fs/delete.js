import { unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { EOL } from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async (filePath) => {
  try {
    const resolvedPath = filePath.startsWith("./")
      ? path.resolve(__dirname, "../", filePath)
      : path.resolve(process.cwd(), filePath);
    await unlink(resolvedPath);
  } catch (err) {
    throw new Error(`FS operation failed - ${err.message}${EOL}`);
  }
};

export default remove;

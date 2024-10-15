import { unlink } from "node:fs/promises";
import path from "node:path";
import { EOL } from "os";

const remove = async (filePath) => {
  try {
    const resolvedPath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);

    await unlink(resolvedPath);
  } catch (err) {
    throw new Error(`FS operation failed - ${err.message + EOL}`);
  }
};

export default remove;

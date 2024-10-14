import { access, rename as renameFile, constants } from "node:fs/promises";
import { EOL } from "os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async (source, newName) => {
  try {
    const resolvedPath = source.startsWith("./")
      ? path.resolve(__dirname, "../", source)
      : path.resolve(process.cwd(), source);

    const newPath = `${resolvedPath
      .split("/")
      .slice(0, -1)
      .join("/")}/${newName}`;

    await access(resolvedPath, constants.F_OK);
    try {
      await access(newPath, constants.F_OK);
      throw new Error();
    } catch {
      await renameFile(resolvedPath, newPath);
    }
  } catch (err) {
    throw new Error(`FS operation failed - ${err.message + EOL}`);
  }
};

export default rename;

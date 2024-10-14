import { access, rename as renameFile, constants } from "node:fs/promises";
import { EOL } from "os";
import path from "node:path";

const rename = async (source, newName) => {
  try {
    const resolvedPath = path.isAbsolute(source)
      ? source
      : path.resolve(process.cwd(), source);

    const newPath = path.join(path.dirname(resolvedPath), newName);

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

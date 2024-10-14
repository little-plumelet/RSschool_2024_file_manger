import { writeFile } from "node:fs/promises";
import { EOL } from "os";
import path from "node:path";

const create = async (fileName) => {
  try {
    const filePath = path.join("src", fileName);
    await writeFile(filePath, "", { flag: "wx+" });
  } catch (err) {
    throw new Error(`FS operation failed - ${err.message + EOL}`);
  }
};

export default create;

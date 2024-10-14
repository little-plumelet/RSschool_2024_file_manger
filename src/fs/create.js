import { writeFile } from "node:fs/promises";
import { EOL } from "os";

const create = async (fileName) => {
  try {
    await writeFile(`src/${fileName}`, "", { flag: "wx+" });
  } catch (err) {
    throw new Error(`FS operation failed${EOL}${err.message}${EOL}`);
  }
};

export default create;

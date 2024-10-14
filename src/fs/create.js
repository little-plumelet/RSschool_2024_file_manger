import { writeFile } from "node:fs/promises";

const create = async (fileName) => {
  try {
    await writeFile(`src/${fileName}`, "", { flag: "wx+" });
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

export default create;

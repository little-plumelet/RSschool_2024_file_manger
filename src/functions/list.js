import { readdir } from "node:fs/promises";
import { statSync } from "node:fs";

const list = async () => {
  try {
    const currentDirectory = process.cwd();
    const files = await readdir(currentDirectory, { withFileTypes: true });
    console.log(files);
    const tableData = files
      .map((file) => {
        const isDirectory = statSync(
          `${file.parentPath}/${file.name}`
        ).isDirectory();
        return {
          Name: file.name,
          Type: isDirectory ? "Directory" : "File",
        };
      })
      .sort((a, b) => {
        if (a.Type === b.Type) {
          return a.Name.localeCompare(b.Name);
        }
        return a.Type === "Directory" ? -1 : 1;
      });
    console.table(tableData);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

export default list;

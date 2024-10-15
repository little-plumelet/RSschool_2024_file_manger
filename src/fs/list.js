import { readdir } from "node:fs/promises";
import { stat } from "node:fs/promises";
import { EOL } from "os";
import path from "node:path";

const list = async () => {
  try {
    const currentDirectory = process.cwd();
    const files = await readdir(currentDirectory, { withFileTypes: true });
    const tableData = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(currentDirectory, file.name);
        const fileStats = await stat(filePath);
        const isDirectory = fileStats.isDirectory();
        return {
          Name: file.name,
          Type: isDirectory ? "directory" : "file",
        };
      })
    );

    tableData.sort((a, b) => {
      if (a.Type === b.Type) {
        return a.Name.localeCompare(b.Name);
      }
      return a.Type === "directory" ? -1 : 1;
    });

    console.table(tableData);
  } catch (err) {
    throw new Error(`FS operation failed - ${err.message + EOL}`);
  }
};

export default list;

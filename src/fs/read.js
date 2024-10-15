import { createReadStream } from "node:fs";
import { EOL } from "os";
import path from "node:path";

const read = async (filePath) => {
  try {
    return new Promise((resolve, reject) => {
      const resolvedPath = path.isAbsolute(filePath)
        ? filePath
        : path.resolve(process.cwd(), filePath);

      const readableStream = createReadStream(resolvedPath, "utf-8");

      readableStream
        .on("data", (data) => {
          console.log(data);
        })
        .on("end", () => resolve())
        .on("error", (err) => {
          reject(new Error(`FS operation failed - ${err.message + EOL}`));
        });
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default read;

import { createReadStream } from "node:fs";
import { EOL } from "os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async (filePath) => {
  try {
    return new Promise((resolve, reject) => {
      const resolvedPath = filePath.startsWith("./")
        ? path.resolve(__dirname, "../", filePath)
        : path.resolve(process.cwd(), filePath);

      const readableStream = createReadStream(resolvedPath, "utf-8");

      readableStream
        .on("data", (data) => {
          console.log(data);
        })
        .on("end", () => resolve())
        .on("error", (err) => {
          reject(new Error(`FS operation failed ${EOL}${err.message}${EOL}`));
        });
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default read;

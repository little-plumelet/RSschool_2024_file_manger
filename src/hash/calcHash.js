import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { EOL } from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async (filePath) => {
  try {
    return new Promise((resolve, reject) => {
      const resolvedPath = filePath.startsWith("./")
        ? path.resolve(__dirname, "../", filePath)
        : path.resolve(process.cwd(), filePath);
      const hash = createHash("sha256");

      const readableStream = createReadStream(resolvedPath);

      readableStream
        .on("data", (data) => {
          hash.update(data);
        })
        .on("end", () => {
          console.log(hash.digest("hex"));
          resolve();
        })
        .on("error", (err) => {
          reject(new Error(`FS operation failed ${EOL}${err.message}${EOL}`));
        });
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default calculateHash;

import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import path from "node:path";
import { EOL } from "os";

const calculateHash = async (filePath) => {
  try {
    return new Promise((resolve, reject) => {
      const resolvedPath = path.isAbsolute(filePath)
        ? filePath
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

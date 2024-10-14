import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress } from "node:zlib";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { EOL } from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compress = async (source, destination) => {
  const resolvedSource = source.startsWith("./")
    ? path.resolve(__dirname, "../", source)
    : path.resolve(process.cwd(), source);
  const resolvedDestination = destination.startsWith("./")
    ? path.resolve(__dirname, "../", destination)
    : path.resolve(process.cwd(), destination);

  const sourceStream = createReadStream(resolvedSource);
  const destinationStream = createWriteStream(resolvedDestination);
  const brotli = createBrotliCompress();

  try {
    await pipeline(sourceStream, brotli, destinationStream);
  } catch (err) {
    throw new Error(`FS operation failed ${EOL}${err.message}${EOL}`);
  }
};

export default compress;

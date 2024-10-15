import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import { EOL } from "os";

const decompress = async (source, destination) => {
  const resolvedSource = path.isAbsolute(source)
    ? source
    : path.resolve(process.cwd(), source);

  let resolvedDestination = path.isAbsolute(destination)
    ? destination
    : path.resolve(process.cwd(), destination);

  const sourceStream = createReadStream(resolvedSource);
  const destinationStream = createWriteStream(resolvedDestination);
  const brotli = createBrotliDecompress();

  try {
    await pipeline(sourceStream, brotli, destinationStream);
  } catch (err) {
    throw new Error(`FS operation failed ${EOL}${err.message}${EOL}`);
  }
};

export default decompress;

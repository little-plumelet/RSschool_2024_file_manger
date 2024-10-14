import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { stat } from "node:fs/promises";
import { EOL } from "os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copy(source, destination) {
  try {
    const resolvedSource = source.startsWith("./")
      ? path.resolve(__dirname, "../", source)
      : path.resolve(process.cwd(), source);
    let resolvedDestination = destination.startsWith("./")
      ? path.resolve(__dirname, "../", destination)
      : path.resolve(process.cwd(), destination);

    const fileStats = await stat(resolvedSource);

    if (!fileStats.isFile()) {
      throw new Error(`FS operation failed: source is not file`);
    }

    const fileName = path.basename(resolvedSource);
    resolvedDestination = path.join(resolvedDestination, fileName);

    const readStream = createReadStream(resolvedSource);
    const writeStream = createWriteStream(resolvedDestination);

    await pipeline(readStream, writeStream);
  } catch (err) {
    throw new Error(`FS operation failed - ${err.message + EOL}`);
  }
}

export default copy;

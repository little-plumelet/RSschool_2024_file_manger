import copy from "./copy.js";
import { unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function move(source, destination) {
  try {
    const resolvedSource = source.startsWith("./")
      ? path.resolve(__dirname, "../", source)
      : path.resolve(process.cwd(), source);

    await copy(source, destination);
    await unlink(resolvedSource);
  } catch (err) {
    throw new Error(err.message);
  }
}

export default move;

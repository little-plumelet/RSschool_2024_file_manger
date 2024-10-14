import copy from "./copy.js";
import { unlink } from "node:fs/promises";
import path from "node:path";

async function move(source, destination) {
  try {
    const resolvedSource = path.isAbsolute(source)
      ? source
      : path.resolve(process.cwd(), source);

    await copy(source, destination);
    await unlink(resolvedSource);
  } catch (err) {
    throw new Error(err.message);
  }
}

export default move;

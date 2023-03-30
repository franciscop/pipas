import { Readable, Writable } from "node:stream";

export default function magic(row) {
  if (row instanceof ReadableStream) {
    return console.log("ReadableStream (Web)");
  }
  if (row instanceof Readable) {
    return console.log("Readable (Node.js)");
  }
  if (row instanceof WritableStream) {
    return console.log("WritableStream (Web)");
  }
  if (row instanceof Writable) {
    return console.log("Writable (Node.js)");
  }
  if (row.then) {
    return console.log("Promise");
  }
  return console.log("Type not found");
}

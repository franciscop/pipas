# Pipas

Make NodeStream, WebStream and Promises work better than ever together.

> WIP: this is a proposed API and I'm not yet sure whether it's technically possible or not, I'm experimenting with it so far

Experiment to see if we can create a unified Streams API for WebStream and NodeStream. Right now in JS there are two pipes, which are incompatible:

```js
// NodeStream
const nodeSrc = fs.readStream("myfile.txt");
const nodeDst = fs.writeStream("mynewfile.txt");
nodeSrc.pipe(nodeDst);
// or
await pipeline(nodeSrc, nodeDst);

// WebStream
const webSrc = new ReadableStream({
  start: (ctrl) => ctrl.enqueue("Hello world"),
});
const webDst = new WritableStream({
  write: (chunk) => console.log(chunk),
});
await webSrc.pipeTo(webDst);

// DOES NOT WORK
nodeSrc.pipe(webDst);
webSrc.pipeTo(nodeDst);
```

So, this is a mess and the APIs are incompatible. Sure there's some layers for transforming some, but they are a bit messy and you need to know how and where to apply properly. That's where **pipas** comes in, just wrap it and do whatever you want:

```js
import pipas from "pipas";

const src = pipas(nodeSrc);
const dst = pipas(webDst);

src.pipe(dst); // Node pipes
await pipeline(src, dst); // Node pipes with await
await src.pipeTo(dst); // Web pipes
```

You can wrap a Node Readable, a Node Writable, a Web ReadableStream, or a web WritableStream with `pipas()` and it'll be compatible with the other one. Specially useful for library authors, when answering the question your users might have:

**Do you support Node Streams or Web Streams? _Yes_**

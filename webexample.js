const source = new ReadableStream({
  start: (ctrl) => ctrl.enqueue("Hello world"),
});
const log = new WritableStream({
  write: (chunk) => console.log(chunk),
});
source.pipeTo(log);

class MockWorker {
  constructor(stringUrl, onmessage) {
    this.url = stringUrl;
    this.onmessage = onmessage;
  }

  postMessage(msg) {
    this.onmessage(msg);
  }
}

export default MockWorker;

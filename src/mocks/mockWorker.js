import { noop } from '../helpers/noop';

class MockWorker {
  constructor(stringUrl) {
    this.url = stringUrl;
    this.onmessage = noop;
  }

  postMessage(msg) {
    this.onmessage(msg);
  }
}

export default MockWorker;

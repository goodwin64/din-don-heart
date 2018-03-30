export const imageWorkerCode = () => {
  /* eslint-disable no-restricted-globals */
  self.onmessage = (e) => {
    createImageBitmap(e.data.file)
      .then((response) => {
        self.postMessage(response);
      });
  };
  /* eslint-enable no-restricted-globals */
};

let code = imageWorkerCode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

if (!code) {
  /* eslint-disable no-console */
  // TODO: throw an error with handling on UI
  console.error('Image picker Worker does nothing!');
  /* eslint-enable no-console */
}

const blob = new Blob([code], { type: 'application/javascript' });
const workerScript = URL.createObjectURL(blob);

export default workerScript;

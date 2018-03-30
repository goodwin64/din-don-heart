const workercode = () => {
  // eslint-disable-next-line
    let onmessage = e => { // workaround not to use global "self"
    createImageBitmap(e.data.file)
      .then((response) => {
        postMessage(response);
      });
  };
};

let code = workercode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });
const workerScript = URL.createObjectURL(blob);

export default workerScript;

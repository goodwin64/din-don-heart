self.onmessage = (e) => {
  createImageBitmap(e.data.file)
    .then((response) => {
      self.postMessage(response);
    })
    .catch((error) => {
      const errorCopied = JSON.parse(JSON.stringify(error));
      self.postMessage({ error: errorCopied, errorMessage: 'Error while image creating' });
    });
};
self.onerror = err => console.error('Error while image processing', err);

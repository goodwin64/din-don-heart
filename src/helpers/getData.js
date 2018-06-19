export default function getData(url, data = {}) {
  // Default options are marked with *
  const query = Object
    .entries(data)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&');

  return fetch(`${url}?${query}`)
    .then(response => response.json()); // parses response to JSON
}

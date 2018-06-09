const FakeAuthService = credentials => new Promise((resolve, reject) => {
  const username = String(credentials.username);
  if (username.toLowerCase().includes('alex')) {
    setTimeout(reject, 750);
  } else {
    setTimeout(resolve, 1000);
  }
});

export default FakeAuthService;
class FakeAuthServiceFactory {
  login = ({ email, password }) => new Promise((resolve, reject) => {
    const isCorrectPassword = localStorage.getItem(`user_${email}`) === password;
    if (isCorrectPassword) {
      setTimeout(resolve, 1000);
    } else {
      setTimeout(reject, 750);
    }
  });

  signUp = ({ email, password }) => new Promise((resolve, reject) => {
    const isUserAlreadyExist = localStorage.getItem(`user_${email}`) !== null;
    if (isUserAlreadyExist) {
      setTimeout(reject, 1000);
    } else {
      localStorage.setItem(`user_${email}`, password);
      setTimeout(resolve, 1000);
    }
  });
}

const FakeAuthService = new FakeAuthServiceFactory();

export default FakeAuthService;

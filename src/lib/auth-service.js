import axios from 'axios';

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  };

  signup(user) {
    const { username, password } = user;
    return this.auth.post('/auth/signup', {username, password})
      .then(({ data }) => data);
  };

  login(user) {
    const { username, password } = user;
    return this.auth.post('/auth/login', {username, password})
      .then(({ data }) => data);
  };

  logout() {
    return this.auth.post('/auth/logout', {})
      .then(response => response.data);
  };

  me(user) {
    return this.auth.get('/auth/me')
      .then(response => response.data);
  };

  updateUser(user) {
    return this.auth.put(`/auth/update`, {user})
      .then(({ data }) => data);
  };

  getUser() {
    return this.auth.get(`/auth`)
      .then(({ data }) => data);
  };
};

const auth = new Auth();

export default auth;
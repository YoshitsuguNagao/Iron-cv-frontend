import axios from 'axios';

class Cv {
  constructor() {
    this.cv = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
  }

  createCv(cv) {
    const { name, contentId } = cv;
    console.log(cv)
    return this.cv.post('/cv', {name, contentId})
      .then(({ data }) => data);
  }

  me(body) {
    return this.cv.get('/cv')
    .then(response => response.data)
  }
}

const cv = new Cv();

export default cv;

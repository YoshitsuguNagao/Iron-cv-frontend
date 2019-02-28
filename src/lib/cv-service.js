import axios from 'axios';

class CvService {
  constructor() {
    this.cv = axios.create({
      baseURL: 'http://localhost:5000/cv',
      withCredentials: true
    })
  }

  createCv(body) {
    const { name, contentId } = cv;
    return this.cv.post('/cv', {name, contentId})
      .then(({ data }) => data);
  }

  me(body) {
    return this.cv.get('/cv')
    .then(response => response.data)
  }
}

const cvService = new CvService();

export default cvService;

import axios from 'axios';

class Cv {
  constructor() {
    this.cv = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
  }

  getCvs(user) {
    return this.cv.get('/cv',{user})
    .then(({ data }) => {
        return data
      })
  }

  createCv(cv) {
    const { name, user } = cv;
    return this.cv.post('/cv', {name, user})
      .then(({ data }) => {
        return data;
      })
  }

  deleteCv(id) {
    const { name, contentId } = cv;
    return this.cv.delete(`/cv/${id}`, {name, contentId})
    .then(({ data }) => {
      return data;
    })
  }

  me(body) {
    return this.cv.get('/cv')
    .then(response => response.data)
  }
}

const cv = new Cv();

export default cv;

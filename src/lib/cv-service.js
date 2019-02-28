import axios from 'axios';

class Cv {
  constructor() {
    this.cv = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
  }

  getCvs() {
    return this.cv.get('/cv')
      .then(({ data }) => {
        return data
      })
  }

  createCv(cv) {
    const { name, contentId } = cv;
    console.log(cv)
    return this.cv.post('/cv', {name, contentId})
      .then(({ data }) => {
        return data;
      })
  }

  deleteCv(id) {
    const { name, contentId } = cv;
    // post to an id - use string interpolation to pass this into url endpoint e.g cv${id}
    return this.cv.post('/:id', {name, contentId})
    .then(({ data }) => {
      //console log here to see it in chrome console
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

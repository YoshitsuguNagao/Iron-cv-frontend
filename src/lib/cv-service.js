import axios from 'axios';

class Cv {
  constructor() {
    this.cv = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    })
  }

  getCvs(user) {
    return this.cv.get('/cv',{user})
    .then(({ data }) => {
        return data
      })
  }

  getCv(id) {
    return this.cv.get(`/cv/${id}`)
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
    return this.cv.delete(`/cv/${id}`)
    .then(({ data }) => {
      return data;
    })
  }

  updateCv(cv) {
    console.log('ahahahahaha',cv)
    return this.cv.put(`/cv/${cv._id}`, cv)
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

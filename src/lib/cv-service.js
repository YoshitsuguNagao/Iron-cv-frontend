import axios from 'axios';

class Cv {
  constructor() {
    this.cv = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
  }

  getCvs(user) {
    // console.log('getCVs cvId', user)
    return this.cv.get('/cv',{user})
    .then(({ data }) => {
        // console.log('getCvs fntend', data)
        return data
      })
  }

  createCv(cv) {
    const { name, user } = cv;
    // console.log('createCv fntend',user)
    return this.cv.post('/cv', {name, user})
      .then(({ data }) => {
        // console.log('createCv fntend',data)
        return data;
      })
  }

  deleteCv(id) {
    const { name, contentId } = cv;
    // console.log(id)
    // post to an id - use string interpolation to pass this into url endpoint e.g cv${id}
    return this.cv.delete(`/cv/${id}`, {name, contentId})
    .then(({ data }) => {
      //console.log
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

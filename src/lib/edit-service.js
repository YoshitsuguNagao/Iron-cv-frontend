import axios from 'axios';

class Edit {
  constructor() {
    this.edit = axios.create({
      baseURL: 'http://localhost5000',
      withCredentials: true
    })
  }

  getContent(cv) {
    return this.edit.get('/edit/:id', {cv})
    .then(({ data }) => {
      return data
    })
  }

  createContent(content) {
    const { type, title } = content;
    return this.edit.post('/edit/:id', {type, title})
      .then(({ data }) => {
        return data;
      })
  }

  deleteContent(id) {
    // const { name, contentId } = cv;
    return this.edit.delete(`/edit/${id}`)
    .then(({ data }) => {
      return data;
    })
  }

  updateCv(content) {
    // const { name, user } = cv;
    console.log('edit-service', content._id)
    return this.edit.put(`/edit/${content._id}`, content)
    .then(({ data }) => {
      return data;
    })
  }
}

const edit = new Edit();

export default edit;
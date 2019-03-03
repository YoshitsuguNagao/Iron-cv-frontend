import axios from 'axios';

class Content {
  constructor() {
    this.content = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
  }

  getContent(cvId) {
    return this.content.get(`/edit/${cvId}`)
    .then(({ data }) => {
      return data
    })
  }

  createContent(content, cvId) {
    return this.content.post(`/edit/${cvId}`, {content})
      .then(({ data }) => {
        return data;
      })
  }

  deleteContent(id) {
    return this.content.delete(`/edit/${id}`)
    .then(({ data }) => {
      return data;
    })
  }

  updateContent(content) {
    console.log('edit-service', content._id)
    return this.content.put(`/edit/${content._id}`, content)
    .then(({ data }) => {
      return data;
    })
  }
}

const content = new Content();

export default content;
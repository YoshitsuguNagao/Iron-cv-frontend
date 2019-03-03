import axios from 'axios';

class Content {
  constructor() {
    this.content = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
  }

  getContent(cv) {
    return this.content.get('/edit/:id', {cv})
    .then(({ data }) => {
      return data
    })
  }

  createContent(content, cvId) {
    console.log('createContent',content)
    // const { contentType, title } = content;
    return this.content.post(`/edit/${cvId}`, {content})
      .then(({ data }) => {
        return data;
      })
  }

  deleteContent(id) {
    // const { name, contentId } = cv;
    return this.content.delete(`/edit/${id}`)
    .then(({ data }) => {
      return data;
    })
  }

  updateContent(content) {
    // const { name, user } = cv;
    console.log('edit-service', content._id)
    return this.content.put(`/edit/${content._id}`, content)
    .then(({ data }) => {
      return data;
    })
  }
}

const content = new Content();

export default content;
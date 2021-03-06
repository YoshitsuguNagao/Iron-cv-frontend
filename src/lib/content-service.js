import axios from 'axios';

class Content {
  constructor() {
    this.content = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true,
    });
  };

  getContent(cvId) {
    return this.content.get(`/edit/${cvId}`)
    .then(({ data }) => {
      return data
    });
  };

  createContent(content, cvId) {
    return this.content.post(`/edit/${cvId}`, {content})
      .then(({ data }) => {
        return data;
      });
  };

  deleteContent(content) {
    const contentId = content._id
    return this.content.delete(`/edit/${contentId}`)
    .then(({ data }) => {
      return data;
    });
  };

  updateContent(content) {
    return this.content.put(`/edit/${content._id}`, content)
    .then(({ data }) => {
      return data;
    });
  };
};

const content = new Content();

export default content;
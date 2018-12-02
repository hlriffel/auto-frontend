import axios from 'axios';

class RequestService {

  // ENDPOINT_URL = 'https://auto-backend.herokuapp.com';
  ENDPOINT_URL = 'http://localhost:8090';
  authorized = false;

  login(idToken) {
    const postOptions = {
      method: 'POST',
      url: this.ENDPOINT_URL + '/login',
      headers: {
        'X-ID-TOKEN': idToken
      }
    };

    return axios(postOptions).then(
      response => {
        axios.defaults.headers.common['Authorization'] = response.headers['authorization'];
        this.authorized = true;
      }
    );
  }

  get(path) {
    return axios.get(this.ENDPOINT_URL + '/rest' + path);
  }

  post(path, data) {
    return axios.post(this.ENDPOINT_URL + '/rest' + path, data);
  }

  delete(path) {
    return axios.delete(this.ENDPOINT_URL + '/rest' + path);
  }

  isAuthorized() {
    return this.authorized;
  }

  getEndpointUrl() {
    return this.ENDPOINT_URL;
  }
}

const requestService = new RequestService();

export default requestService;

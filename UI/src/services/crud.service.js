import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class crudService {
  getRecords(url) {
    return axios.get(API_URL+''+url, { headers: authHeader() });
  }

  getRecord(url,record) {
    return axios.get(API_URL+''+url + '/' + record.id, { headers: authHeader() });
  }

  create(url,record) {
    return axios.post(API_URL +''+url+ "/create", record, { headers: authHeader() }).then(response => {
      return response.data;
    });
  }

  update(url,record) {
    return axios.put(API_URL +''+url+ '/' + record.id, record, { headers: authHeader() }).then(response => {
      return response.data;
    });
  }

  delete(url,record) {
    return axios.delete(API_URL + '' +url+'/' + record.id, { headers: authHeader() });
  }
}

export default new crudService();

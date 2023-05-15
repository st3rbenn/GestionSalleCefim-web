import Axios from 'axios';


Axios.defaults.baseURL = "http://127.0.0.1:8080/api";
 


const axios = Axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  timeout: 15000,
});

export default axios;

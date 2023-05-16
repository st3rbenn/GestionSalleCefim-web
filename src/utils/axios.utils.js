import Axios from 'axios';


Axios.defaults.baseURL = "http://localhost:8080/api";
 


const axios = Axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  timeout: 15000,
});

export default axios;

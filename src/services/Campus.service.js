import axios from '../utils/axios.utils';

class CampusService {
  async getAllCampuses() {
    try {
      const response = await axios.get('/campus/all');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default CampusService;
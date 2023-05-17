import axios from '../utils/axios.utils';
import { transformApiData } from '../utils/formatData.utils';

class CampusService {
  async getAllCampuses() {
    try {
      const response = await axios.get('/campus/all');
      // console.log("TESTIONSDJFNBJOSNDOGI", transformApiData(response.data));
      console.log("TESTIONSDJFNBJOSNDOGI", response.data)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default CampusService;
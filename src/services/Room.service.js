import axios from "../utils/axios.utils";

class RoomService {
    /* GET */
    async getAllRoom() {
      try {
        const response = await axios.get('/room/all');
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }

}

export default RoomService
import axios from "../utils/axios.utils";

class UserService {
  /* GET */
  async getAllUsers() {
    try {
      const response = await axios.get('/user/all');
      return  response.data;
    } catch (error) {
      console.log(error);
    }
  }

  /* POST */
  async editUser(id, data) {
    try {
      const response = await axios.put(`/user/${id}`, data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserService;
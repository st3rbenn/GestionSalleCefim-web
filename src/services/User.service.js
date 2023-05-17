import axios from "../utils/axios.utils";

class UserService {
  /* GET */
  async getAllUsers() {
    try {
      const response = await axios.get('/user/all');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  /* POST */
  async addUser() {
    try {
      const response = await axios.post(`/user`, );
      console.log('Utilisateur ajouté avec succès !');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserService;
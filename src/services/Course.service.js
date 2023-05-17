import axios from "../utils/axios.utils";

class CourseService {
    /* GET */
    async getAllCourse() {
      try {
        const response = await axios.get('/course/all');
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
}

export default CourseService
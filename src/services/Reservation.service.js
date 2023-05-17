import axios from "../utils/axios.utils";

class ReservationService {
    /* GET */
    async getAllReservation() {
      try {
        const response = await axios.get('/reservation/all');
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }

    async deleteReservation(reservationId){
      try {
        const response = await axios.delete(`/reservation/${reservationId}`);
        console.log(response.data);
      } catch (error) {
        console.log(error)
      }
    }

    // async addReservation (){
    //   try {
        
    //   } catch (error) {
        
    //   }
    // }
}

export default ReservationService
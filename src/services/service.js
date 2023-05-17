import CampusService from "./Campus.service";
import ReservationService from "./Reservation.service";
import UserService from "./User.service";
import RoomService from "./Room.service";
import CourseService from "./Course.service";

const campus = new CampusService();
const user = new UserService();
const reservation = new ReservationService();
const room = new RoomService();
const course = new CourseService();

export { campus, user , reservation, room, course};

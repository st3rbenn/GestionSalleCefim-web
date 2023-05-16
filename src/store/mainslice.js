import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { campus, user, reservation, room , course } from "../services/service";

const initialState = {
	user: {},
	users: [],
	campus: {},
	reservations: [],
	rooms: [],
	courses: [],
	loadingCourses: false,
	loadingRooms: false,
	loadingCampuses: false,
	loadingUsers: false,
	loadingReservations: false,
};

export const getAllCampuses = createAsyncThunk("root/getAllCampuses",
	async () => {
		const res = await campus.getAllCampuses();
		return res;
	}
);

export const getAllUser = createAsyncThunk("root/user/all", async () => {
	const res = await user.getAllUsers();
	return res;
});

export const getAllReservation = createAsyncThunk("root/reservation/all", async () => {
	const res = await reservation.getAllReservation();
	// console.log(res);
	return res;
})

export const getAllRoom = createAsyncThunk("root/room/all", async () => {
	const res = await room.getAllRoom();
	// console.log(res);
	return res;
})

export const getAllCourse = createAsyncThunk("root/course/all", async () => {
	const res = await course.getAllCourse();
	console.log('COURSE', res);
	return res;
})

export const deleteReservation = createAsyncThunk("root/reservation/delete", async (reservationId) => {
	const res = await reservation.deleteReservation(reservationId);
	console.log('supprimer', res);
	return reservationId;
});


export const mainSlice = createSlice({
	name: "root",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllCampuses.pending, (state) => {
				state.loadingCampuses = true;
			})
			.addCase(getAllCampuses.fulfilled, (state, action) => {
				state.campus = action.payload;
				state.loadingCampuses = false;
			})
			.addCase(getAllCampuses.rejected, (state) => {
				state.loadingCampuses = false;
			})
			.addCase(getAllUser.pending, (state) => {
				state.loadingUsers = true;
			})
			.addCase(getAllUser.fulfilled, (state, action) => {
				state.users = action.payload;
				state.loadingUsers = false;
			})
			.addCase(getAllUser.rejected, (state) => {
				state.loadingUsers = false;
			})
			.addCase(getAllReservation.pending, (state) => {
				state.loadingReservations = true;
			})
			.addCase(getAllReservation.fulfilled, (state, action) => {
				state.reservations = action.payload;
				state.loadingReservations = false;
			})
			.addCase(getAllReservation.rejected, (state) => {
				state.loadingReservations = false;
			})
			.addCase(getAllRoom.pending, (state) => {
				state.loadingRooms = true;
			})
			.addCase(getAllRoom.fulfilled, (state, action) => {
				state.loadingRooms = false;
				state.rooms = action.payload;
				// console.log('hv', action.payload);
			})
			.addCase(getAllRoom.rejected, (state) => {
				state.loadingRooms = false;
			})
			.addCase(getAllCourse.pending, (state) => {
				state.loadingCourses = true;
			})
			.addCase(getAllCourse.fulfilled, (state, action) => {
				state.loadingCourses = false;
				state.courses = action.payload;
				console.log('courses123', action.payload);
			})
			.addCase(getAllCourse.rejected, (state) => {
				state.loadingCourses = false;
			})
			.addCase(deleteReservation.pending, (state) => {
				state.loadingReservations = true;
			})
			.addCase(deleteReservation.fulfilled, (state, action) => {
				const deletedReservationId = action.payload;
				state.reservations = state.reservations.filter((reservation) => reservation.id !== deletedReservationId);
				state.loadingReservations = false;
			})
			.addCase(deleteReservation.rejected, (state) => {
				state.loadingReservations = false;
			});
	},
});

export default mainSlice.reducer;

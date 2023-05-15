import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { campus, user } from "../services/service";

const initialState = {
	user: {},
	users: [],
	campus: {},
	loadingCampuses: false,
	loadingUsers: false,
};

export const getAllCampuses = createAsyncThunk(
	"root/getAllCampuses",
	async () => {
		const res = await campus.getAllCampuses();
		return res;
	}
);

export const getAllUser = createAsyncThunk("root/getAllUser", async () => {
	const res = await user.getAllUsers();
	return res;
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
			});
	},
});

export default mainSlice.reducer;

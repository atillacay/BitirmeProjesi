import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";
// get all users
export const getUsers = createAsyncThunk(
  "usersList/getUsers",
  async (thunkAPI) => {
    const token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "GET",
        url: `${baseUrl}/users/list`,
        headers: {
          "auth-token": token,
        },
      });
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
/** Add new User */
export const addUser = createAsyncThunk(
  "usersList/addUser",
  async (userData, thunkAPI) => {
    const token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "POST",
        url: `${baseUrl}/users/register`,
        data: userData,
        headers: {
          "auth-token": token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
/** Delete user */
export const deleteUser = createAsyncThunk(
  "usersList/deleteUser",
  async (userId, thunkAPI) => {
    const token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "DELETE",
        url: `${baseUrl}/users/delete`,
        data: userId,
        headers: {
          "auth-token": token,
        },
      });
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
/** Edit user */
export const editUser = createAsyncThunk(
  "usersList/editUser",
  async (userData, thunkAPI) => {
    const token = localStorage.getItem("auth-token");
    const updateData = {
      name: userData.name,
      lastName: userData.lastName,
      email: userData.email,
      department: userData.department,
      role: userData.role,
    };
    try {
      const response = await axios({
        method: "PUT",
        url: `${baseUrl}/users/user/${userData.userId}`,
        data: updateData,
        headers: {
          "auth-token": token,
        },
      });
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const usersSlice = createSlice({
  name: "list",
  initialState: {
    users: [],
    isLoading: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.users = [];
      state.loading = "loading";
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.loading = "loaded";
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.message;
    });
    builder.addCase(addUser.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.message;
    });
  },
});

export const userList = usersSlice.reducer;

/**
 * Get single user details
 */

export const getUserDetails = createAsyncThunk(
  "singleUser/getUserDetails",
  async (userId, thunkAPI) => {
    const token = localStorage.getItem("auth-token");
    try {
      const response = await axios({
        method: "GET",
        url: `${baseUrl}/users/user/${userId}`,
        headers: {
          "auth-token": token,
        },
      });
      const { name, lastName, email, Department, Role, Docs } = response.data;
      const userData = {
        name: name,
        lastName: lastName,
        email: email,
        department: Department.name,
        role: Role.name,
        docs: Docs,
      };
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getUserDetailsSlice = createSlice({
  name: "getUserDetails",
  initialState: {
    isLoading: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state) => {
      state.isLoading = "loading";
    });
    builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
      state = Object.assign(state, payload);
      state.isLoading = "loaded";
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.isLoading = "error";
      state.error = action.error.message;
    });
  },
});
export const singleUser = getUserDetailsSlice.reducer;

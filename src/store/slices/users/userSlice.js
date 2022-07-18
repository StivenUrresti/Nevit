import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    people: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.people = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const getAllUser = () => (dispatch) => {
  axios
    .get("https://reqres.in/api/users?page=2")
    .then((response) => {
      dispatch(setUser(response.data.data));
    })

    .catch((error) => console.log("error", error));
};

export const createUser = (body) => async (dispatch) => {
  const bodyFormat = formatData(body);
  const response = await axios.post("https://reqres.in/api/users", bodyFormat);
  console.log("Esta es la respuesta a la base de datos", response);
};

export const deleteUser2 = async (user_id) => (dispatch) => {
  console.log('user_iddsadaw', user_id)
  try {
    axios.delete(`https://reqres.in/api/users/${user_id}`)
    dispatch(getAllUser())
  } catch (e) {
    throw new Error(e)
  }
}
const formatData = (body) => {
  return {
    first_name: body.first_name,
    last_name: body.last_name,
  };
};

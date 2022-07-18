import { configureStore } from "@reduxjs/toolkit";
import users from "./slices/users/userSlice";

export default configureStore ({
    reducer:{
        users
    }
}) 
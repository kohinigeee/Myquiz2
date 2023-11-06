import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, convertJsonToUser, createGuestUser, getLoginUser } from "@/lib/userdata";
import { BACK_INDEX } from "@/lib/constants";
import axios from "axios";
import { makeCORSRequest } from "@/lib/axioshelper";


const initialUser : User | undefined = createGuestUser(); 
// const initialUser : User | undefined = undefined; 

export const loginUserSlice = createSlice( {
    name: "loignUser",
    initialState: {
        user : initialUser,
    },
    reducers: {
        setUser: (state, action) => {
            if ( action.payload !== undefined ) {
                state.user = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUser.fulfilled, (state, action) => {
            if ( action.payload !== undefined ) {
                state.user = action.payload;
            }
        })
    }
}) ;

export const getUser = createAsyncThunk("loginUser/getUser", async () => {
        const url = BACK_INDEX+"/api/login";

        try {
           const res = await axios.get(url, makeCORSRequest({}))
           const userData = res.data.data;
           return convertJsonToUser(userData);
        } catch ( err ) {
            console.error(err);
            throw err;
        }
});

export const { setUser } = loginUserSlice.actions;

export default loginUserSlice.reducer;
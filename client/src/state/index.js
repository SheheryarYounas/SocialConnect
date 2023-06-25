import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode: 'light',
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: 'auth', //Name of the slice
    initialState, //Initial state of the slice
    reducers: { //Our actions
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },

        setLogin: (state, action) => { //action is the data that we are sending to the reducer or params
            state.user = action.payload.user; //Payload is the data that we are sending to the reducer
            state.token = action.payload.token; 
        },

        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },

        setFriends: (state, action) => {
            if (state.user)
            {
                state.user.friends = action.payload.friends;
            }

            else
            {
                console.log("User is null");
            }
        },

        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },

        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id)
                {
                    return action.payload.post;
                }

                return post;
            })

            state.posts = updatedPosts;
        }
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions
export default authSlice.reducer
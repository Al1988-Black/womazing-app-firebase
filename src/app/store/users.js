import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStoradgeService from "../services/localStoradge.service";
import userService from "../services/user.service";
import generateAuthError from "../utils/generateAuthError";
import history from "../utils/history";

const initialState = localStoradgeService.getAccessToken()
    ? {
          entities: null,
          currentUserData: null,
          isLoading: true,
          error: null,
          auth: { userId: localStoradgeService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          currentUserData: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestedSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestedFiled: (state, action) => {
            state.error = action.payload;
        },
        currentUserReceved: (state, action) => {
            state.currentUserData = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        userCreated: (state, action) => {
            // if (!Array.isArray(state.entities)) {
            //     state.entities = [];
            // }
            state.currentUserData = action.payload;
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.currentUserData = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdate: (state, action) => {
            const index = state.entities.findIndex(
                (u) => u._id === state.auth.userId
            );
            console.log(action.payload);
            state.entities[index] = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceved,
    usersRequestFiled,
    authRequestedSuccess,
    authRequestedFiled,
    userCreated,
    userLoggedOut,
    userUpdate,
    currentUserReceved,
    authRequested
} = actions;
const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFiled = createAction("users/userCreateFiled");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFiled = createAction("users/userUpdateFiled");

export const logIn =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            localStoradgeService.setTokens(data);
            dispatch(authRequestedSuccess({ userId: data.localId }));
            history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestedFiled(errorMessage));
            } else {
                dispatch(authRequestedFiled(error.message));
            }
        }
    };

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStoradgeService.setTokens(data);
            dispatch(authRequestedSuccess({ userId: data.localId }));
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    ...rest
                })
            );
        } catch (error) {
            dispatch(authRequestedFiled(error.message));
        }
    };
function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
            history.push("/");
        } catch (error) {
            dispatch(userCreateFiled(error.message));
        }
    };
}

export const logOut = () => (dispatch) => {
    localStoradgeService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

export const updateUser = (payload) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.update(payload);
        dispatch(userUpdate(content));
        history.push(`/users/${content._id}`);
    } catch (error) {
        dispatch(userUpdateFiled(error.message));
    }
};

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceved(content));
    } catch (error) {
        dispatch(usersRequestFiled(error.message));
    }
};

export const loadCurrentUserData = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.getCurrentUser();
        dispatch(currentUserReceved(content));
    } catch (error) {
        dispatch(usersRequestFiled(error.message));
    }
};

export const getUsersList = () => (state) => state.users.entities;

export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId);
    }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;

export const getDataLoaded = () => (state) => state.users.dataLoaded;

export const getCurrentUserId = () => (state) => state.users.auth.userId;

export const getIsLoadingUsersStatus = () => (state) => state.users.isLoading;

export const getCurrentUserData = () => (state) => state.users.currentUserData;

export const getAuthError = () => (state) => state.users.error;

export default usersReducer;

import { createAction, createSlice } from "@reduxjs/toolkit";
import cartService from "../services/cart.service";
import { getCurrentUserId } from "./users";
import { nanoid } from "nanoid";

const cartsSlice = createSlice({
    name: "carts",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        cartsRequested: (state) => {
            state.isLoading = true;
        },
        cartsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        cartsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        cartsAdded: (state, action) => {
            state.entities.push(action.payload);
        },
        cartsAddedFiled: (state, action) => {
            state.error = action.payload;
        },
        cartUpdate: (state, action) => {
            const index = state.entities.findIndex(
                (u) => u._id === action.payload._id
            );
            state.entities[index] = {
                ...state.entities[index],
                quantity: action.payload.quantity
            };
        },
        cartsDeleted: (state, action) => {
            state.entities = state.entities.filter(
                (cart) => cart._id !== action.payload
            );
        },
        cartsDeletedFiled: (state, action) => {
            state.error = action.payload;
        },
        cartsLoggedOut: (state) => {
            state.entities = null;
        }
    }
});

const { reducer: cartsReducer, actions } = cartsSlice;

const {
    cartsRequested,
    cartsReceved,
    cartsRequestFiled,
    cartsAdded,
    cartUpdate,
    cartsAddedFiled,
    cartsDeleted,
    cartsDeletedFiled,
    cartsLoggedOut
} = actions;

const cartsCreateRequested = createAction("carts/cartsCreateRequested");
const cartsDeleteRequested = createAction("carts/cartsDeleteRequested");
const cartsUpdateRequested = createAction("carts/cartsUpdateRequested");
const cartsUpdateFiled = createAction("carts/cartsUpdateFiled");

export const cartsLogOut = () => (dispatch) => {
    dispatch(cartsLoggedOut());
};
export const loadCartsList = (userId) => async (dispatch) => {
    dispatch(cartsRequested());
    try {
        const { content } = await cartService.getcarts(userId);
        dispatch(cartsReceved(content));
    } catch (error) {
        dispatch(cartsRequestFiled(error.message));
    }
};

export const createCart = (payload) => async (dispatch, getState) => {
    dispatch(cartsCreateRequested());
    try {
        const cart = {
            ...payload,
            _id: nanoid(),
            created_at: Date.now(),
            userId: getCurrentUserId()(getState())
        };
        const { content } = await cartService.createcart(cart);
        dispatch(cartsAdded(content));
    } catch (error) {
        dispatch(cartsAddedFiled(error.message));
    }
};

export const updateCart = (payload) => async (dispatch) => {
    dispatch(cartsUpdateRequested());
    try {
        const { content } = await cartService.update(payload);
        dispatch(cartUpdate(content));
    } catch (error) {
        dispatch(cartsUpdateFiled(error.message));
    }
};

export const deleteCart = (id) => async (dispatch) => {
    dispatch(cartsDeleteRequested);
    try {
        const { content } = await cartService.removecart(id);
        if (content === null) {
            dispatch(cartsDeleted(id));
        }
    } catch (error) {
        dispatch(cartsDeletedFiled(error.message));
    }
};

export const getCarts = () => (state) => state.carts.entities;
export const getCartById = (id) => (state) => {
    if (state.carts.entities) {
        state.carts.entities.find((e) => e._id === id);
    }
};

export const getCartsLoadingStatus = () => (state) => state.carts.isLoading;

export default cartsReducer;

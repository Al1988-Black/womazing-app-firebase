import { createAction, createSlice } from "@reduxjs/toolkit";
import orderService from "../services/order.service";

const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        ordersRequested: (state) => {
            state.isLoading = true;
        },
        ordersReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        ordersRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        ordersAdded: (state, action) => {
            state.entities.push(action.payload);
        },
        ordersAddedFiled: (state, action) => {
            state.error = action.payload;
        },
        ordersDeleted: (state, action) => {
            state.entities = state.entities.filter(
                (com) => com._id !== action.payload
            );
        },
        ordersDeletedFiled: (state, action) => {
            state.error = action.payload;
        },
        ordersLoggedOut: (state) => {
            state.entities = null;
        }
    }
});

const { reducer: ordersReducer, actions } = ordersSlice;

const {
    ordersRequested,
    ordersReceved,
    ordersRequestFiled,
    ordersAdded,
    ordersAddedFiled,
    ordersDeleted,
    ordersDeletedFiled,
    ordersLoggedOut
} = actions;

const ordersCreateRequested = createAction("orders/ordersCreateRequested");
const ordersDeleteRequested = createAction("orders/ordersDeleteRequested");

export const ordersLogOut = () => (dispatch) => {
    dispatch(ordersLoggedOut());
};

export const loadOrdersList = (userId) => async (dispatch) => {
    dispatch(ordersRequested());
    try {
        const { content } = await orderService.getorders(userId);
        dispatch(ordersReceved(content));
    } catch (error) {
        dispatch(ordersRequestFiled(error.message));
    }
};

export const createOrder = (data) => async (dispatch) => {
    dispatch(ordersCreateRequested());
    try {
        const { content } = await orderService.createorder(data);
        dispatch(ordersAdded(content));
    } catch (error) {
        dispatch(ordersAddedFiled(error.message));
    }
};

export const deleteOrder = (id) => async (dispatch) => {
    dispatch(ordersDeleteRequested);
    try {
        const { content } = await orderService.removeorder(id);
        if (content === null) {
            dispatch(ordersDeleted(id));
        }
        console.log(content);
    } catch (error) {
        dispatch(ordersDeletedFiled(error.message));
    }
};

export const getOrders = () => (state) => state.orders.entities;
export const getOrdersLoadingStatus = () => (state) => state.orders.isLoading;
export default ordersReducer;

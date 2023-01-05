import { createAction, createSlice } from "@reduxjs/toolkit";
import saleService from "../services/sale.service";

const salesSlice = createSlice({
    name: "sales",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        salesRequested: (state) => {
            state.isLoading = true;
        },
        salesReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        salesRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        salesAdded: (state, action) => {
            state.entities.push(action.payload);
        },
        salesAddedFiled: (state, action) => {
            state.error = action.payload;
        },
        salesDeleted: (state, action) => {
            state.entities = state.entities.filter(
                (com) => com._id !== action.payload
            );
        },
        salesDeletedFiled: (state, action) => {
            state.error = action.payload;
        },
        salesLoggedOut: (state) => {
            state.entities = null;
        }
    }
});

const { reducer: salesReducer, actions } = salesSlice;

const {
    salesRequested,
    salesReceved,
    salesRequestFiled,
    salesAdded,
    salesAddedFiled,
    salesDeleted,
    salesDeletedFiled,
    salesLoggedOut
} = actions;

const salesCreateRequested = createAction("sales/salesCreateRequested");
const salesDeleteRequested = createAction("sales/salesDeleteRequested");

export const salesLogOut = () => (dispatch) => {
    dispatch(salesLoggedOut());
};

export const loadSalesList = (userId) => async (dispatch) => {
    dispatch(salesRequested());
    try {
        const { content } = await saleService.getsales(userId);
        dispatch(salesReceved(content));
    } catch (error) {
        dispatch(salesRequestFiled(error.message));
    }
};

export const createSale = (data) => async (dispatch) => {
    dispatch(salesCreateRequested());
    try {
        const { content } = await saleService.createsale(data);
        dispatch(salesAdded(content));
    } catch (error) {
        dispatch(salesAddedFiled(error.message));
    }
};

export const deleteSale = (id) => async (dispatch) => {
    dispatch(salesDeleteRequested);
    try {
        const { content } = await saleService.removesale(id);
        if (content === null) {
            dispatch(salesDeleted(id));
        }
    } catch (error) {
        dispatch(salesDeletedFiled(error.message));
    }
};

export const getSales = () => (state) => state.sales.entities;
export const getSalesLoadingStatus = () => (state) => state.sales.isLoading;
export default salesReducer;

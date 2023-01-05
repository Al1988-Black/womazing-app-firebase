import { createAction, createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productsReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        productsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        productsAdded: (state, action) => {
            state.entities.push(action.payload);
        },
        productsAddedFiled: (state, action) => {
            state.error = action.payload;
        },
        productsDeleted: (state, action) => {
            state.entities = state.entities.filter(
                (com) => com._id !== action.payload
            );
        },
        productsDeletedFiled: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;

const {
    productsRequested,
    productsReceved,
    productsRequestFiled,
    productsAdded,
    productsAddedFiled,
    productsDeleted,
    productsDeletedFiled
} = actions;

const productsCreateRequested = createAction(
    "products/productsCreateRequested"
);
const productsDeleteRequested = createAction(
    "products/productsDeleteRequested"
);

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadProductsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().products;
    if (isOutdated(lastFetch)) {
        dispatch(productsRequested());
        try {
            const { content } = await productService.fetchAll();
            dispatch(productsReceved(content));
        } catch (error) {
            dispatch(productsRequestFiled(error.message));
        }
    }
};

export const createProduct = (data) => async (dispatch) => {
    dispatch(productsCreateRequested());
    try {
        const { content } = await productService.createproduct(data);
        dispatch(productsAdded(content));
    } catch (error) {
        dispatch(productsAddedFiled(error.message));
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    dispatch(productsDeleteRequested);
    try {
        const { content } = await productService.removeproduct(id);
        if (content === null) {
            dispatch(productsDeleted(id));
        }
    } catch (error) {
        dispatch(productsDeletedFiled(error.message));
    }
};

export const getProducts = () => (state) => state.products.entities;
export const getProductId = (id) => (state) =>
    state.products.entities.find((e) => e._id === id);

export const getProductsLoadingStatus = () => (state) =>
    state.products.isLoading;
export default productsReducer;

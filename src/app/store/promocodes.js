import { createSlice } from "@reduxjs/toolkit";
import promocodeService from "../services/promocode.service";

const promocodesSlice = createSlice({
    name: "promocodes",
    initialState: {
        entities: null,
        currentPromocode: null,
        isLoading: false,
        error: null
    },
    reducers: {
        promocodesRequested: (state) => {
            state.isLoading = true;
        },
        promocodesReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        promocodeCurrentReceved: (state, action) => {
            state.currentPromocode = action.payload;
            state.isLoading = false;
        },
        promocodesRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: promocodesReducer, actions } = promocodesSlice;

const {
    promocodesRequested,
    promocodesReceved,
    promocodesRequestFiled,
    promocodeCurrentReceved
} = actions;

export const loadPromocodesList = () => async (dispatch) => {
    dispatch(promocodesRequested());
    try {
        const { content } = await promocodeService.fetchAll();
        dispatch(promocodesReceved(content));
    } catch (error) {
        dispatch(promocodesRequestFiled(error.message));
    }
};

export const loadCurrentPromocode = (name) => async (dispatch) => {
    dispatch(promocodesRequested());
    try {
        const { content } = await promocodeService.getpromocode(name);
        dispatch(promocodeCurrentReceved(content));
    } catch (error) {
        dispatch(promocodesRequestFiled(error.message));
    }
};

export const getPromocodes = () => (state) => state.promocodes.entities;
export const getCurrentPromocode = () => (state) =>
    state.promocodes.currentPromocode;
export const getPromocodesLoadingStatus = () => (state) =>
    state.promocodes.isLoading;

export default promocodesReducer;

import { createSlice } from "@reduxjs/toolkit";
import cityService from "../services/city.service";

const citiesSlice = createSlice({
    name: "cities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        citiesRequested: (state) => {
            state.isLoading = true;
        },
        citiesReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        citiesRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: citiesReducer, actions } = citiesSlice;

const { citiesRequested, citiesReceved, citiesRequestFiled } = actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}
export const loadCitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().cities;
    if (isOutdated(lastFetch)) {
        dispatch(citiesRequested());
        try {
            const { content } = await cityService.fetchAll();
            dispatch(citiesReceved(content));
        } catch (error) {
            dispatch(citiesRequestFiled(error.message));
        }
    }
};

export const getCities = () => (state) => state.cities.entities;
export const getCitiesLoadingStatus = () => (state) => state.cities.isLoading;
export const getCityById = (id) => (state) => {
    if (state.cities.entities) {
        return state.cities.entities.find((e) => e._id === id);
    }
};

export default citiesReducer;

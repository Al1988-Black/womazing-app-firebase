import { createSlice } from "@reduxjs/toolkit";
import colorService from "../services/color.service";

const colorsSlice = createSlice({
    name: "colors",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        colorsRequested: (state) => {
            state.isLoading = true;
        },
        colorsReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        colorsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: colorsReducer, actions } = colorsSlice;
const { colorsRequested, colorsReceved, colorsRequestFiled } = actions;
function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadColorsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().colors;
    if (isOutdated(lastFetch)) {
        dispatch(colorsRequested());
        try {
            const { content } = await colorService.fetchAll();
            dispatch(colorsReceved(content));
        } catch (error) {
            dispatch(colorsRequestFiled(error.message));
        }
    }
};

export const getColors = () => (state) => state.colors.entities;
export const getColorsLoadingStatus = () => (state) => state.colors.isLoading;
export const getColorById = (id) => (state) =>
    state.colors.entities.find((c) => c._id === id);

export const getColorsByIds = (colorsIds) => (state) => {
    if (state.colors.entities) {
        const colorsArray = [];
        for (const colId of colorsIds) {
            for (const color of state.colors.entities) {
                if (color._id === colId) {
                    colorsArray.push(color);
                    break;
                }
            }
        }
        return colorsArray;
    }
    return [];
};

export default colorsReducer;

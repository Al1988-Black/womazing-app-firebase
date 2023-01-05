import { createSlice } from "@reduxjs/toolkit";
import sizeService from "../services/size.service";

const sizesSlice = createSlice({
    name: "sizes",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        sizesRequested: (state) => {
            state.isLoading = true;
        },
        sizesReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        sizesRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: sizesReducer, actions } = sizesSlice;

const { sizesRequested, sizesReceved, sizesRequestFiled } = actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}
export const loadSizesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().sizes;
    if (isOutdated(lastFetch)) {
        dispatch(sizesRequested());
        try {
            const { content } = await sizeService.fetchAll();
            dispatch(sizesReceved(content));
        } catch (error) {
            dispatch(sizesRequestFiled(error.message));
        }
    }
};

export const getSizes = () => (state) => state.sizes.entities;
export const getSizesLoadingStatus = () => (state) => state.sizes.isLoading;
export const getSizeById = (id) => (state) =>
    state.sizes.entities.find((e) => e._id === id);

export const getSizesByIds = (sizesIds) => (state) => {
    if (state.colors.entities) {
        const sizesArray = [];
        for (const sizId of sizesIds) {
            for (const size of state.sizes.entities) {
                if (size._id === sizId) {
                    sizesArray.push(size);
                    break;
                }
            }
        }
        return sizesArray;
    }
    return [];
};
export default sizesReducer;

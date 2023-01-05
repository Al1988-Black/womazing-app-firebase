import { createSlice } from "@reduxjs/toolkit";
import categoryService from "../services/category.service";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        categoriesRequested: (state) => {
            state.isLoading = true;
        },
        categoriesReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        categoriesRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: categoriesReducer, actions } = categoriesSlice;

const { categoriesRequested, categoriesReceved, categoriesRequestFiled } =
    actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}
export const loadCategoriesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().categories;
    if (isOutdated(lastFetch)) {
        dispatch(categoriesRequested());
        try {
            const { content } = await categoryService.fetchAll();
            dispatch(categoriesReceved(content));
        } catch (error) {
            dispatch(categoriesRequestFiled(error.message));
        }
    }
};

export const getCategories = () => (state) => state.categories.entities;
export const getCategoriesLoadingStatus = () => (state) =>
    state.categories.isLoading;
export const getCategoryById = (id) => (state) =>
    state.categories.entities.find((e) => e._id === id);

export default categoriesReducer;

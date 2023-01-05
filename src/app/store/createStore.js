import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories";
import citiesReducer from "./cities";
import colorsReducer from "./colors";
import sizesReducer from "./sizes";
import productsReducer from "./products";
import usersReducer from "./users";
import cartsReducer from "./carts";
import ordersReducer from "./orders";
import salesReducer from "./sales";
import promocodesReducer from "./promocodes";

const rootReducer = combineReducers({
    cities: citiesReducer,
    categories: categoriesReducer,
    colors: colorsReducer,
    sizes: sizesReducer,
    products: productsReducer,
    users: usersReducer,
    carts: cartsReducer,
    promocodes: promocodesReducer,
    orders: ordersReducer,
    sales: salesReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}

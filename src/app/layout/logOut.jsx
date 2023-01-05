import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartsLogOut } from "../store/carts";
import { ordersLogOut } from "../store/orders";
import { salesLogOut } from "../store/sales";
import { logOut } from "../store/users";

const LogOut = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
        dispatch(cartsLogOut());
        dispatch(ordersLogOut());
        dispatch(salesLogOut());
    }, []);
    return <h1>Loading...</h1>;
};

export default LogOut;

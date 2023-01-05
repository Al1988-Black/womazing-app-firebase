import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getCartsLoadingStatus,
    getCarts,
    loadCartsList
} from "../../store/carts";
import {
    getIsLoggedIn,
    getIsLoadingUsersStatus,
    getCurrentUserData
} from "../../store/users";
const CartNav = () => {
    const dispatch = useDispatch();
    const isLoadingCarts = useSelector(getCartsLoadingStatus());
    const isLoadingUsers = useSelector(getIsLoadingUsersStatus());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUser = useSelector(getCurrentUserData());
    useEffect(() => {
        if (currentUser) {
            dispatch(loadCartsList(currentUser._id));
        }
    }, [currentUser]);
    const carts = useSelector(getCarts());
    if (!isLoadingUsers && isLoggedIn && !isLoadingCarts) {
        const numberProduct =
            carts &&
            carts.reduce((acc, cart) => {
                return acc + cart.quantity;
            }, 0);
        return (
            <div className="links__item_cart">
                <Link
                    to={
                        currentUser
                            ? `/users/${currentUser._id}/cart`
                            : "/login"
                    }
                    className="links__item_cart-icon"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-cart4"
                        viewBox="0 0 24 24"
                    >
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                    </svg>
                </Link>
                {isLoggedIn && carts && carts.length > 0 && (
                    <span className="links__item_cart-number">
                        {carts ? numberProduct : ""}
                    </span>
                )}
            </div>
        );
    }
    return (
        <Link to="/login">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-cart4"
                viewBox="0 0 24 24"
            >
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>
        </Link>
    );
};

export default CartNav;

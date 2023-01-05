import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProductsList } from "../../../store/products";
import { loadCategoriesList } from "../../../store/categories";
import { loadCitiesList } from "../../../store/cities";
import { loadColorsList } from "../../../store/colors";
import { loadCartsList } from "../../../store/carts";
import { loadSizesList } from "../../../store/sizes";
import {
    getIsLoadingUsersStatus,
    getIsLoggedIn,
    loadCurrentUserData,
    getCurrentUserData,
    loadUsersList
} from "../../../store/users";
import localStoradgeService from "../../../services/localStoradge.service";
import { loadOrdersList } from "../../../store/orders";
import { loadSalesList } from "../../../store/sales";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersLoadingStatus = useSelector(getIsLoadingUsersStatus());
    const currentUserData = useSelector(getCurrentUserData());

    useEffect(() => {
        dispatch(loadCategoriesList());
        dispatch(loadCitiesList());
        dispatch(loadColorsList());
        dispatch(loadProductsList());
        dispatch(loadSizesList());
        if (isLoggedIn) {
            dispatch(loadCurrentUserData());
            dispatch(loadCartsList(localStoradgeService.getUserId()));
            dispatch(loadOrdersList(localStoradgeService.getUserId()));
            dispatch(loadSalesList(localStoradgeService.getUserId()));
        }
        if (currentUserData && currentUserData.admin) {
            dispatch(loadUsersList());
        }
    }, [isLoggedIn]);

    if (!usersLoadingStatus) {
        return children;
    }
    return "Loading...";
};

AppLoader.propTypes = {
    childern: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;

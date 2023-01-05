import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getProductsLoadingStatus,
    loadProductsList
} from "../../../store/products";
import PropTypes from "prop-types";

const ShopLoader = ({ children }) => {
    const isLoadingStatus = useSelector(getProductsLoadingStatus());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadProductsList());
    }, []);
    if (isLoadingStatus) return "Loading...";
    return children;
};
ShopLoader.propTypes = {
    childern: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ShopLoader;

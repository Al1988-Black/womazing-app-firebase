import React, { useEffect } from "react";
import CartHeader from "./cartHeader";
import SaleProductLine from "./saleProductLine";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {
    getSales,
    getSalesLoadingStatus,
    loadSalesList
} from "../../store/sales";

const SaleTable = ({ orderId }) => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadSalesList(userId));
    }, []);
    const isLoading = useSelector(getSalesLoadingStatus());
    const sales = useSelector(getSales());
    if (!isLoading) {
        const salesOrder = sales.filter((s) => s.orderId === orderId);
        return (
            <>
                <CartHeader />
                {salesOrder.map((saleLine) => (
                    <SaleProductLine key={saleLine._id} {...saleLine} />
                ))}
            </>
        );
    }
    return "Loading...";
};
SaleTable.propTypes = {
    orderId: PropTypes.string.isRequired
};

export default SaleTable;

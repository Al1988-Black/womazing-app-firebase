import { orderBy } from "lodash";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getOrders,
    getOrdersLoadingStatus,
    loadOrdersList
} from "../../store/orders";
import OrdersList from "../common/orders";

const Orders = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadOrdersList(userId));
    }, []);
    const isLoading = useSelector(getOrdersLoadingStatus());
    const orders = useSelector(getOrders());
    if (!isLoading) {
        const sortedOrders = orderBy(orders, ["created_at"], ["desc"]);
        return (
            <>
                {sortedOrders && sortedOrders.length > 0 ? (
                    <>
                        <div className="row">
                            <div className="col-12">
                                <h2>Заказы</h2>
                            </div>
                        </div>
                        <hr />
                        <OrdersList orders={sortedOrders} />
                    </>
                ) : (
                    <h2>Заказы отсутсвуют</h2>
                )}
            </>
        );
    }
    return "Loading...";
};

export default Orders;

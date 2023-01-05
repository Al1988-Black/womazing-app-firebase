import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/displayDate";
import SaleTable from "../../ui/saleTable";
import OrderInfo from "../../ui/orderInfo";

const Order = ({ index, number, order }) => {
    return (
        <>
            <h4 className="mb-3 mt-3">
                Заказ {Number(number) - Number(index)} от{" "}
                {displayDate(order.created_at)}
            </h4>
            <SaleTable orderId={order._id} />
            <OrderInfo {...order} />
        </>
    );
};
Order.propTypes = {
    index: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    order: PropTypes.object.isRequired
};

export default Order;

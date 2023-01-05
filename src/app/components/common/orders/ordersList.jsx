import React from "react";
import PropTypes from "prop-types";
import Order from "./order";

const OrdersList = ({ orders }) => {
    return orders.map((order, index) => (
        <Order
            key={order._id}
            order={order}
            index={index}
            number={orders.length}
        />
    ));
};

OrdersList.propTypes = {
    orders: PropTypes.array.isRequired
};
export default OrdersList;

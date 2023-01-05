import React from "react";
import CartHeader from "./cartHeader";
import CartProductLine from "./cartProductLine";
import PropTypes from "prop-types";

const CartTable = ({ cartList }) => {
    return (
        <>
            <CartHeader />
            {cartList.map((cartLine) => (
                <CartProductLine
                    key={cartLine._id}
                    id={cartLine._id}
                    idProduct={cartLine.productId}
                    quantityProduct={cartLine.quantity}
                    sizeId={cartLine.size}
                    colorId={cartLine.color}
                />
            ))}
        </>
    );
};

CartTable.propTypes = {
    cartList: PropTypes.array,
    onRemove: PropTypes.func,
    update: PropTypes.func
};

export default CartTable;

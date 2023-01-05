import React from "react";
import PropTypes from "prop-types";
import CartTable from "../catrTable";
import TotalPrice from "../totalPrice";

const CartSection = ({ cartList, subTotalPrice, switchFormType }) => {
    return (
        <section className="cart" id="cart">
            <div className="container">
                {cartList.length ? (
                    <>
                        <CartTable cartList={cartList} />
                        <TotalPrice
                            subTotalPrice={subTotalPrice}
                            switchFormType={switchFormType}
                        />
                    </>
                ) : (
                    <h3>Корзина пуста</h3>
                )}
            </div>
        </section>
    );
};

CartSection.propTypes = {
    cartList: PropTypes.array,
    subTotalPrice: PropTypes.number,
    switchFormType: PropTypes.func
};

export default CartSection;

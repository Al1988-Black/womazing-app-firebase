import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import {
    getCurrentPromocode,
    getPromocodesLoadingStatus,
    loadCurrentPromocode
} from "../../store/promocodes";

const TotalPrice = ({ switchFormType, subTotalPrice }) => {
    const dispatch = useDispatch();
    const [promo, setPromo] = useState({
        promocode: ""
    });

    const handleChange = (target) => {
        setPromo((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    let error = null;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (promo) {
            dispatch(loadCurrentPromocode(promo.promocode));
        }
    };
    const promocodeIsLoading = useSelector(getPromocodesLoadingStatus());
    const promocode = useSelector(getCurrentPromocode());
    if (promocodeIsLoading) return "Loading...";
    let discountCur = 0;

    if (promocode && promocode[0]?.total <= subTotalPrice) {
        discountCur = promocode[0].discount;
    }
    if (promocode && promocode[0]?.total >= subTotalPrice) {
        error = "Сумма заказа не подходит к введенному промокоду";
    }
    if (Array.isArray(promocode) && promocode.length === 0) {
        error = "Данный промокод не существует";
    }
    return (
        <div className="row">
            <div className="col-12">
                <div className="separation_cart-btn" />
            </div>
            <div className="col-12 d-block col-lg-8 d-md-flex">
                <form onSubmit={handleSubmit}>
                    <TextField
                        label={null}
                        type="text"
                        name="promocode"
                        value={promo.promocode}
                        placeholder="Введите купон"
                        onChange={handleChange}
                        error={null}
                        css={[null, null, "cart-table-coupon d-block"]}
                    />
                    <button
                        type="submit"
                        disabled={!promo}
                        className="btn-pr btn-pr_coupon d-block"
                    >
                        Применить купон
                    </button>
                    {!promocodeIsLoading && error && (
                        <p
                            style={{
                                color: "red"
                            }}
                        >
                            {error}
                        </p>
                    )}
                </form>
            </div>
            <div className="col-12 offset-0 offset-xl-6 col-xl-6 d-block d-xl-flex align-items-xl-end justify-content-xl-between">
                <div className="total">
                    <p className="total__subtotal d-block">
                        Подытог:{" "}
                        <span className="total__subtotal_size">
                            ${subTotalPrice}
                        </span>
                    </p>
                    {!promocodeIsLoading && promocode && promocode[0] && (
                        <p className="total__subtotal d-block">
                            Скидка:{" "}
                            <span className="total__subtotal_size">
                                ${discountCur}
                            </span>
                        </p>
                    )}
                    <p className="d-block total__text">
                        Итого:
                        <span className="total__size">
                            {!promocodeIsLoading && promocode && promocode[0]
                                ? `$${subTotalPrice - discountCur}`
                                : String(subTotalPrice)}
                        </span>
                    </p>
                </div>
                <button
                    className="btn-pr btn-pr_bg btn-pr_cart-order d-block"
                    onClick={switchFormType}
                >
                    Оформить заказ
                </button>
            </div>
        </div>
    );
};
TotalPrice.propTypes = {
    subTotalPrice: PropTypes.number.isRequired,
    switchFormType: PropTypes.func.isRequired
};
export default TotalPrice;

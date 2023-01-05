import React from "react";
import PropTypes from "prop-types";

const OrderInfo = ({
    name,
    email,
    phone,
    city,
    street,
    houseNumber,
    flatNumber,
    comment,
    cash,
    costOrder,
    discountPromo
}) => {
    return (
        <div className="row">
            <div className="col-12">
                <div className="separation_cart-btn" />
            </div>
            <div className="col-12 col-xl-6 ">
                <ul>
                    <li className="mt-2">1. Имя получателя - {name}</li>
                    <li className="mt-2">2. Email - {email}</li>
                    <li className="mt-2">3. Номер телефона - {phone}</li>
                    <li className="mt-2">4. Город - {city}</li>
                    <li className="mt-2">5. Улица - {street}</li>
                    <li className="mt-2">6. Номер дома - {houseNumber}</li>
                    <li className="mt-2">7. Номер квартиры - {flatNumber}</li>
                    <li className="mt-2">
                        8. Оплата наличными {cash ? "-Да" : "-Нет"}
                    </li>
                    <p className="mt-2">9. Коментарий - {comment}</p>
                </ul>
            </div>
            <div className="col-12 col-xl-6">
                <div className="total">
                    <p className="total__subtotal d-block">
                        Подытог:{" "}
                        <span className="total__subtotal_size">
                            ${costOrder}
                        </span>
                    </p>
                    <p className="total__subtotal d-block">
                        Скидка:{" "}
                        <span className="total__subtotal_size">
                            ${discountPromo}
                        </span>
                    </p>
                    <p className="d-block total__text">
                        Итого:
                        <span className="total__size">
                            ${costOrder - discountPromo}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
OrderInfo.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    houseNumber: PropTypes.string.isRequired,
    flatNumber: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    cash: PropTypes.bool.isRequired,
    costOrder: PropTypes.number.isRequired,
    discountPromo: PropTypes.number.isRequired
};
export default OrderInfo;

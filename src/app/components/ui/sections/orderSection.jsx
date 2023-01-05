import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import AreaTextField from "../../common/form/areaTextField";
import CheckBoxField from "../../common/form/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import {
    getCurrentPromocode,
    getPromocodesLoadingStatus,
    loadCurrentPromocode
} from "../../../store/promocodes";
import { createOrder } from "../../../store/orders";
import { getDataLoaded, getCurrentUserData } from "../../../store/users";
import { getCities, getCitiesLoadingStatus } from "../../../store/cities";
import { validator } from "../../../utils/validator";
import { createSale } from "../../../store/sales";
import { deleteCart } from "../../../store/carts";

const OrderSection = ({ cartProductList, subTotalPrice }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});

    const isLoadingPromocode = useSelector(getPromocodesLoadingStatus());
    const isDataUsersLoaded = useSelector(getDataLoaded());
    const isLoadingCities = useSelector(getCitiesLoadingStatus());
    const promoCurrent = useSelector(getCurrentPromocode());

    const cities = useSelector(getCities());
    const citiesList = cities.map((citiesName) => ({
        label: citiesName.name,
        value: citiesName._id
    }));
    const currentUser = useSelector(getCurrentUserData());
    useEffect(() => {
        if (
            !isLoadingCities &&
            !isLoadingPromocode &&
            isDataUsersLoaded &&
            !data
        ) {
            setData({
                name: currentUser.name,
                email: currentUser.email,
                phone: "",
                city: currentUser.city,
                street: "",
                houseNumber: "",
                flatNumber: "",
                comment: "",
                cash: false
            });
        }
    }, [isLoadingCities, isLoadingCities, currentUser, data]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);
    const promoDiscount =
        promoCurrent && promoCurrent[0] && promoCurrent[0].total < subTotalPrice
            ? promoCurrent[0].discount
            : 0;

    const history = useHistory();
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        phone: {
            isRequired: {
                message: "Номер телефона обязателен для заполнения"
            },
            phoneNumber: {
                message: "Неверный формат номера телефона"
            }
        },
        city: {
            isRequired: {
                message: "Город обязателен для заполнения"
            }
        },
        street: {
            isRequired: {
                message: "Улица обязателена для заполнения"
            }
        },
        houseNumber: {
            isRequired: {
                message: "Номер дома обязателен для заполнения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const city = cities.find((c) => c._id === data.city);
        const idOrder = nanoid();
        const newData = {
            _id: idOrder,
            userId: currentUser._id,
            discountPromo: promoDiscount,
            costOrder: subTotalPrice,
            ...data,
            city: city.name,
            created_at: Date.now()
        };
        dispatch(createOrder(newData));
        cartProductList.forEach((cart) => {
            const {
                cartId,
                quantity,
                productId,
                category,
                name,
                image,
                color,
                size,
                price,
                discount
            } = cart;

            dispatch(
                createSale({
                    _id: nanoid(),
                    userId: currentUser._id,
                    orderId: idOrder,
                    idPr: productId,
                    categoryPr: category,
                    quantityPr: quantity,
                    namePr: name,
                    imagePr: image,
                    colorPr: color,
                    sizePr: size,
                    pricePr: price,
                    discountPr: discount
                })
            );
            dispatch(deleteCart(cartId));
        });
        dispatch(loadCurrentPromocode(""));
        history.push("/completed");
    };
    return (
        <section className="checkout" id="checkout">
            <div className="container">
                {!isLoading ? (
                    <form
                        className="form-checkout form-val d-block"
                        onSubmit={handleSubmit}
                    >
                        <div className="row">
                            <div className="col-12 col-md-7">
                                <div className="buyer-data">
                                    <h3 className="mini_title buyer-data__title">
                                        Данные покупателя
                                    </h3>
                                    <TextField
                                        label="Имя"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        error={errors.name}
                                    />
                                    <TextField
                                        label="Электронная почта"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                    />
                                    <TextField
                                        label="Телефон"
                                        name="phone"
                                        value={data.phone}
                                        onChange={handleChange}
                                        error={errors.phone}
                                    />
                                </div>
                                <div className="buyer-data">
                                    <h3 className="mini_title buyer-data__title">
                                        Адрес получателя
                                    </h3>
                                    <SelectField
                                        onChange={handleChange}
                                        options={citiesList}
                                        name="city"
                                        label="Выберете ваш город"
                                        defaultOption=""
                                        error={errors.city}
                                        value={data.city}
                                        css={["mt-3 mb-3", null]}
                                    />
                                    <TextField
                                        label="Улица"
                                        name="street"
                                        value={data.street}
                                        onChange={handleChange}
                                        error={errors.street}
                                    />
                                    <TextField
                                        label="Номер дома"
                                        name="houseNumber"
                                        value={data.houseNumber}
                                        onChange={handleChange}
                                        error={errors.houseNumber}
                                    />
                                    <TextField
                                        label="Номер квартиры"
                                        name="flatNumber"
                                        value={data.flatNumber}
                                        onChange={handleChange}
                                        error={errors.flatNumber}
                                    />
                                </div>
                                <div className="buyer-data">
                                    <h3 className="mini_title buyer-data__title">
                                        Комментарии
                                    </h3>
                                    <AreaTextField
                                        value={data.comment || ""}
                                        onChange={handleChange}
                                        name="comment"
                                        label=""
                                        error={errors.comment}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-5">
                                <div className="order-data">
                                    <h3 className="mini_title order-data__title">
                                        Ваш заказ
                                    </h3>
                                    <div className="order-data__block d-flex justify-content-between">
                                        <ul className="order-data__list">
                                            <li className="order-data__item">
                                                Товар
                                            </li>
                                            {cartProductList.map((p) => (
                                                <li
                                                    className="order-data__item"
                                                    key={p.productId + p.cartId}
                                                >
                                                    {p.name}
                                                </li>
                                            ))}
                                            <li className="order-data__item">
                                                Подытог
                                            </li>
                                            <li className="order-data__item">
                                                Скидка
                                            </li>
                                            <li className="order-data__item order-data__item_last">
                                                Итог
                                            </li>
                                        </ul>
                                        <ul className="order-data__list">
                                            <li className="order-data__item">
                                                Всего
                                            </li>
                                            {cartProductList.map((p) => (
                                                <li
                                                    className="order-data__item"
                                                    key={p.cartId}
                                                >
                                                    {p?.price -
                                                        (p?.price *
                                                            p?.discount) /
                                                            100}{" "}
                                                    x {p.quantity}
                                                </li>
                                            ))}
                                            <li
                                                className="order-data__item"
                                                key="6"
                                            >
                                                ${subTotalPrice}
                                            </li>
                                            <li
                                                className="order-data__item"
                                                key="7"
                                            >
                                                ${promoDiscount}
                                            </li>
                                            <li
                                                className="order-data__item order-data__item_last"
                                                key="8"
                                            >
                                                ${subTotalPrice - promoDiscount}
                                            </li>
                                        </ul>
                                    </div>
                                    <span className="d-block order-data_bg"></span>
                                </div>
                                <div className="order-data">
                                    <h3 className="mini_title order-data__title">
                                        Способы оплаты
                                    </h3>
                                    <div className="order-data__cash d-flex">
                                        <CheckBoxField
                                            name="cash"
                                            onChange={handleChange}
                                            value={data.cash}
                                            css={[
                                                "order-data__cash-checkbox",
                                                "order-data__cash-input",
                                                "order-data__cash-label"
                                            ]}
                                            error={errors.cash}
                                        />
                                        <p>Оплата наличными</p>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={!isValid}
                                        className="order-data__btn btn-pr"
                                    >
                                        Разместить заказ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                ) : (
                    "Loading..."
                )}
            </div>
        </section>
    );
};

OrderSection.propTypes = {
    cartProductList: PropTypes.array,
    subTotalPrice: PropTypes.number
};

export default OrderSection;

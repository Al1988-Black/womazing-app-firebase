import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getSizesByIds, getSizesLoadingStatus } from "../../store/sizes";
import { getColorsByIds, getColorsLoadingStatus } from "../../store/colors";
import { createCart } from "../../store/carts";

const ProductChangeForm = ({ id, sizes, colors }) => {
    const initialData = {
        productId: id,
        size: "",
        color: "",
        quantity: "1"
    };
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const isLoadingColors = useSelector(getColorsLoadingStatus());
    const isLoadingSizes = useSelector(getSizesLoadingStatus());
    if (isLoadingColors || isLoadingSizes) return "'Loading";
    const arrayColors = useSelector(getColorsByIds(colors));
    const arraySizes = useSelector(getSizesByIds(sizes));

    if (arrayColors && arraySizes) {
        const sizesList = arraySizes.map((size) => ({
            label: size.name,
            value: size._id
        }));

        const colorsList = arrayColors.map((optionName) => ({
            value: optionName._id,
            label: optionName.name,
            color: optionName.color
        }));

        const handleChange = (target) => {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        };
        const validatorConfig = {
            color: {
                isRequired: {
                    message: "Выберите нужный цвет"
                }
            },
            size: {
                isRequired: {
                    message: "Выберите нужный размер"
                }
            }
        };
        const validate = () => {
            const errors = validator(data, validatorConfig);
            setErrors(errors);
            return Object.keys(errors).length === 0;
        };
        useEffect(() => {
            validate();
        }, [data]);
        useEffect(() => {
            setData(initialData);
        }, [id]);

        const isValid = Object.keys(errors).length === 0;
        const dispatch = useDispatch();
        const handleSubmit = (e) => {
            e.preventDefault();
            const isValid = validate();
            if (!isValid) return;
            const newData = {
                ...data,
                quantity: Number(data.quantity)
            };
            dispatch(createCart(newData));
            setData(initialData);
        };
        const optionQuantity = [
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
            { label: "5", value: "5" },
            { label: "6", value: "6" },
            { label: "7", value: "7" },
            { label: "8", value: "8" },
            { label: "9", value: "9" },
            { label: "10", value: "10" }
        ];
        return (
            <form onSubmit={handleSubmit}>
                <RadioField
                    onChange={handleChange}
                    options={sizesList}
                    value={data.size}
                    error={errors.size}
                    name="size"
                    title="Выберите размер"
                />
                <RadioField
                    onChange={handleChange}
                    options={colorsList}
                    value={data.color}
                    error={errors.color}
                    name="color"
                    title="Выберите размер"
                />
                <div className="product-item-cart d-block d-sm-flex">
                    <SelectField
                        onChange={handleChange}
                        options={optionQuantity}
                        name="quantity"
                        label={null}
                        defaultOption="1"
                        value={data.quantity}
                        css={[null, "product-item-cart__number d-block"]}
                    />
                    <button
                        type="submit"
                        disabled={!isValid}
                        className="btn-pr btn-pr_bg product-item-btn"
                    >
                        Добавить в корзину
                    </button>
                </div>
            </form>
        );
    }
    return "Loading...";
};

ProductChangeForm.propTypes = {
    id: PropTypes.string.isRequired,
    sizes: PropTypes.array,
    colors: PropTypes.array
};

export default ProductChangeForm;

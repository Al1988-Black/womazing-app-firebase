import React, { useEffect, useState } from "react";
import { validator } from "../../../../utils/validator";
import TextField from "../../../common/form/textField";
import SelectField from "../../../common/form/selectField";
import MultiSelectField from "../../../common/form/multiSelectField";
import CheckBoxField from "../../../common/form/checkBoxField";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import {
    getCategories,
    getCategoriesLoadingStatus
} from "../../../../store/categories";
import { getSizes, getSizesLoadingStatus } from "../../../../store/sizes";
import { getColors, getColorsLoadingStatus } from "../../../../store/colors";
import { createProduct } from "../../../../store/products";
import { useHistory } from "react-router-dom";

const ProductCreateSection = () => {
    const isLoadingCategories = useSelector(getCategoriesLoadingStatus());
    const isLoadingColors = useSelector(getColorsLoadingStatus());
    const isLoadingSizes = useSelector(getSizesLoadingStatus());
    const categories = useSelector(getCategories());
    const colors = useSelector(getColors());
    const sizes = useSelector(getSizes());

    if (!isLoadingCategories && !isLoadingColors && !isLoadingSizes) {
        const history = useHistory();
        const [data, setData] = useState({
            name: "",
            image: "",
            category: "",
            price: "",
            discount: "",
            colors: [],
            sizes: [],

            isNew: false
        });

        const categoriesList = categories.map((c) => ({
            label: c.name,
            value: c._id
        }));

        const colorsList = colors.map((c) => ({
            label: c.name,
            value: c._id
        }));

        const sizesList = sizes.map((s) => ({
            label: s.name,
            value: s._id
        }));

        const [errors, setErrors] = useState({});

        const handleChange = (target) => {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        };
        const validatorConfig = {
            name: {
                isRequired: {
                    message: "?????? ?????????????????????? ?????? ????????????????????"
                },
                min: {
                    message: "?????? ???????????? ???????????????? ?????????????? ???? 3 ????????????????",
                    value: 3
                }
            },
            image: {
                isRequired: {
                    message: "URL ???????????????? ???????????????????? ?????? ????????????????????"
                }
            },
            price: {
                isRequired: {
                    message: "???????? ?????????????????????? ?????? ????????????????????"
                },
                isOnlyDigit: {
                    message: "???????? co?????????? ???????????? ???? ??????????"
                }
            },
            discount: {
                isRequired: {
                    message: "C?????????? ?????????????????????? ?????? ????????????????????"
                },
                isOnlyDigit: {
                    message: "C?????????? co?????????? ???????????? ???? ??????????"
                }
            },
            category: {
                isRequired: {
                    message: "?????????????????????? ???????????????? ???????? ??????????????????"
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
        const dispatch = useDispatch();
        const handleSubmit = (e) => {
            e.preventDefault();
            const isValid = validate();
            if (!isValid) return;
            const idProduct = nanoid();
            const newData = {
                _id: idProduct,
                ...data,
                price: Number(data.price),
                discount: Number(data.discount),
                colors: data.colors.map((c) => c.value),
                sizes: data.sizes.map((c) => c.value)
            };
            dispatch(createProduct(newData));
            history.push("/shop");
        };
        return (
            <section className="product-craete">
                <div className="container">
                    <div className="row">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="??????"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="URL ????????????????"
                                name="image"
                                value={data.image}
                                onChange={handleChange}
                                error={errors.image}
                            />
                            <TextField
                                label="???????? ????????????"
                                name="price"
                                value={data.price}
                                onChange={handleChange}
                                error={errors.price}
                            />
                            <TextField
                                label="C?????????? ???? ??????????"
                                name="discount"
                                value={data.discount}
                                onChange={handleChange}
                                error={errors.discount}
                            />
                            <SelectField
                                label="???????????? ??????????????????"
                                defaultOption="Choose..."
                                options={categoriesList}
                                name="category"
                                onChange={handleChange}
                                value={data.category}
                                error={errors.category}
                            />
                            <MultiSelectField
                                options={colorsList}
                                onChange={handleChange}
                                defaultValue={data.qualities}
                                name="colors"
                                label="???????????????? ?????????? ????????????"
                            />
                            <MultiSelectField
                                options={sizesList}
                                onChange={handleChange}
                                defaultValue={data.qualities}
                                name="sizes"
                                label="???????????????? ?????????????? ????????????"
                            />
                            <CheckBoxField
                                value={data.isNew}
                                onChange={handleChange}
                                name="isNew"
                                error={errors.isNew}
                            >
                                ?????????? ???????????????? ????????????????
                            </CheckBoxField>
                            <button
                                className="form__btn btn-pr btn-pr_bg mb-3"
                                type="submit"
                                disabled={!isValid}
                            >
                                ?????????????? ??????????
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
    return "Loading";
};

export default ProductCreateSection;

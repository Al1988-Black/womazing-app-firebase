import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ options, name, onChange, value, title, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="product-change">
            <h4 className="product-change__title">{title}</h4>
            <ul className="change d-flex justify-content-center justify-content-lg-start">
                {options.map((option) => (
                    <li
                        className="change__item"
                        key={option.name + "_" + option.value}
                    >
                        <div className={"change__btn-" + name + "-radio"}>
                            <input
                                className={"change__btn-" + name + "-input"}
                                type="radio"
                                name={name}
                                id={option.name + "_" + option.value}
                                checked={option.value === value}
                                onChange={handleChange}
                                value={option.value}
                            />
                            <label
                                className={"change__btn-" + name + "-label"}
                                htmlFor={option.name + "_" + option.value}
                                style={{
                                    background: option.color ? option.color : ""
                                }}
                            >
                                {(name === "size" && option.label
                                    ? option.label
                                    : "") || ""}
                            </label>
                        </div>
                    </li>
                ))}
            </ul>
            {error && (
                <div
                    style={{
                        color: "red"
                    }}
                >
                    {error}
                </div>
            )}
        </div>
    );
};

RadioField.propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    color: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    error: PropTypes.string,
    title: PropTypes.string
};
export default RadioField;

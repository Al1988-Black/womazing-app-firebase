import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name: nameCheckbox, onChange, value, children, error, css }) => {
    const handleChange = ({ target }) => {
        onChange({ name: nameCheckbox, value: !value });
    };
    const getInputClasses = () => {
        return "form-check-input" + (error ? " is-invalid" : "");
    };
    return (
        <div className={css[0] || "form-check"}>
            <input
                className={css[1] || getInputClasses()}
                type="checkbox"
                id={nameCheckbox}
                checked={value}
                onChange={handleChange}
                value=""
            />
            <label className={css[2] || "form-check-label"} htmlFor={nameCheckbox}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

CheckBoxField.defaultProps = {
    css: ""
};

CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    error: PropTypes.string,
    css: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};

export default CheckBoxField;

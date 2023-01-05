import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    value,
    label,
    onChange,
    defaultOption,
    options,
    name,
    error,
    css
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;

    return (
        <div className={css[0] || "mb-4"}>
            {label && <label htmlFor={name}>{label}</label>}
            <select
                className={css[1] || getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray.length > 0 &&
                    optionsArray.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
SelectField.defaultProps = {
    css: ""
};

SelectField.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.string,
    css: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SelectField;

import React from "react";
import PropTypes from "prop-types";

const SelectSort = ({
    value,
    label,
    onChange,
    defaultOption,
    options,
    name
}) => {
    const handleChange = ({ target }) => {
        onChange(target.value);
    };

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;
    return (
        <div className={"mb-4"}>
            {label && (
                <label htmlFor={name} className="d-block mb-1">
                    {label}
                </label>
            )}
            <select id={name} name={name} value={value} onChange={handleChange}>
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
        </div>
    );
};

SelectSort.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SelectSort;

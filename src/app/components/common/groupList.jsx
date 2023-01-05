import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem,
    onClearFilter
}) => {
    return (
        <>
            <button
                type="button"
                className={
                    "btn-shop d-block" +
                    (!selectedItem ? " btn-shop_active" : "")
                }
                onClick={onClearFilter}
            >
                Все
            </button>
            {Array.isArray(items)
                ? items.map((item) => (
                      <button
                          key={item[valueProperty]}
                          type="button"
                          className={
                              "btn-shop d-block" +
                              (item === selectedItem ? " btn-shop_active" : "")
                          }
                          onClick={() => onItemSelect(item)}
                      >
                          {item[contentProperty]}
                      </button>
                  ))
                : Object.keys(items).map((item) => (
                      <button
                          key={items[item][valueProperty]}
                          type="button"
                          className={
                              "btn-shop d-block" +
                              (item === selectedItem ? " btn-shop_active" : "")
                          }
                          onClick={() => onItemSelect(items[item])}
                      >
                          Пальто
                      </button>
                  ))}
        </>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    onClearFilter: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;

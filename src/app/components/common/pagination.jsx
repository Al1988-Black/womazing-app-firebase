import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    return (
        <>
            {pages.map((page) => (
                <button
                    type="button"
                    key={"page_" + page}
                    onClick={() => onPageChange(page)}
                    className={
                        "btn-shop btn-shop_page d-block" +
                        (currentPage === page ? " btn-shop_active" : "")
                    }
                >
                    {page}
                </button>
            ))}
            {currentPage < pages.length && (
                <button
                    type="button"
                    className="btn-shop_arrow d-block"
                    onClick={() => onPageChange(currentPage + 1)}
                ></button>
            )}
        </>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Pagination;

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getColorById, getColorsLoadingStatus } from "../../store/colors";
import { getSizeById, getSizesLoadingStatus } from "../../store/sizes";
import { useSelector } from "react-redux";

const SaleProductLine = ({
    idPr,
    categoryPr,
    namePr,
    quantityPr,
    sizePr,
    colorPr,
    imagePr,
    pricePr,
    discountPr
}) => {
    const isLoadingColor = useSelector(getColorsLoadingStatus());
    const isLoadingSize = useSelector(getSizesLoadingStatus());
    const color = useSelector(getColorById(colorPr));
    const size = useSelector(getSizeById(sizePr));

    if (!isLoadingColor && !isLoadingSize) {
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="separation_cart-table" />
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-3 col-lg-5 d-block d-lg-flex align-items-lg-center">
                        <Link
                            to={`/shop/${categoryPr}/${idPr}`}
                            className="d-block cart-link-product"
                        >
                            <img
                                src={require(`/src/app/${imagePr}`)}
                                alt={namePr}
                                className="d-block cart-img"
                            />
                        </Link>
                        <div>
                            <p className="cart-text-product d-none d-sm-block">
                                {namePr}
                            </p>
                            <p className="cart-text-product d-none d-sm-block">
                                Размер, {size.name}
                            </p>
                            <p className="cart-text-product d-none d-sm-block">
                                Цв., {color.name}
                            </p>
                        </div>
                    </div>
                    <div className="col-3 col-lg-2">
                        <span className="cart-table-price">
                            $
                            {discountPr
                                ? pricePr - (pricePr * discountPr) / 100
                                : pricePr}
                        </span>
                    </div>
                    <div className="col-3 col-lg-2">
                        <p>{quantityPr}</p>
                    </div>
                    <div className="col-3 offset-0 offset-lg-1 col-lg-1">
                        <span className="cart-table-price cart-table-price_total">
                            $
                            {discountPr
                                ? (pricePr - (pricePr * discountPr) / 100) *
                                  quantityPr
                                : pricePr * quantityPr}
                        </span>
                    </div>
                </div>
            </>
        );
    }
    return "Loading...";
};

SaleProductLine.propTypes = {
    idPr: PropTypes.string.isRequired,
    categoryPr: PropTypes.string.isRequired,
    namePr: PropTypes.string.isRequired,
    quantityPr: PropTypes.number.isRequired,
    sizePr: PropTypes.string,
    colorPr: PropTypes.string,
    imagePr: PropTypes.string.isRequired,
    pricePr: PropTypes.number.isRequired,
    discountPr: PropTypes.number.isRequired
};

export default SaleProductLine;

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getColorById, getColorsLoadingStatus } from "../../store/colors";
import { getSizeById, getSizesLoadingStatus } from "../../store/sizes";
import { getProductId } from "../../store/products";
import { deleteCart } from "../../store/carts";

const CartProductLine = ({
    id,
    idProduct,
    quantityProduct,
    sizeId,
    colorId
}) => {
    const dispatch = useDispatch();
    const removeCart = (id) => dispatch(deleteCart(id));
    const isLoadingColor = useSelector(getColorsLoadingStatus());
    const isLoadingSize = useSelector(getSizesLoadingStatus());
    const product = useSelector(getProductId(idProduct));
    const color = useSelector(getColorById(colorId));
    const size = useSelector(getSizeById(sizeId));
    return (
        <>
            {!isLoadingColor && !isLoadingSize ? (
                <>
                    <div className="row">
                        <div className="col-12">
                            <div className="separation_cart-table" />
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-3 col-lg-5 d-block d-lg-flex align-items-lg-center">
                            <button
                                type="button"
                                className="cart-delete d-block"
                                onClick={() => removeCart(id)}
                            ></button>
                            <Link
                                to={`/shop/${product.category}/${product._id}`}
                                className="d-block cart-link-product"
                            >
                                <img
                                    src={require(`/src/app/${product.image}`)}
                                    alt={product.name}
                                    className="d-block cart-img"
                                />
                            </Link>
                            <div>
                                <p className="cart-text-product d-none d-sm-block">
                                    {product.name}
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
                                {product.discount
                                    ? product.price -
                                      (product.price * product.discount) / 100
                                    : product.price}
                            </span>
                        </div>
                        <div className="col-3 col-lg-2">
                            <p>{String(quantityProduct)}</p>
                        </div>
                        <div className="col-3 offset-0 offset-lg-1 col-lg-1">
                            <span className="cart-table-price cart-table-price_total">
                                $
                                {(product.discount
                                    ? product.price -
                                      (product.price * product.discount) / 100
                                    : product.price) * quantityProduct}
                            </span>
                        </div>
                    </div>
                </>
            ) : (
                "Loading"
            )}
        </>
    );
};

CartProductLine.propTypes = {
    id: PropTypes.string.isRequired,
    idProduct: PropTypes.string.isRequired,
    quantityProduct: PropTypes.number.isRequired,
    sizeId: PropTypes.string.isRequired,
    colorId: PropTypes.string.isRequired
};

export default CartProductLine;

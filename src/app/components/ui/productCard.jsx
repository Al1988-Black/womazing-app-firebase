import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
            <div className="product product_shop product_shop-1">
                <div className="product__block mx-auto">
                    <img
                        src={require(`/src/app/${product.image}`)}
                        alt={product.name}
                        className="product__img d-block"
                    />
                    <Link
                        to={`/shop/${product.category}/${product._id}`}
                        className="product__overlay"
                    ></Link>
                </div>
                <button type="button" className="product__btn">
                    <h4 className="product__title d-flex justify-content-center">
                        {product.name}
                    </h4>
                    <div className="product__price d-flex justify-content-center">
                        {product.discount ? (
                            <>
                                <p className="product__original-price">
                                    <span className="product__corect-price d-block"></span>
                                    ${product.price}
                                </p>
                                <p className="product__discont-price d-block">
                                    $
                                    {product.price -
                                        (product.price * product.discount) /
                                            100}
                                </p>
                            </>
                        ) : (
                            <p className="product__original-price">
                                ${product.price}
                            </p>
                        )}
                    </div>
                </button>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductCard;

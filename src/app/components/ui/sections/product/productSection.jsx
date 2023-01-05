import React from "react";
import PropTypes from "prop-types";
import ProductChangeForm from "../../productChangeForm";
const ProductSection = ({ product }) => {
    return (
        <section className="product-section" id="product-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-start">
                        <div className="product-item-photo">
                            <img
                                src={require(`/src/app/${product.image}`)}
                                alt="девушка фото"
                                className="product-item-photo__img"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-start">
                        <div className="product-item">
                            <div className="product-item-price d-flex align-items-center justify-content-center justify-content-lg-start">
                                {product.discount !== 0 && (
                                    <p className="product-item-price__size_discont d-block">
                                        {product.price -
                                            (product.price * product.discount) /
                                                100}
                                        $
                                    </p>
                                )}
                                <p className="product-item-price__size d-block">
                                    {product.discount !== 0 && (
                                        <span className="product-item-price__size_corect d-block"></span>
                                    )}
                                    {product.price}$
                                </p>
                            </div>
                            <ProductChangeForm
                                id={product._id}
                                sizes={product.sizes}
                                colors={product.colors}
                                price={product.price}
                                discount={product.discount}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
ProductSection.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductSection;

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const OfferProductSection = ({ category, productName }) => {
    return (
        <section className="offer-page offer-page_product">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="offer-page_title">{productName}</h1>
                        <div className="navigation-block d-none d-lg-flex">
                            <Link
                                to="/"
                                className="navigation-block__link d-block"
                            >
                                Главная
                            </Link>
                            <span className="navigation-block__line d-block"></span>
                            <Link
                                to={"/shop/" + category._id}
                                className="navigation-block__link d-block"
                            >
                                {category.name}
                            </Link>
                            <span className="navigation-block__line d-block"></span>
                            <span className="navigation-block__text d-block">
                                {productName}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
OfferProductSection.propTypes = {
    category: PropTypes.object,
    productName: PropTypes.string
};

export default OfferProductSection;

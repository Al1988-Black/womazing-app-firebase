import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const OfferSection = ({ pageName }) => {
    return (
        <section className="offer-page">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="offer-page_title">{pageName}</h1>
                        <div className="navigation-block d-none d-lg-flex">
                            <Link
                                to="/"
                                className="navigation-block__link d-block"
                            >
                                Главная
                            </Link>
                            <span className="navigation-block__line d-block"></span>
                            <span className="navigation-block__text d-block">
                                {pageName}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

OfferSection.propTypes = {
    pageName: PropTypes.string
};

export default OfferSection;

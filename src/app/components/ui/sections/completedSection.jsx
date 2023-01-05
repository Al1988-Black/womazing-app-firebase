import React from "react";
import { Link } from "react-router-dom";

const CompletedSection = () => {
    return (
        <section className="completed" id="completed">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-lg-8  d-flex align-items-center align-items-sm-start flex-column flex-sm-row">
                        <span className="d-block ok-icon"></span>
                        <div className="completed-block">
                            <h3 className="completed-block__title mini_title">
                                Заказ успешно оформлен
                            </h3>
                            <p className="completed-block__text">
                                Мы свяжемся с вами в ближайшее время!
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-end">
                        <Link
                            to="/shop"
                            className="btn-pr d-block btn-pr_completed"
                        >
                            Перейти на главную
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompletedSection;

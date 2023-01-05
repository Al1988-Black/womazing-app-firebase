import React from "react";
import { Link } from "react-router-dom";

const BrandSection = () => {
    const brand1 = "brand/brand1.jpg";
    const brand2 = "brand/brand2.jpg";
    return (
        <section className="brand" id="brand">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-lg-5 d-flex justify-content-center justify-content-lg-start">
                        <div className="brand-photo brand-photo_up">
                            <img
                                src={require(`/src/app/img/${brand2}`)}
                                alt="девушка фото"
                                className="brand-photo__img"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-lg-7 d-flex justify-content-center justify-content-lg-start">
                        <div className="brand-text-block brand-text-block_up">
                            <h3 className="brand-text-block__title mini_title">
                                Идея и женщина
                            </h3>
                            <p className="brand-text-block__text">
                                Womazing была основана в 2010-ом и стала одной
                                из самых успешных компаний нашей страны. Как и
                                многие итальянские фирмы, Womazing остаётся
                                семейной компанией, хотя ни один из членов семьи
                                не является модельером.
                            </p>
                            <p className="brand-text-block__text">
                                Мы действуем по успешной формуле, прибегая к
                                услугам известных модельеров для создания своих
                                коллекций. Этот метод был описан критиком моды
                                Колином Макдауэллом как форма дизайнерского
                                со-творчества, характерная для ряда итальянских
                                prêt-a-porter компаний.
                            </p>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="separation_brand  d-none d-lg-block"></div>
                    </div>
                    <div className="order-1 order-lg-0 col-12 col-lg-7 d-flex justify-content-center justify-content-lg-start">
                        <div className="brand-text-block brand-text-block_down">
                            <h3 className="brand-text-block__title mini_title">
                                Магия в деталях
                            </h3>
                            <p className="brand-text-block__text">
                                Первый магазин Womazing был открыт в маленьком
                                городке на севере страны в 2010-ом году. Первая
                                коллекция состояла из двух пальто и костюма,
                                которые были копиями парижских моделей.
                            </p>
                            <p className="brand-text-block__text">
                                Несмотря на то, что по образованию
                                основательница была адвокатом, ее семья всегда
                                была тесно связана с шитьём (прабабушка
                                основательницы шила одежду для женщин, а мать
                                основала профессиональную школу кроя и шитья).
                                Стремление производить одежду для масс несло в
                                себе большие перспективы, особенно в то время,
                                когда высокая мода по-прежнему доминировала, а
                                рынка качественного prêt-a-porter попросту не
                                существовало.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5 d-flex justify-content-center justify-content-lg-end">
                        <div className="brand-photo">
                            <img
                                src={require(`/src/app/img/${brand1}`)}
                                alt="девушка фото"
                                className="brand-photo__img"
                            />
                        </div>
                    </div>
                    <div className="order-2 order-lg-0 col-12 d-none d-lg-block">
                        <div className="separation_brand"></div>
                    </div>
                    <div className="col-12 order-3 order-lg-0">
                        <Link
                            to="/shop"
                            className="btn-pr btn-pr_bg btn-pr_brand d-block mx-auto"
                        >
                            Перейти в магазин
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandSection;

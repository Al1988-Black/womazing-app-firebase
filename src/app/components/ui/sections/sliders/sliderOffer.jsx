import React, { useState } from "react";
import { Link } from "react-router-dom";

const SliderOffer = () => {
    const slides = [
        {
            _id: "29offerslydefgeed471818",
            img_left: "img/shop/product1.jpg",
            img_centr: "img/shop/product2.jpg",
            img_right: "img/shop/product3.jpg",
            offer: "Новые поступления в этом сезоне",
            text: " Утонченные сочетания и бархатные оттенки - вот то, что вы искали в этом сезоне. Время исследовать."
        },
        {
            _id: "29offerslydefgeed471820",
            img_left: "img/shop/product4.jpg",
            img_centr: "img/shop/product5.jpg",
            img_right: "img/shop/product6.jpg",
            offer: "Что-то новенькое. Мы заждались тебя.",
            text: "Надоело искать себя в сером городе? Настало время новых идей, свежих красок и вдохновения с Womazing!"
        },
        {
            _id: "29offerslydefgeed471814",
            img_left: "img/shop/product7.jpg",
            img_centr: "img/shop/product8.jpg",
            img_right: "img/shop/product9.jpg",
            offer: "Включай новый сезон с WOMAZING",
            text: "Мы обновили ассортимент - легендарные коллекции и новинки от отечественных дизайнеров."
        }
    ];
    const [index, setIndex] = useState(0);
    const indexUpdate = () => {
        setIndex((prevState) => {
            if (prevState < slides.length - 1) {
                return prevState + 1;
            } else {
                return 0;
            }
        });
    };
    setTimeout(indexUpdate, 3000);
    return (
        <section className="offer-section">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-7">
                        <div className="offer-slider">
                            <div
                                className={
                                    "offer" +
                                    (index === 0 ? " d-block" : " d-none")
                                }
                            >
                                <h1 className="offer__title offer__title_active">
                                    {slides[0].offer}
                                </h1>
                                <div className="offer__block">
                                    <p className="offer__text offer__text_active">
                                        {slides[0].text}
                                    </p>
                                    <div className="offer__block-link justify-content-center d-flex justify-content-lg-end">
                                        <a
                                            className="offer__block-link-down"
                                            href="#new"
                                        ></a>
                                        <Link
                                            to="/shop"
                                            className="btn-pr btn-pr_bg offer__block-link-shop"
                                        >
                                            Открыть магазин
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={
                                    "offer" +
                                    (index === 1 ? " d-block" : " d-none")
                                }
                            >
                                <h1 className="offer__title offer__title_active">
                                    {slides[1].offer}
                                </h1>
                                <div className="offer__block">
                                    <p className="offer__text offer__text_active">
                                        {slides[1].text}
                                    </p>
                                    <div className="offer__block-link justify-content-center d-flex justify-content-lg-end">
                                        <a
                                            className="offer__block-link-down"
                                            href="#new"
                                        ></a>
                                        <Link
                                            to="/shop"
                                            className="btn-pr btn-pr_bg offer__block-link-shop"
                                        >
                                            Открыть магазин
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={
                                    "offer" +
                                    (index === 2 ? " d-block" : " d-none")
                                }
                            >
                                <h1 className="offer__title offer__title_active">
                                    {slides[2].offer}
                                </h1>
                                <div className="offer__block">
                                    <p className="offer__text offer__text_active">
                                        {slides[2].text}
                                    </p>
                                    <div className="offer__block-link justify-content-center d-flex justify-content-lg-end">
                                        <a
                                            className="offer__block-link-down"
                                            href="#new"
                                        ></a>
                                        <Link
                                            to="/shop"
                                            className="btn-pr btn-pr_bg offer__block-link-shop"
                                        >
                                            Открыть магазин
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5 d-flex justify-content-center justify-content-lg-end">
                        <div
                            className={
                                "offer-img" +
                                (index === 0 ? " d-block" : " d-none")
                            }
                        >
                            <div className="offer-img-slider">
                                <div className="offer-img-wrapper">
                                    <img
                                        src={require(`/src/app/${slides[0].img_centr}`)}
                                        alt="фото1"
                                        className="offer-img__photo"
                                    />
                                </div>
                            </div>
                            <img
                                src={require(`/src/app/${slides[0].img_left}`)}
                                alt="фото4"
                                className="offer-img__smallphoto-left d-none d-md-block"
                                id="offer-img__smallphoto-left"
                            />
                            <img
                                src={require(`/src/app/${slides[0].img_right}`)}
                                alt="фото5"
                                className="offer-img__smallphoto-right d-none d-md-block"
                                id="offer-img__smallphoto-right"
                            />
                        </div>
                        <div
                            className={
                                "offer-img" +
                                (index === 1 ? " d-block" : " d-none")
                            }
                        >
                            <div className="offer-img-slider">
                                <div className="offer-img-wrapper">
                                    <img
                                        src={require(`/src/app/${slides[1].img_centr}`)}
                                        alt="фото1"
                                        className="offer-img__photo"
                                    />
                                </div>
                            </div>
                            <img
                                src={require(`/src/app/${slides[1].img_left}`)}
                                alt="фото4"
                                className="offer-img__smallphoto-left d-none d-md-block"
                                id="offer-img__smallphoto-left"
                            />
                            <img
                                src={require(`/src/app/${slides[1].img_right}`)}
                                alt="фото5"
                                className="offer-img__smallphoto-right d-none d-md-block"
                                id="offer-img__smallphoto-right"
                            />
                        </div>
                        <div
                            className={
                                "offer-img" +
                                (index === 2 ? " d-block" : " d-none")
                            }
                        >
                            <div className="offer-img-slider">
                                <div className="offer-img-wrapper">
                                    <img
                                        src={require(`/src/app/${slides[2].img_centr}`)}
                                        alt="фото1"
                                        className="offer-img__photo"
                                    />
                                </div>
                            </div>
                            <img
                                src={require(`/src/app/${slides[2].img_left}`)}
                                alt="фото4"
                                className="offer-img__smallphoto-left d-none d-md-block"
                                id="offer-img__smallphoto-left"
                            />
                            <img
                                src={require(`/src/app/${slides[2].img_right}`)}
                                alt="фото5"
                                className="offer-img__smallphoto-right d-none d-md-block"
                                id="offer-img__smallphoto-right"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SliderOffer;

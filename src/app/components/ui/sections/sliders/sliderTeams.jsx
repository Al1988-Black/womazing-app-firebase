import React, { useState } from "react";
import { Link } from "react-router-dom";

const SliderTeams = () => {
    const slides = [
        {
            _id: "27teamslidefgeed471931",
            img: "https://frisurexperte.de/wp-content/uploads/2022/03/Profi-Friseurschere-Test-Vergleich-768x513.jpg"
        },
        {
            _id: "27teamslidefgeed471932",
            img: "https://thumb.tildacdn.com/tild6163-3532-4636-b265-376235363963/-/resize/520x/-/format/webp/simon-maage-tXiMrX3G.jpg"
        },
        {
            _id: "27teamslidefgeed471933",
            img: "https://www.thelashlounge.com/wp-content/uploads/2019/08/8D2FD7D4-1FE6-408C-9987-C90A0BB99CC3-1.jpeg"
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
    setTimeout(indexUpdate, 5000);
    return (
        <section className="team" id="team">
            <div className="container">
                <div className="row">
                    <div className="col12">
                        <h2 className="section_title section_title-team">
                            Команда мечты Womazing
                        </h2>
                    </div>
                    <div className="col-12 d-flex justify-content-center justify-content-xl-start col-xl-9">
                        <div className="slider-team">
                            <div
                                className={
                                    "slider-team__slide" +
                                    (index === 0 ? " d-block" : " d-none")
                                }
                            >
                                <img
                                    src={slides[0].img}
                                    alt="Команда 1"
                                    className="slider-team__img"
                                />
                            </div>
                            <div
                                className={
                                    "slider-team__slide" +
                                    (index === 1 ? " d-block" : " d-none")
                                }
                            >
                                <img
                                    src={slides[1].img}
                                    alt="Команда 1"
                                    className="slider-team__img"
                                />
                            </div>
                            <div
                                className={
                                    "slider-team__slide" +
                                    (index === 2 ? " d-block" : " d-none")
                                }
                            >
                                <img
                                    src={slides[2].img}
                                    alt="Команда 1"
                                    className="slider-team__img"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 justify-content-center justify-content-xl-start col-xl-3">
                        <div className="block-team">
                            <h3 className="block-team__title mini_title">
                                Для каждой
                            </h3>
                            <p className="block-team__text">
                                Каждая девушка уникальна. Однако, мы схожи в
                                миллионе мелочей.
                            </p>
                            <p className="block-team__text">
                                Womazing ищет эти мелочи и создает прекрасные
                                вещи, которые выгодно подчеркивают достоинства
                                каждой девушки.
                            </p>
                            <Link to="/brand" className="block-team__link">
                                Подробнее о бренде
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SliderTeams;

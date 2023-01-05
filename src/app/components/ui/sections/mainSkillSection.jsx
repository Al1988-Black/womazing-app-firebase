import React from "react";

const MainSkillSection = () => {
    return (
        <section className="skills" id="skills">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="section_title section_title-skills">
                                    Что для нас важно
                                </h2>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="skill skill_quality">
                                    <h3 className="skill__title mini_title">
                                        Качество
                                    </h3>
                                    <p className="skill__text">
                                        Наши профессионалы работают на лучшем
                                        оборудовании для пошива одежды
                                        беспрецедентного качества
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="skill skill_speed">
                                    <h3 className="skill__title mini_title">
                                        Скорость
                                    </h3>
                                    <p className="skill__text">
                                        Благодаря отлаженной системе в Womazing
                                        мы можем отшивать до 20-ти единиц
                                        продукции в наших собственных цехах
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="skill skill_charge">
                                    <h3 className="skill__title mini_title">
                                        Ответственность
                                    </h3>
                                    <p className="skill__text">
                                        Мы заботимся о людях и планете.
                                        Безотходное производство и комфортные
                                        условия труда - все это Womazing
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
    );
};

export default MainSkillSection;

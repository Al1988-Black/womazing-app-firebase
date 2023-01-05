import React from "react";
import { Link } from "react-router-dom";

const FooterLinks = () => {
    return (
        <div className="footer-links">
            <Link to="/" className="footer-links__logo logo d-block" />
            <span className="footer-links__text d-block">
                © Все права защищены
            </span>
            <a href="#" className="footer-links__link d-block">
                Политика конфиденциальности
            </a>
            <a href="#" className="footer-links__link d-block">
                Публичная оферта
            </a>
        </div>
    );
};

export default FooterLinks;

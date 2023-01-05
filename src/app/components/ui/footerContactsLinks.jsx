import React from "react";

const FooterContactsLinks = () => {
    return (
        <ul className="footer-contact">
            <li className="footer-contact__item footer-contact__item_tel d-lg-flex justify-content-lg-end">
                <a
                    href="tel:+74958235412"
                    className="footer-contact__link d-block"
                >
                    +7 (495) 823-54-12
                </a>
            </li>
            <li className="footer-contact__item footer-contact__item_mail d-lg-flex justify-content-lg-end">
                <a
                    href="mailto:hello@womazing.com"
                    className="footer-contact__link d-block"
                >
                    hello@womazing.com
                </a>
            </li>
            <li className="footer-contact__item footer-contact__item_social d-flex d-lg-flex justify-content-lg-end">
                {/* <!--noindex--> */}
                <a
                    href="https://twitter.com/?lang=ru"
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="footer-contact__social footer-contact__social_twitter d-block"
                />
                {/* <!--noindex--> */}
            </li>
            <li className="footer-contact__item-pay d-flex justify-content-lg-end">
                <span className="footer-contact__pay d-block"> </span>
            </li>
        </ul>
    );
};

export default FooterContactsLinks;

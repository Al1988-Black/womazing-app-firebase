import React from "react";
import FooterContactsLinks from "./footerContactsLinks";
import FooterLinks from "./footerLinks";
import FooterNavLinks from "./footerNavLinks";
const Footer = () => {
    return (
        <footer className="footer" id="footer">
            <div className="container">
                <div className="row flex-column flex-sm-row">
                    <div className="col-12 d-flex justify-content-center justify-content-xl-start col-lg-3">
                        <FooterLinks />
                    </div>
                    <div className="col-12 d-flex justify-content-center justify-content-lg-start col-lg-6">
                        <FooterNavLinks />
                    </div>
                    <div className="col-12 d-flex justify-content-center justify-content-lg-end col-lg-3">
                        <FooterContactsLinks />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

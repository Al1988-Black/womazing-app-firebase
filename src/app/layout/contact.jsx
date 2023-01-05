import React from "react";
import ContactSection from "../components/ui/sections/contactSection";
import OfferSection from "../components/ui/sections/offerSection";
// import useMockData from "../utils/mockData";

const ContactPage = () => {
    return (
        <main>
            <OfferSection pageName="Контакты" />
            <ContactSection />
        </main>
    );
};

export default ContactPage;

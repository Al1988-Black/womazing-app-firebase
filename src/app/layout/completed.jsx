import React from "react";
import CompletedSection from "../components/ui/sections/completedSection";
import OfferSection from "../components/ui/sections/offerSection";

const CompletedPage = () => {
    return (
        <main>
            <OfferSection pageName="Заказ оформлен" />
            <CompletedSection />
        </main>
    );
};

export default CompletedPage;

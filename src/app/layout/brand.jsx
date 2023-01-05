import React from "react";
import BrandSection from "../components/ui/sections/bandSection";
import OfferSection from "../components/ui/sections/offerSection";

const BrandPage = () => {
    return (
        <main>
            <OfferSection pageName="О бренде" />
            <BrandSection />
        </main>
    );
};

export default BrandPage;

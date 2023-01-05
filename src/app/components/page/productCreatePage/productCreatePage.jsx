import React from "react";
import OfferSection from "../../ui/sections/offerSection";
import ProductCreateSection from "../../ui/sections/product/productCreateSection";

const ProductCreatePage = () => {
    return (
        <>
            <OfferSection pageName="Создание товара" />
            <ProductCreateSection />
        </>
    );
};

export default ProductCreatePage;

import React from "react";
import { useParams } from "react-router-dom";
import OfferProductSection from "../../ui/sections/product/offerProductSection";
import ProductConnectSection from "../../ui/sections/product/productConnectSection";
import ProductSection from "../../ui/sections/product/productSection";
import { useSelector } from "react-redux";
import {
    getProductId,
    getProductsLoadingStatus
} from "../../../store/products";
import {
    getCategoryById,
    getCategoriesLoadingStatus
} from "../../../store/categories";
import { Circles } from "react-loader-spinner";

const ProductPage = () => {
    const { categoryId, productId } = useParams();
    const isLoadingProduct = useSelector(getProductsLoadingStatus());
    const isLoadingCategory = useSelector(getCategoriesLoadingStatus());
    if (isLoadingCategory || isLoadingProduct)
        return (
            <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        );
    const currentCategory = useSelector(getCategoryById(categoryId));
    const product = useSelector(getProductId(productId));
    if (currentCategory && product) {
        return (
            <>
                <OfferProductSection
                    category={currentCategory}
                    productName={product.name}
                />
                <ProductSection product={product} />
                <ProductConnectSection />
            </>
        );
    }
    return "Loading";
};

export default ProductPage;

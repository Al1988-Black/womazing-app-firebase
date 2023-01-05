import React, { useEffect } from "react";
import _ from "lodash";
import ProductCard from "../../productCard";
import { useDispatch, useSelector } from "react-redux";
import {
    getProductsLoadingStatus,
    getProducts,
    loadProductsList
} from "../../../../store/products";

const ProductConnectSection = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadProductsList());
    }, []);
    const products = useSelector(getProducts());
    const isLoadingProducts = useSelector(getProductsLoadingStatus());
    if (isLoadingProducts) {
        return "Loading...";
    }

    const randomTwoIndex = _.shuffle(_.range(1, products.length)).slice(0, 2);
    const twoConnectProduct = [];
    for (const index of randomTwoIndex) {
        twoConnectProduct.push(products[index]);
    }
    return (
        <section className="products-connect" id="products-connect">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="section_title section_title-connect">
                            Связанные товары
                        </h2>
                    </div>
                    {twoConnectProduct.map((p) => (
                        <ProductCard key={p._id} product={p} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductConnectSection;

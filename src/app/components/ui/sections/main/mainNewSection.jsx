import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import ProductCard from "../../productCard";
import { useDispatch, useSelector } from "react-redux";
import {
    loadProductsList,
    getProducts,
    getProductsLoadingStatus
} from "../../../../store/products";

const MainNewSection = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadProductsList);
    }, []);
    const isLoadingProducts = useSelector(getProductsLoadingStatus());
    const products = useSelector(getProducts());

    if (!isLoadingProducts) {
        const newProducts = products.filter((p) => p.isNew);
        if (newProducts && newProducts.length > 4) {
            const randomThreeIndex = _.shuffle(
                _.range(1, newProducts.length)
            ).slice(0, 3);
            const threeNewProduct = [];
            for (const index of randomThreeIndex) {
                threeNewProduct.push(newProducts[index]);
            }
            return (
                <section className="new" id="new">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="section_title section-tittle_new">
                                    Новая коллекция
                                </h2>
                            </div>
                            {threeNewProduct.map((p) => (
                                <ProductCard key={p._id} product={p} />
                            ))}
                            <div className="col-12">
                                <Link
                                    to="/shop"
                                    className="btn-pr btn-pr_new d-block mx-auto"
                                >
                                    Открыть магазин
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
        return (
            <h3>
                Мы скоро ожидаем поступление новых товаров, чуть-чуть подождите
            </h3>
        );
    }
    return "Loading...";
};

export default MainNewSection;

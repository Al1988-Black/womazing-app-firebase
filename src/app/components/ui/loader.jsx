import React, { useState, useEffect } from "react";
import { Watch } from "react-loader-spinner";
import { getCartsLoadingStatus } from "../../store/carts";
import { getCategoriesLoadingStatus } from "../../store/categories";
import { getCitiesLoadingStatus } from "../../store/cities";
import { getColorsLoadingStatus } from "../../store/colors";
import { getOrdersLoadingStatus } from "../../store/orders";
import { getProductsLoadingStatus } from "../../store/products";
import { getPromocodesLoadingStatus } from "../../store/promocodes";
import { getSalesLoadingStatus } from "../../store/sales";
import { getSizesLoadingStatus } from "../../store/sizes";
import { getIsLoadingUsersStatus } from "../../store/users";
import { useSelector } from "react-redux";

const Loader = () => {
    const isLoadingCarts = useSelector(getCartsLoadingStatus());
    const isLoadingCategories = useSelector(getCategoriesLoadingStatus());
    const isLoadingCities = useSelector(getCitiesLoadingStatus());
    const isLoadingColors = useSelector(getColorsLoadingStatus());
    const isLoadingOrders = useSelector(getOrdersLoadingStatus());
    const isLoadingProducts = useSelector(getProductsLoadingStatus());
    const isLoadingPromocodes = useSelector(getPromocodesLoadingStatus());
    const isLoadingSales = useSelector(getSalesLoadingStatus());
    const isLoadingSizes = useSelector(getSizesLoadingStatus());
    const isLoadingUsers = useSelector(getIsLoadingUsersStatus());

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (
            !isLoadingCategories &&
            !isLoadingCities &&
            !isLoadingColors &&
            !isLoadingProducts &&
            !isLoadingPromocodes &&
            !isLoadingSizes &&
            !isLoadingUsers &&
            isLoadingCarts &&
            isLoadingOrders &&
            isLoadingSales
        ) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        } else {
            setIsLoading(true);
        }
        if (
            !isLoadingCategories &&
            !isLoadingCities &&
            !isLoadingColors &&
            !isLoadingProducts &&
            !isLoadingPromocodes &&
            !isLoadingSizes &&
            !isLoadingUsers &&
            !isLoadingCarts &&
            !isLoadingOrders &&
            !isLoadingSales
        ) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }, [
        isLoadingCarts,
        isLoadingCategories,
        isLoadingCities,
        isLoadingColors,
        isLoadingOrders,
        isLoadingProducts,
        isLoadingPromocodes,
        isLoadingSales,
        isLoadingSizes,
        isLoadingUsers
    ]);

    if (isLoading) {
        return (
            <div className="wrapper-loader">
                <div>
                    <div className="block-loader">
                        <Watch
                            height="100"
                            width="100"
                            radius="48"
                            color="#6e9c9f"
                            ariaLabel="watch-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default Loader;

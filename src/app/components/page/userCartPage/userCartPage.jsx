import React, { useEffect } from "react";
import CartSection from "../../ui/sections/cartSection";
import OrderSection from "../../ui/sections/orderSection";
import OfferSection from "../../ui/sections/offerSection";
import { useSelector, useDispatch } from "react-redux";
import {
    getCarts,
    getCartsLoadingStatus,
    loadCartsList
} from "../../../store/carts";
import { getProductsLoadingStatus, getProducts } from "../../../store/products";
import { useParams, useHistory } from "react-router-dom";

const UserCartPage = () => {
    const { userId, options } = useParams();
    const history = useHistory();
    const switchFormType = () => {
        history.push(`/users/${userId}/ordering`);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCartsList(userId));
    }, []);
    const isLoadingCart = useSelector(getCartsLoadingStatus());
    const isLoadingProduct = useSelector(getProductsLoadingStatus());
    const cartList = useSelector(getCarts());
    const productList = useSelector(getProducts());
    if (isLoadingCart || isLoadingProduct) return "Loading";
    const cartProductArray = (carts, products) => {
        if (carts && products) {
            const arraySubPrice = [];
            for (const cart of carts) {
                for (const product of products) {
                    if (cart.productId === product._id) {
                        arraySubPrice.push({
                            cartId: cart._id,
                            quantity: cart.quantity,
                            productId: product._id,
                            category: product.category,
                            name: product.name,
                            image: product.image,
                            color: cart.color,
                            size: cart.size,
                            price: product.price,
                            discount: product.discount
                        });
                        break;
                    }
                }
            }
            return arraySubPrice;
        }
        return [];
    };

    const cartProductList = cartProductArray(cartList, productList);
    const subTotalPrice =
        cartProductList.length > 0
            ? cartProductList.reduce((acc, cart) => {
                  return (
                      acc +
                      cart.quantity *
                          (cart?.price - (cart?.price * cart?.discount) / 100)
                  );
              }, 0)
            : 0;

    return (
        <>
            {!isLoadingCart && !isLoadingProduct ? (
                <main>
                    {options === "ordering" && (
                        <>
                            <OfferSection pageName="Оформление заказа" />
                            <OrderSection
                                cartProductList={cartProductList}
                                subTotalPrice={subTotalPrice}
                            />
                        </>
                    )}
                    {options === "cart" && (
                        <>
                            <OfferSection pageName="Корзина" />
                            <CartSection
                                switchFormType={switchFormType}
                                cartList={cartList}
                                subTotalPrice={subTotalPrice}
                            />
                        </>
                    )}
                </main>
            ) : (
                "Loading..."
            )}
        </>
    );
};

export default UserCartPage;

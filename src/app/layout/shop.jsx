import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductListPage from "../components/page/productListPage";
import ProductPage from "../components/page/productPage";
import { getCurrentUserData, getIsLoggedIn } from "../store/users";
import ShopLoader from "../components/ui/hoc/shopLoader";
import ProductCreatePage from "../components/page/productCreatePage";

const Shoplayout = () => {
    const isLogin = useSelector(getIsLoggedIn());
    const currentUserData = useSelector(getCurrentUserData());
    const isAdmin = currentUserData?.admin;
    return (
        <ShopLoader>
            <main>
                <Switch>
                    {isAdmin && (
                        <Route
                            path="/shop/create"
                            exact
                            component={ProductCreatePage}
                        />
                    )}
                    <Route
                        path="/shop/:categoryId?"
                        exact
                        component={ProductListPage}
                    />
                    {isLogin && (
                        <Route
                            path="/shop/:categoryId/:productId"
                            exact
                            component={ProductPage}
                        />
                    )}
                    <Redirect from="*" to="/shop" />
                </Switch>
            </main>
        </ShopLoader>
    );
};

export default Shoplayout;

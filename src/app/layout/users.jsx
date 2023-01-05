import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import UserPage from "../components/page/userPage";
// import UserEditPage from "../components/page/userEditPage";
import UsersListPage from "../components/page/usersListPage";
import { useSelector } from "react-redux";
import { getCurrentUserData, getIsLoggedIn } from "../store/users";
import UsersLoader from "../components/ui/hoc/usersLoader";
import UserCartPage from "../components/page/userCartPage";

const Users = () => {
    const currentUserData = useSelector(getCurrentUserData());
    const isLogin = useSelector(getIsLoggedIn());
    const isAdmin = currentUserData?.admin;
    return (
        <main>
            <UsersLoader>
                <Switch>
                    {isAdmin ? (
                        <Route path="/users" exact component={UsersListPage} />
                    ) : (
                        <Redirect from="/users" exact to="/" />
                    )}
                    {isLogin && (
                        <>
                            <Route
                                path="/users/:userId"
                                exact
                                component={UserPage}
                            />
                            {/* <Route
                                path="/users/:userId/edit"
                                exact
                                component={UserEditPage}
                            /> */}
                            <Route
                                path="/users/:userId/:options"
                                exact
                                component={UserCartPage}
                            />
                        </>
                    )}
                    <Redirect from="/users/*" to="/" />
                </Switch>
            </UsersLoader>
        </main>
    );
};

export default Users;

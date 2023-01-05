import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
    getCurrentUserData,
    getIsLoadingUsersStatus
} from "../../../store/users";
import Orders from "../../ui/orders";
import UserCard from "../../ui/userCard";

const UserPage = () => {
    const isLoading = useSelector(getIsLoadingUsersStatus());
    const { userId } = useParams();
    const history = useHistory();
    if (!isLoading) {
        const user = useSelector(getCurrentUserData());
        if (userId !== user._id) {
            history.push(`/users/${user._id}`);
        }
        return (
            <>
                <section className="user-page">
                    <div className="container">
                        <div className="row ">
                            <div className="col-12">
                                <UserCard user={user} />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="user-order">
                    <div className="container">
                        <Orders />
                    </div>
                </section>
            </>
        );
    } else {
        return <h3>Loading...</h3>;
    }
};

export default UserPage;

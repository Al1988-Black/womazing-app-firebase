import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCitiesLoadingStatus, getCityById } from "../../store/cities";
import { getCurrentUserData, getIsLoadingUsersStatus } from "../../store/users";

const UserCard = () => {
    const isUserLoading = useSelector(getIsLoadingUsersStatus());
    const isCityLoading = useSelector(getCitiesLoadingStatus());
    const user = useSelector(getCurrentUserData());
    const city = useSelector(getCityById(user.city));
    if (!isCityLoading && !isUserLoading) {
        return (
            <div className="card mx-auto" style={{ width: "18rem" }}>
                <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center position-relative">
                        <img
                            src={user.image}
                            className="rounded-circle"
                            width="200"
                        />
                        <div className="mt-3">
                            <h4>{user.name}</h4>
                            <p className="text-secondary mb-1">{city.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};
UserCard.propTypes = {
    user: PropTypes.object
};

export default UserCard;

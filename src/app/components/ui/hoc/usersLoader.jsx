import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataLoaded, loadCurrentUserData } from "../../../store/users";
import PropTypes from "prop-types";

const UsersLoader = ({ children }) => {
    const dataStatus = useSelector(getDataLoaded());
    const dispatch = useDispatch();
    useEffect(() => {
        if (!dataStatus) {
            dispatch(loadCurrentUserData());
        }
    }, []);
    if (!dataStatus) return "Loading...";
    return children;
};
UsersLoader.propTypes = {
    childern: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UsersLoader;

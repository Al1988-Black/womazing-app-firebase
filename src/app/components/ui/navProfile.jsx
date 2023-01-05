import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";

function NavProfile() {
    const currentUser = useSelector(getCurrentUserData());
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    if (!currentUser) return "Loading...";
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle p-0 d-flex align-items-center">
                <p className="me-2">Профиль</p>
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link
                    to={`/users/${currentUser._id}`}
                    className="dropdown-item"
                >
                    Профиль
                </Link>
                {currentUser?.admin && (
                    <Link to="/shop/create" className="dropdown-item">
                        Cоздать товар
                    </Link>
                )}
                <Link to="/logout" className="dropdown-item">
                    Выход
                </Link>
            </div>
        </div>
    );
}

export default NavProfile;

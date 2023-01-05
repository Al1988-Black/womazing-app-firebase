import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";
const NavLinks = () => {
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    const isLoggedIn = useSelector(getIsLoggedIn());
    const activLink = (active) =>
        active ? "menu__link menu__link_active" : "menu__link";
    return (
        <>
            <button
                type="button"
                className="d-lg-none d-block humb"
                onClick={toggleMenu}
            ></button>
            <nav>
                <div
                    className={
                        "block-menu  f-left d-lg-block" +
                        (isOpen ? " d-block" : " d-none")
                    }
                >
                    <button
                        type="button"
                        className="close d-block d-lg-none mx-auto"
                        onClick={toggleMenu}
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <ul className="d-lg-flex menu align-items-center">
                        <li className="menu__item">
                            <NavLink
                                to="/"
                                exact
                                className={(isActive) => activLink(isActive)}
                            >
                                Главная
                            </NavLink>
                        </li>
                        <li className="menu__item">
                            <NavLink
                                to="/shop"
                                className={(isActive) => activLink(isActive)}
                            >
                                Магазин
                            </NavLink>
                        </li>
                        <li className="menu__item">
                            {isLoggedIn ? (
                                <NavProfile />
                            ) : (
                                <Link className="menu__link" to="/login">
                                    Вход
                                </Link>
                            )}
                        </li>
                        <li className="menu__item">
                            <NavLink
                                to="/contact"
                                className={(isActive) => activLink(isActive)}
                            >
                                Контакты
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default NavLinks;

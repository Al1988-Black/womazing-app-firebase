import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
    getCategories,
    getCategoriesLoadingStatus
} from "../../store/categories";

const FooterNavLinks = () => {
    const isLoadingGategory = useSelector(getCategoriesLoadingStatus());
    const categories = useSelector(getCategories());
    const activLink = (active) =>
        active ? "menu__link menu__link_active" : "menu__link";
    return (
        <nav>
            <ul className="d-block d-lg-flex menu footer-menu">
                <li className="menu__item footer-menu__item">
                    <NavLink
                        to="/"
                        exact
                        className={(isActive) => activLink(isActive)}
                    >
                        Главная
                    </NavLink>
                </li>
                <li className="menu__item footer-menu__item">
                    <NavLink
                        to="/shop"
                        className={(isActive) => activLink(isActive)}
                    >
                        Магазин
                    </NavLink>
                    {!isLoadingGategory ? (
                        <ul className="d-none d-lg-block footer-menu__mini">
                            {categories.map((cat) => (
                                <li
                                    className="footer-menu__mini-item"
                                    key={cat._id}
                                >
                                    <NavLink
                                        to={`/shop/${cat._id}`}
                                        className={(isActive) =>
                                            activLink(isActive) +
                                            " footer-menu__mini-link"
                                        }
                                    >
                                        {cat.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        "Loading..."
                    )}
                </li>
                <li className="menu__item footer-menu__item">
                    <NavLink
                        to="/brand"
                        className={(isActive) => activLink(isActive)}
                    >
                        О бренде
                    </NavLink>
                </li>
                <li className="menu__item footer-menu__item">
                    <NavLink
                        to="/contact"
                        className={(isActive) => activLink(isActive)}
                    >
                        Контакты
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default FooterNavLinks;

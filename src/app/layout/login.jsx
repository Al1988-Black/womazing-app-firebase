import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegistorForm from "../components/ui/registorForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };
    return (
        <section className="login">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4 bg-light">
                        {formType === "register" ? (
                            <>
                                <h3 className="mb-4">Регистрация</h3>
                                <RegistorForm />
                                <p>
                                    У вас есть уже аккаунт?{" "}
                                    <a
                                        role="button"
                                        className="login__link"
                                        onClick={toggleFormType}
                                    >
                                        Войти
                                    </a>
                                </p>
                            </>
                        ) : (
                            <>
                                <h3 className="mb-4">Вход в личный кабинет</h3>
                                <LoginForm />
                                <p>
                                    У вас нет аккаунта?{" "}
                                    <a
                                        role="button"
                                        className="login__link"
                                        onClick={toggleFormType}
                                    >
                                        Зарегестироваться
                                    </a>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Login;

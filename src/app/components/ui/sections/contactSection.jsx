import React from "react";
import useMockData from "../../../utils/mockData";
const contactSection = () => {
    const { error, initialize, progress, status } = useMockData();
    const handleClick = () => {
        initialize();
    };
    return (
        <section>
            <div className="container mt-5">
                <h1>Main Page</h1>
                <h3>Инициализация данных в FireBase</h3>
                <ul>
                    <li>Status:{status}</li>
                    <li>Progress:{progress}%</li>
                    {error && <li>Error:{error}</li>}
                </ul>
                <button className="btn btn-primary" onClick={handleClick}>
                    Инициализировать
                </button>
            </div>
        </section>
    );
};

export default contactSection;

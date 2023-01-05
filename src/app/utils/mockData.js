import category from "../mockData/category.json";
import city from "../mockData/city.json";
import color from "../mockData/color.json";
import product from "../mockData/product.json";
import promocode from "../mockData/promocode.json";
import size from "../mockData/size.json";
import { useEffect, useState } from "react";
import httpServece from "../services/http.service";

const useMockData = () => {
    const statusConsts = {
        idle: "Not Started",
        pending: "In Process",
        successed: "Ready",
        error: "Error occured"
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summuryCount =
        category.length +
        city.length +
        color.length +
        product.length +
        promocode.length +
        size.length;
    const incrementCount = () => {
        setCount((prevState) => prevState + 1);
    };

    const updateProgress = () => {
        const newProgress = Math.floor((count / summuryCount) * 100);
        if ((count !== 0) & (status === statusConsts.idle)) {
            setStatus(statusConsts.pending);
        }
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (progress === 100) {
            setStatus(statusConsts.successed);
        }
    };

    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialize() {
        try {
            for (const categ of category) {
                await httpServece.put("category/" + categ._id, categ);
                incrementCount();
            }
            for (const c of city) {
                await httpServece.put("city/" + c._id, c);
                incrementCount();
            }
            for (const col of color) {
                await httpServece.put("color/" + col._id, col);
                incrementCount();
            }
            for (const prod of product) {
                await httpServece.put("product/" + prod._id, prod);
                incrementCount();
            }
            for (const prom of promocode) {
                await httpServece.put("promocode/" + prom._id, prom);
                incrementCount();
            }
            for (const siz of size) {
                await httpServece.put("size/" + siz._id, siz);
                incrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConsts.error);
        }
    }
    return { error, initialize, progress, status };
};

export default useMockData;

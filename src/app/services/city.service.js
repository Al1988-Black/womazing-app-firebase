import httpServece from "./http.service";

const cityEndPoint = "city/";

const cityService = {
    fetchAll: async () => {
        const { data } = await httpServece.get(cityEndPoint);
        return data;
    }
};

export default cityService;

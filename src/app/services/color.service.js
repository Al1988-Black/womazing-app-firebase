import httpServece from "./http.service";

const colorEndPoint = "color/";

const colorService = {
    fetchAll: async () => {
        const { data } = await httpServece.get(colorEndPoint);
        return data;
    }
};

export default colorService;

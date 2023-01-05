import httpServece from "./http.service";

const sizeEndPoint = "size/";

const sizeService = {
    fetchAll: async () => {
        const { data } = await httpServece.get(sizeEndPoint);
        return data;
    }
};

export default sizeService;

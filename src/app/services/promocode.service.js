import httpServece from "./http.service";

const promoEndPoint = "promocode/";

const promoService = {
    fetchAll: async () => {
        const { data } = await httpServece.get(promoEndPoint);
        return data;
    },
    getpromocode: async (name) => {
        const { data } = await httpServece.get(promoEndPoint, {
            params: {
                orderBy: '"name"',
                equalTo: `"${name}"`
            }
        });
        return data;
    },
    getId: async (payload) => {
        const { data } = await httpServece.get(promoEndPoint + payload);
        return data;
    }
};

export default promoService;

import httpServece from "./http.service";

const saleEndPoint = "sale/";

const saleService = {
    createsale: async (payload) => {
        const { data } = await httpServece.put(
            saleEndPoint + payload._id,
            payload
        );
        return data;
    },
    getsales: async (userId) => {
        const { data } = await httpServece.get(saleEndPoint, {
            params: {
                orderBy: '"userId"',
                equalTo: `"${userId}"`
            }
        });
        return data;
    },
    removesale: async (saleId) => {
        const { data } = await httpServece.delete(saleEndPoint + saleId);
        return data;
    }
};

export default saleService;

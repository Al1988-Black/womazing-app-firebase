import httpServece from "./http.service";

const orderEndPoint = "order/";

const orderService = {
    createorder: async (payload) => {
        const { data } = await httpServece.put(
            orderEndPoint + payload._id,
            payload
        );
        return data;
    },
    getorders: async (userId) => {
        const { data } = await httpServece.get(orderEndPoint, {
            params: {
                orderBy: '"userId"',
                equalTo: `"${userId}"`
            }
        });
        return data;
    },
    removeorder: async (orderId) => {
        const { data } = await httpServece.delete(orderEndPoint + orderId);
        return data;
    }
};

export default orderService;

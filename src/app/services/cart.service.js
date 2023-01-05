import httpServece from "./http.service";

const cartEndPoint = "cart/";

const cartService = {
    createcart: async (payload) => {
        const { data } = await httpServece.put(
            cartEndPoint + payload._id,
            payload
        );
        return data;
    },
    getcarts: async (userId) => {
        const { data } = await httpServece.get(cartEndPoint, {
            params: {
                orderBy: '"userId"',
                equalTo: `"${userId}"`
            }
        });
        return data;
    },
    update: async (payload) => {
        const { data } = await httpServece.patch(
            cartEndPoint + payload._id,
            payload
        );
        return data;
    },
    removecart: async (cartId) => {
        const { data } = await httpServece.delete(cartEndPoint + cartId);
        return data;
    }
};

export default cartService;

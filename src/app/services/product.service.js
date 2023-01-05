import httpServece from "./http.service";

const productEndPoint = "product/";

const productService = {
    fetchAll: async () => {
        const { data } = await httpServece.get(productEndPoint);
        return data;
    },
    createproduct: async (payload) => {
        const { data } = await httpServece.put(
            productEndPoint + payload._id,
            payload
        );
        return data;
    },
    updateproduct: async (payload) => {
        const { data } = await httpServece.patch(
            productEndPoint + payload._id,
            payload
        );
        return data;
    },
    removeproduct: async (payload) => {
        const { data } = await httpServece.delete(productEndPoint + payload);
        return data;
    }
};

export default productService;

import httpServece from "./http.service";

const categoryEndPoint = "category/";

const categoryService = {
    fetchAll: async () => {
        const { data } = await httpServece.get(categoryEndPoint);
        return data;
    }
};

export default categoryService;

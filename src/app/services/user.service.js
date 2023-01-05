import httpServece from "./http.service";
import localStoradgeService from "./localStoradge.service";

const userEndPoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpServece.get(userEndPoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpServece.put(
            userEndPoint + payload._id,
            payload
        );
        return data;
    },
    update: async (payload) => {
        const { data } = await httpServece.patch(
            userEndPoint + payload._id,
            payload
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpServece.get(
            userEndPoint + localStoradgeService.getUserId()
        );
        return data;
    }
};

export default userService;

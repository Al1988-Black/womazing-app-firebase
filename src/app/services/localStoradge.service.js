const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const LOCALID_KEY = "jwt-local-id";

export function setTokens({
    refreshToken,
    idToken,
    expiresIn = 3600,
    localId
}) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(LOCALID_KEY, localId);
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
}
export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshKey() {
    return localStorage.getItem(REFRESH_KEY);
}

export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}

export function getUserId() {
    return localStorage.getItem(LOCALID_KEY);
}
export function removeAuthData() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(LOCALID_KEY);
}
const localStoradgeService = {
    setTokens,
    getAccessToken,
    getRefreshKey,
    getTokenExpiresDate,
    getUserId,
    removeAuthData
};
export default localStoradgeService;

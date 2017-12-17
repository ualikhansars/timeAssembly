export const setCookie = (value) => {
    document.cookie = `jwtToken=${value}`;
}
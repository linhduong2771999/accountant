import Cookies from "js-cookie";

export const setCookies = ({name = "", value = ""}) => {
    return Cookies.set(name, value, {expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)});
}

export const getCookies = ({name = ""}) => {
    return Cookies.get(name);
}

export const removeCookies = ({name = "", path = "/"}) => {
    return Cookies.remove(name, path);
}
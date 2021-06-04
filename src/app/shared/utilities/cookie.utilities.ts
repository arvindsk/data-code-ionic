// REF: https://plainjs.com/javascript/utilities/set-cookie-get-cookie-and-delete-cookie-5/
export function getCookie(name) {
    const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

// REF: https://plainjs.com/javascript/utilities/set-cookie-get-cookie-and-delete-cookie-5/
export function setCookie(name, value) {
    document.cookie = name + '=' + value + ';domain=' + window.location.hostname + ';path=/';
}

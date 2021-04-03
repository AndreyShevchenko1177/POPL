/* eslint-disable func-names */
export const imagesExtensions = ["jpg", "img", "IMG", "jpeg", "svg"];
export const isSafari = /constructor/i.test(window.HTMLElement)
    || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; }(!window.safari || (typeof window.safari !== "undefined" && window.safari.pushNotification)));

(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    var DEFAULT_SIGNING_URL = 'https://wellwishes.royaloffice.th';
    function createSigningButton(signing) {
        var signingEnabled = !!signing;
        var signingUrl = typeof signing === 'object' && 'url' in signing
            ? signing.url
            : DEFAULT_SIGNING_URL;
        var signingEl = "<a href=\"".concat(signingUrl, "\"><button>\u0E25\u0E07\u0E19\u0E32\u0E21\u0E16\u0E27\u0E32\u0E22\u0E1E\u0E23\u0E30\u0E1E\u0E23</button></a>");
        return signingEnabled ? signingEl : '';
    }
    function createEnterSiteButton(options) {
        var _a;
        var shouldRedirect = !!options.redirectUrl;
        var enterSiteText = (_a = options.enterSiteText) !== null && _a !== void 0 ? _a : 'เข้าสู่เว็บไซต์';
        var closeOverlayEl = "<button class=\"enter-website\" onclick=\"document.getElementById('king-splash-screen').remove()\">".concat(enterSiteText, "</button>");
        return shouldRedirect ? "" : closeOverlayEl;
    }
    function createKingSplashScreen(options) {
        if (options === void 0) { options = {}; }
        var container = document.createElement('div');
        container.id = 'king-splash-screen';
        container.innerHTML = "\n\t\t<div style=\"\">\n\t\t\t<div style=\"\">\u0E17\u0E23\u0E07\u0E1E\u0E23\u0E30\u0E40\u0E08\u0E23\u0E34\u0E0D</div>\n\t\t\t".concat(createSigningButton(options.signing), "\n\t\t\t").concat(createEnterSiteButton(options), "\n\t\t</div>\n\t");
        document.body.appendChild(container);
    }
    // Run the createSplashScreen function once the DOM element is mounted.
    document.addEventListener('DOMContentLoaded', function () {
        var options = window.KingSplashScreenOptions || {};
        createKingSplashScreen(options);
    });

}));

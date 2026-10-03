/* Optional Bootstrap helpers, with a working menu when the CDN is unavailable. */
(function () {
    "use strict";
    function init() {
        var jq = window.jQuery;
        if (jq && jq.fn && jq.fn.tooltip) jq('[data-toggle="tooltip"]').tooltip();
        var toggle = document.querySelector('.navbar-toggler');
        var menu = document.querySelector('#navbarResponsive');
        if (toggle && menu && !(jq && jq.fn && jq.fn.collapse)) {
            toggle.addEventListener('click', function () {
                var expanded = menu.classList.toggle('show');
                toggle.setAttribute('aria-expanded', String(expanded));
            });
        }
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();

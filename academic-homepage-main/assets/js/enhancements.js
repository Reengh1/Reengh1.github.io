/* Progressive, dependency-free effects. Content remains visible without JavaScript. */
(function () {
    "use strict";

    function initAmbientParticles() {
        var field = document.createElement("div");
        field.className = "site-ambient-particles";
        field.setAttribute("aria-hidden", "true");
        var fragment = document.createDocumentFragment();

        for (var index = 0; index < 18; index++) {
            var particle = document.createElement("span");
            particle.className = "site-ambient-particle";
            // Keep the first eight in the margins; these also form the mobile layer.
            var inMargin = index < 8;
            var left = inMargin
                ? (index % 2 ? 97.5 : 2.5) + (Math.random() - 0.5) * 2
                : 8 + Math.random() * 84;
            particle.style.left = left + "%";
            particle.style.top = ((index * 37 + Math.random() * 12) % 100) + "%";
            particle.style.setProperty("--particle-size", (2 + Math.random() * 1.5).toFixed(1) + "px");
            particle.style.setProperty("--drift-x", (inMargin ? 5 : 12) + "px");
            particle.style.setProperty("--drift-y", (12 + Math.random() * 18).toFixed(1) + "px");
            particle.style.setProperty("--float-duration", (18 + Math.random() * 16).toFixed(1) + "s");
            particle.style.setProperty("--float-delay", (-Math.random() * 34).toFixed(1) + "s");
            fragment.appendChild(particle);
        }

        field.appendChild(fragment);
        document.body.insertBefore(field, document.body.firstChild);

        function updateVisibility() {
            field.classList.toggle("is-paused", document.hidden);
        }

        document.addEventListener("visibilitychange", updateVisibility);
        updateVisibility();
    }

    function init() {
        initAmbientParticles();
        var navbar = document.querySelector(".navbar");
        var progress = document.createElement("div");
        progress.className = "site-reading-progress";
        progress.setAttribute("aria-hidden", "true");
        document.body.appendChild(progress);

        var framePending = false;

        function updateScroll() {
            framePending = false;
            var root = document.documentElement;
            var offset = window.pageYOffset || root.scrollTop || 0;
            var range = Math.max(root.scrollHeight, document.body.scrollHeight) - window.innerHeight;
            var amount = range > 0 ? Math.min(1, Math.max(0, offset / range)) : 0;
            progress.style.setProperty("--reading-progress", amount.toFixed(4));
            progress.classList.toggle("is-scrollable", range > 8);
            if (navbar) navbar.classList.toggle("is-scrolled", offset > 12);
        }

        function scheduleScrollUpdate() {
            if (!framePending) {
                framePending = true;
                window.requestAnimationFrame(updateScroll);
            }
        }

        window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
        window.addEventListener("resize", scheduleScrollUpdate, { passive: true });
        window.addEventListener("load", scheduleScrollUpdate);
        // Image loading can change page height after the initial render.
        document.addEventListener("load", function (event) {
            if (event.target.tagName === "IMG") scheduleScrollUpdate();
        }, true);
        updateScroll();

        var motionPreference = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
        if (!window.IntersectionObserver || (motionPreference && motionPreference.matches)) return;

        var selector = "main .card, main .bg-white.rounded-xl, main .travel-intro, main [data-reveal]";
        var candidates = Array.prototype.slice.call(document.querySelectorAll(selector));
        // Reveal only an outer card when cards are nested, including Masonry galleries.
        var elements = candidates.filter(function (element) {
            return !candidates.some(function (other) {
                return other !== element && other.contains(element);
            });
        });
        var observer;

        function showAll() {
            if (observer) observer.disconnect();
            elements.forEach(function (element) {
                element.classList.remove("reveal-pending");
                element.style.removeProperty("--reveal-delay");
            });
        }

        try {
            observer = new IntersectionObserver(function (entries) {
                var visible = entries.filter(function (entry) { return entry.isIntersecting; });
                visible.sort(function (a, b) {
                    return a.boundingClientRect.top - b.boundingClientRect.top;
                });
                visible.forEach(function (entry, index) {
                    var element = entry.target;
                    element.style.setProperty("--reveal-delay", Math.min(index * 65, 195) + "ms");
                    element.classList.remove("reveal-pending");
                    observer.unobserve(element);
                    // Remove the reveal delay so subsequent hover feedback is immediate.
                    window.setTimeout(function () {
                        element.style.removeProperty("--reveal-delay");
                        element.classList.remove("reveal-ready");
                    }, 850);
                });
            }, { rootMargin: "0px 0px 32px 0px", threshold: 0 });

            elements.forEach(function (element) {
                element.classList.add("reveal-ready", "reveal-pending");
                observer.observe(element);
            });

            if (motionPreference) {
                var onMotionChange = function (event) { if (event.matches) showAll(); };
                if (motionPreference.addEventListener) motionPreference.addEventListener("change", onMotionChange);
                else if (motionPreference.addListener) motionPreference.addListener(onMotionChange);
            }

            // Browser print captures all content, even before it has been scrolled into view.
            window.addEventListener("beforeprint", showAll);
        } catch (error) {
            showAll();
        }
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();

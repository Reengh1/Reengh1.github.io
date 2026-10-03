(function () {
    "use strict";

    function initializeTravelogue() {
        var photographs = Array.from(document.querySelectorAll("[data-travel-photo]"));
        var dialog = document.querySelector(".travel-lightbox");
        if (!photographs.length || !dialog || typeof dialog.showModal !== "function") return;

        var fullImage = dialog.querySelector(".travel-lightbox-image");
        var title = dialog.querySelector("#travel-lightbox-title");
        var metadata = dialog.querySelector(".travel-lightbox-meta");
        var caption = dialog.querySelector("#travel-lightbox-caption");
        var counter = dialog.querySelector(".travel-lightbox-counter");
        var closeButton = dialog.querySelector(".travel-lightbox-close");
        var previousButton = dialog.querySelector(".travel-lightbox-prev");
        var nextButton = dialog.querySelector(".travel-lightbox-next");
        var error = dialog.querySelector(".travel-lightbox-error");
        var currentIndex = 0;
        var opener = null;
        var previousOverflow = "";

        previousButton.hidden = photographs.length < 2;
        nextButton.hidden = photographs.length < 2;

        function displayPhotograph(index) {
            currentIndex = (index + photographs.length) % photographs.length;
            var photograph = photographs[currentIndex];
            var details = [photograph.dataset.location, photograph.dataset.date].filter(Boolean);
            fullImage.hidden = false;
            error.hidden = true;
            fullImage.alt = photograph.dataset.alt || photograph.dataset.title || "Travel photograph";
            fullImage.src = photograph.href;
            title.textContent = photograph.dataset.title || "Travel photograph";
            metadata.textContent = details.join(" · ");
            metadata.hidden = !details.length;
            caption.textContent = photograph.dataset.caption || "";
            caption.hidden = !photograph.dataset.caption;
            counter.textContent = (currentIndex + 1) + " / " + photographs.length;
        }

        photographs.forEach(function (photograph, index) {
            photograph.addEventListener("click", function (event) {
                // Keep the original image link available to new tabs and without JavaScript.
                if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
                event.preventDefault();
                opener = photograph;
                displayPhotograph(index);
                previousOverflow = document.body.style.overflow;
                dialog.showModal();
                document.body.style.overflow = "hidden";
            });
        });

        fullImage.addEventListener("error", function () {
            fullImage.hidden = true;
            error.hidden = false;
        });

        fullImage.addEventListener("load", function () {
            fullImage.hidden = false;
            error.hidden = true;
        });

        closeButton.addEventListener("click", function () { dialog.close(); });
        previousButton.addEventListener("click", function () { displayPhotograph(currentIndex - 1); });
        nextButton.addEventListener("click", function () { displayPhotograph(currentIndex + 1); });

        dialog.addEventListener("click", function (event) {
            if (event.target !== dialog) return;
            var bounds = dialog.getBoundingClientRect();
            if (event.clientX < bounds.left || event.clientX > bounds.right ||
                event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
        });

        // A native modal dialog traps focus and handles Escape; arrows browse the photos.
        dialog.addEventListener("keydown", function (event) {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                displayPhotograph(currentIndex + (event.key === "ArrowLeft" ? -1 : 1));
            }
        });

        dialog.addEventListener("close", function () {
            document.body.style.overflow = previousOverflow;
            if (opener) opener.focus({ preventScroll: true });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeTravelogue, { once: true });
    } else {
        initializeTravelogue();
    }
})();

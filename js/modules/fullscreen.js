console.log("fullscreen.js LOADED");

export function toggleFullscreen() {
    const box = document.getElementById("tableBox");
    if (!box) return;

    const icon = box.querySelector(".fullscreen-btn i");

    box.classList.toggle("fullscreen");

    if (box.classList.contains("fullscreen")) {
        icon.classList.remove("fa-expand");
        icon.classList.add("fa-compress");
    } else {
        icon.classList.remove("fa-compress");
        icon.classList.add("fa-expand");
    }
}

export function initFullscreen() {
    console.log("initFullscreen RUN");


    // expose cho HTML onclick
    window.toggleFullscreen = toggleFullscreen;
    window.toggleSlideFullscreen = toggleSlideFullscreen;

    // ESC handling
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {

            // 1. đóng viewer
            const viewer = document.getElementById("imgViewer");
            if (viewer && viewer.style.display === "flex") {
                viewer.style.display = "none";
                return;
            }

            // 2. thoát fullscreen table
            const box = document.getElementById("tableBox");
            if (box && box.classList.contains("fullscreen")) {
                toggleFullscreen();
            }
        }
    });
}

export function toggleSlideFullscreen() {
  const slide = document.querySelector('.slide.active');
  if (!slide) return;

  slide.classList.toggle('fullscreen');
}
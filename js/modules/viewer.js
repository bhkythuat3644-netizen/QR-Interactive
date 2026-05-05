let currentIndex = 0;
let images = [];
let currentGallery = null;

export function openViewer(el) {

    const viewer = document.getElementById('imgViewer');

    // 👉 nếu đang mở thì đóng
    if (viewer.style.display === 'flex') {
        closeViewer();
        return;
    }

    currentGallery = el.closest('.gallery');

    const imgs = currentGallery.querySelectorAll('img');
    images = Array.from(imgs).map(img => img.src);

    currentIndex = Number(el.dataset.index);
    document.getElementById('viewerImg').src = images[currentIndex];
    viewer.style.display = 'flex';
}

export function closeViewer() {
    document.getElementById('imgViewer').style.display = 'none';
}

export function nextImg(e) {
    if (e) e.stopPropagation();
    if (!images.length) return;

    currentIndex = (currentIndex + 1) % images.length;
    document.getElementById('viewerImg').src = images[currentIndex];
}

export function prevImg(e) {
    if (e) e.stopPropagation();
    if (!images.length) return;

    currentIndex = (currentIndex - 1 + images.length) % images.length;
    document.getElementById('viewerImg').src = images[currentIndex];
}

export function initViewer() {
    const viewer = document.getElementById("imgViewer");
    const img = document.getElementById("viewerImg");

    // click nền → đóng
    viewer.addEventListener("click", (e) => {
        if (e.target.id === "imgViewer") {
            closeViewer();
        }
    });

    // 👉 CLICK ẢNH LỚN → ĐÓNG (cái bạn đang thiếu)
    img.addEventListener("click", (e) => {
        e.stopPropagation();
        closeViewer();
    });
}

// 👉 keyboard navigation
document.addEventListener("keydown", (e) => {
    const viewer = document.getElementById("imgViewer");

    // chỉ hoạt động khi viewer đang mở
    if (!viewer || viewer.style.display !== "flex") return;

    if (e.key === "ArrowRight") {
        nextImg(e);
    }

    if (e.key === "ArrowLeft") {
        prevImg(e);
    }

    if (e.key === "Escape") {
        closeViewer();
    }
});

let touchStartX = 0;
let touchEndX = 0;

const viewerEl = document.getElementById('imgViewer');

viewerEl.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

viewerEl.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) nextImg();
    if (touchEndX > touchStartX + threshold) prevImg();
}

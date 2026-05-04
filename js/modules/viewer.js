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
    e.stopPropagation();
    if (!images.length) return;

    currentIndex = (currentIndex + 1) % images.length;
    document.getElementById('viewerImg').src = images[currentIndex];
}

export function prevImg(e) {
    e.stopPropagation();
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
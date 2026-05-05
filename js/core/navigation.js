export function navTo(targetId) {
    const current = document.querySelector('.slide.active');
    const target = document.getElementById(targetId);
    if (!target || !current) return;

    current.classList.remove('active');
    current.classList.add('prev');

    target.classList.remove('next', 'prev');
    target.classList.add('active');

    setTimeout(() => {
        document.querySelectorAll('.slide').forEach(s => {
            if (s !== target) {
                s.classList.remove('prev');
                s.classList.add('next');
            }
        });
    }, 600);
}

export function initNavigation() {
    // expose global cho HTML onclick
    window.navTo = navTo;
}
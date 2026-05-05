import { renderTable } from './table.js';

export function initFilter() {
    const xuongEl = document.getElementById("filter-xuong");
    const roleEl = document.getElementById("filter-role");

    if (!xuongEl || !roleEl) return;

    function update() {
        const xuong = xuongEl.value;
        const role = roleEl.value;
        renderTable(xuong, role);
    }

    xuongEl.addEventListener("change", update);
    roleEl.addEventListener("change", update);

    // render lần đầu
    update();
}
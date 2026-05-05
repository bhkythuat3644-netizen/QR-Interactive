import { fileSamples, keywords } from '../data/files.js';

let currentKey = null;

export function renderFileSamples() {
    const container = document.getElementById("fileList");
    if (!container) return;

    container.innerHTML = "";

    fileSamples.forEach(file => {

        let html = file;

        keywords.forEach(k => {
            const regex = new RegExp(k, "g");
            html = html.replace(regex, `<span class="part" data-key="${k}">${k}</span>`);
        });

        html = html.replace(/2026-T03-19/g, `<span class="part" data-key="DATE">2026-T03-19</span>`);

        container.innerHTML += `<div class="file-row">${html}</div>`;
    });
}

export function setupExplainClick() {
    document.querySelectorAll(".explain-table tbody tr").forEach(row => {
        row.addEventListener("click", () => {

            const key = row.dataset.key;

            if (currentKey === key) {
                resetHighlight();
                currentKey = null;
                return;
            }

            currentKey = key;

            document.querySelectorAll(".part").forEach(el => {
                el.classList.remove("active");

                if (el.dataset.key === key) {
                    el.classList.add("active");
                }
            });

            document.querySelectorAll(".explain-table tr").forEach(r => r.classList.remove("active-row"));
            row.classList.add("active-row");

        });
    });
}

export function resetHighlight() {
    document.querySelectorAll(".part").forEach(el => {
        el.classList.remove("active");
    });

    document.querySelectorAll(".explain-table tr").forEach(r => {
        r.classList.remove("active-row");
    });
}

export function initFileHighlight() {
    renderFileSamples();
    setupExplainClick();
}
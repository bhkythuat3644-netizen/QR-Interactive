import { users } from '../data/users.js';

export function renderTable(xuong = "", role = "") {
    const tbody = document.querySelector("#user-table tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    const filtered = users.filter(d => {
        return (!xuong || d.xuong === xuong) &&
               (!role || d[role.toLowerCase().replaceAll('-', '_')]);
    });

    filtered.forEach(d => {

        const roles = [];

        if (d.ai) roles.push("AI");
        if (d.pkl) roles.push("PKL");

        if (d.bk_bed) roles.push("BK-BED");
        if (d.bk_tu) roles.push("BK-TU");
        if (d.bk_spk) roles.push("BK-SPK");
        if (d.bk_dg) roles.push("BK-DG");

        if (d.bv_bed) roles.push("BV-BED");
        if (d.bv_tu) roles.push("BV-TU");
        if (d.bv_spk) roles.push("BV-SPK");
        if (d.bv_dg) roles.push("BV-DG");

        const roleHTML = roles.map(r => 
            `<span class="badge">${r}</span>`
        ).join("");

        const row = `
        <tr>
            <td>${d.id}</td>
            <td>${d.ten}</td>
            <td>${d.mat_khau}</td>
            <td>${d.bp}</td>
            <td>${d.xuong}</td>
            <td><div class="role-cell">${roleHTML}</div></td>
        </tr>
        `;

        tbody.innerHTML += row;
    });
}
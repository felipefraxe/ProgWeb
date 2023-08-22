document.write(`<div>${createPage()}</div>`);

function createPage() {
    let page = "";
    for(let i = 1; i <= 10; i++) {
        page += createTable(i);
    }
    return page;
}

function createTable(num) {
    return `<table border="1">
        <thead>
            <tr>
                <th colspan="2">Produtos de ${num}</th>
            </tr>
        </thead>
        ${createTableBody(num)}
    </table>`;
}

function createTableBody(num) {
    let tBody = "<tbody>";
    for(let i = 1; i < 10; i++) {
        tBody += `<tr><td>${num}x${i}</td><td>${num * i}</td></tr>`;
    }
    return tBody += "</tbody>";
}
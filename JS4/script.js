(() => {
    const okBtn = document.querySelector("button");
    okBtn.onclick = () => {
        const radius = document.querySelector("#radius").value;
        document.querySelector("#area").value = getArea(radius).toFixed(2);
        document.querySelector("#circumference").value = getCircumference(radius).toFixed(2);
    }
})();

function getArea(radius) {
    return Math.PI * radius * radius;
}

function getCircumference(radius) {
    return 2 * Math.PI * radius;
}
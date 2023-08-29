(() => {
    document.querySelector("button").onclick = () => {
        const inputs = document.querySelectorAll("input");
        const graphs = document.querySelectorAll(".graph");        
        document.querySelector(".container").style.setProperty("height", `${maxHeight(inputs)}px`);
        graphs.forEach((graph, i) => {
            graph.style.setProperty("height", `${inputs[i].value}px`);
            graph.style.setProperty("width", `${inputs[inputs.length - 1].value}px`);
        });
    }
})();

function maxHeight(inputsArr) {
    let max = inputsArr[0].value;
    for(let i = 1; i < inputsArr.length - 1; i++) {
        if(inputsArr[i].value > max)
            max = inputsArr[i].value;
    }
    return max;
}
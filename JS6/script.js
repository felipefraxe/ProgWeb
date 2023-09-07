(() => {
    const trailArray = [];
    document.addEventListener("mousemove", (event) => {
        const { clientX, clientY } = event;
        
        if(trailArray.length === 8) {
            document.body.removeChild(trailArray[0]);
            trailArray.shift();
        }
        const dot = document.createElement("div")
        dot.className = "dot";
        dot.style.left = clientX + "px";
        dot.style.top = clientY + "px";
        trailArray.push(dot);
        document.body.appendChild(dot);
    });
})()


game();

function game() {
    let pts = 0;
    defeat = false;
    const plays = {
        1: "Papel",
        2: "Pedra",
        3: "Tesoura"
    };

    console.log("Escolha sua jogada:\n1\t-\tPapel\n2\t-\tPedra\n3\t-\tTesoura");
    while(!defeat && (playerPlay = parseInt(prompt("Escolha sua jogada:\n1\t-\tPapel\n2\t-\tPedra\n3\t-\tTesoura"))) >= 1 && playerPlay <= 3) {
        const pcPlay = randomInt(3);
        console.log(`O computador jogou ${plays[pcPlay]}`);
        if(pcPlay === playerPlay) {
            console.log("A rodada empatou!");
        } else if(pcPlay === (playerPlay % 3) + 1) {
            console.log("Você ganhou!");
            pts++;
        } else {
            defeat = true;
        }
    }
    console.log(`Você perdeu! A sua pontuação foi de ${pts}`);
}

function randomInt(threshold) {
    return Math.floor(Math.random() * threshold) + 1;
}
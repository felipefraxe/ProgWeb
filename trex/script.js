(() => {

    let FPS = 300;
    const WIDTH = 1024;
    const HEIGHT = 300;
    const PROB_NUVEM = 0.1;
    const PROB_CACTO = 0.4;
    const PROB_PASSARO = 0.05;

    let score_board_digits = 5;
    let gameLoop;
    let frame = 0;
    const nuvens = [];
    const cactos = [];
    const passaros = [];
    const scoreBoard = [];
    let paused = false;
    let started = false;

    class Deserto {
        constructor() {
            this.bgColor = "white";
            this.element = document.createElement("div")
            this.element.className = "deserto";
            this.element.style.width = `${WIDTH}px`;
            this.element.style.height = `${HEIGHT}px`;
            document.getElementById("game").appendChild(this.element);
  
            this.lua = document.createElement("div");
            this.lua.className = "lua";

            this.chao = document.createElement("div");
            this.chao.className = "chao";
            this.chao.style.backgroundPositionX = 0;
            this.element.appendChild(this.chao);
        }

        mover() {
            this.chao.style.backgroundPositionX = `${parseInt(this.chao.style.backgroundPositionX) - 1}px`;
        }

        changeDayNight() {
            if(paused || !started)
                return;
            if(this.bgColor === "white") {
                this.bgColor = "black";
                this.element.appendChild(this.lua);
            } else {
                this.bgColor = "white";
                this.lua.remove();
            }
            this.element.style.backgroundColor = this.bgColor;
        }
    }

    class Dino {
        #status
        constructor() {
            this.backgroundPositionsX = {
                parado: "-1256px",
                correndo1: "-1391px",
                correndo2: "-1457px",
                pulando: "-1259px",
                morto: "-1522px",
                agachado1: "-1651px",
                agachado2: "-1740px"
            }
            this.#status = 0; // 0-correndo, 1-subindo, 2-descendo, 3-agachado
            this.altumaMinima = 2;
            this.altumaMaxima = 115;
            this.element = document.createElement("div");
            this.element.className = "dino";
            this.element.style.backgroundPositionX = this.backgroundPositionsX.parado;
            this.element.style.backgroundPositionY = "-2px";
            this.element.style.bottom = `${this.altumaMinima}px`;
            this.element.style.height = "70px";
            this.element.style.width = "66px";
            this.element.style.left = "20px";
            deserto.element.appendChild(this.element);
        }

        set status(value) {
            if(value >= 0 && value <= 3)
                this.#status = value;
        }
        
        get status() {
            return this.#status;
        }
        
        correr() {
            if(this.#status === 0) {
                this.element.style.backgroundPositionX = this.element.style.backgroundPositionX === this.backgroundPositionsX.correndo1 ? this.backgroundPositionsX.correndo2 : this.backgroundPositionsX.correndo1;
            } else if(this.#status === 1) {
                this.element.style.backgroundPositionX = this.backgroundPositionsX.pulando;
                this.element.style.bottom = `${parseInt(this.element.style.bottom) + 1}px`;
                if(parseInt(this.element.style.bottom) >= this.altumaMaxima)
                    this.status = 2;
            } else if(this.#status === 2) {
                this.element.style.bottom = `${parseInt(this.element.style.bottom) - 1}px`;
                if(parseInt(this.element.style.bottom) <= this.altumaMinima)
                    this.status = 0;
            } else if(this.#status === 3) {
                this.element.style.backgroundPositionX = this.element.style.backgroundPositionX === this.backgroundPositionsX.agachado1 ? this.backgroundPositionsX.agachado2 : this.backgroundPositionsX.agachado1;
            }
        }
    }
  
    class Nuvem {
        constructor() {
            this.element = document.createElement("div");
            this.element.className = "nuvem";
            this.element.style.right = 0;
            this.element.style.top = `${parseInt(Math.random() * 100)}px`;
            deserto.element.appendChild(this.element);
        }

        mover() {
            this.element.style.right = `${parseInt(this.element.style.right) + 1}px`;
        }
    }

    class Cacto {
        constructor(type) {
            this.types = [
                { bgPosX: "-334px", width: "26px", height: "53px" }, // 1
                { bgPosX: "-361px", width: "101px", height: "53px" }, // 4
                { bgPosX: "-490px", width: "36px", height: "72px" }, // 1
                { bgPosX: "-638px", width: "76px", height: "78px" }, // 3
                { bgPosX: "-527px", width: "75px", height: "71px" }, // 2
            ];
            this.element = document.createElement("div");
            this.element.className = "cacto";
            this.element.style.right = 0;
            this.element.style.backgroundPositionX = this.types[type].bgPosX;
            this.element.style.width = this.types[type].width;
            this.element.style.height = this.types[type].height;
            deserto.element.appendChild(this.element);
        }

        mover() {
            this.element.style.right = `${parseInt(this.element.style.right) + 1}px`;
        }
    }

    class Passaro {
        constructor(top) {
            this.tops = [250, 200, 90];
            this.element = document.createElement("div");
            this.element.className = "passaro";
            this.element.style.backgroundPositionX = "-195px";
            this.element.style.backgroundPositionY = "-11px";
            this.element.style.height = "51px";
            this.element.style.width = "69px";
            this.element.style.right = 0;
            this.element.style.top = `${this.tops[top]}px`;
            deserto.element.appendChild(this.element);
        }

        mover() {
            this.element.style.right = `${parseInt(this.element.style.right) + 2}px`;
            if(this.element.style.backgroundPositionX === "-195px") {
                this.element.style.backgroundPositionX = "-264px";
                this.element.style.backgroundPositionY = "-2px";
                this.element.style.height = "45px";
            } else {
                this.element.style.backgroundPositionX = "-195px";
                this.element.style.backgroundPositionY = "-11px";
                this.element.style.height = "51px";
            }
        }
    }

    class Score {
        constructor() {
            this.element = document.createElement("div");
            this.element.className = "score";
            deserto.element.appendChild(this.element);
            this.element.style.backgroundPositionX = "-970px";
        }

        increment() {
            if(this.element.style.backgroundPositionX != "-1105px") {
                this.element.style.backgroundPositionX = `${parseInt(this.element.style.backgroundPositionX) - 15}px`;
                return false;
            } else {
                this.element.style.backgroundPositionX = "-970px";
                return true;
            }
        }

        reset() {
            this.element.style.backgroundPositionX = "-970px";
        }
    }

    function init() {
        gameLoop = setInterval(run, 1000 / (FPS * 64));
        dayLoop = setInterval(() => {
            deserto.changeDayNight();
            FPS += 10;
        }, 1000 * 60);
    }

    function gameOver() {
        clearInterval(gameLoop);
        clearInterval(dayLoop);

        dino.element.style.backgroundPositionX = dino.backgroundPositionsX.morto;
    
        const restartBtn = document.createElement("div");
        restartBtn.className = "restartBtn";
        const gameOverMsg = document.createElement("div");
        gameOverMsg.className = "gameOver";
        restartBtn.addEventListener("click", () => {
            dino.element.style.bottom = `${dino.altumaMinima}px`;

            while(nuvens.length > 0) {
                nuvens[0].element.remove();
                nuvens.shift();
            }

            while(cactos.length > 0) {
                cactos[0].element.remove();
                cactos.shift();
            }

            while(passaros.length > 0) {
                passaros[0].element.remove();
                passaros.shift();
            }

            for(let i = 0; i < score_board_digits; i++) {
                scoreBoard[i].reset();
            }
            score_board_digits = 5;

            dino.element.style.backgroundPositionX = dino.backgroundPositionsX.parado;
            dino.element.style.width = "66px";
            dino.element.style.height = "70px";
            started = false;
            deserto.bgColor = "white";
            deserto.element.style.backgroundColor = deserto.bgColor;
            deserto.lua.remove();
            restartBtn.remove();
            gameOverMsg.remove();
        });


        deserto.element.appendChild(restartBtn);
        deserto.element.appendChild(gameOverMsg);
    }

    function run() {
        if(paused)
            return;

        frame = (frame + 1) % FPS;
        deserto.mover();
        dino.correr();

        if(Math.random() * 100 <= PROB_NUVEM)
            nuvens.push(new Nuvem());

        if(Math.random() * 100 <= PROB_CACTO) {
            const cacto = new Cacto(Math.floor(Math.random() * 5));
            if(cactos.length === 0 || (parseInt(cacto.element.style.right) < parseInt(cactos[cactos.length - 1].element.style.right) - 300))
                cactos.push(cacto);
            else
                cacto.element.remove();
        }

        if(Math.random() * 100 <= PROB_PASSARO) {
            const passaro = new Passaro(Math.floor(Math.random() * 3));
            if(passaros.length === 0 || (parseInt(passaro.element.style.right) < parseInt(passaros[passaros.length - 1].element.style.right) - 300))
                passaros.push(passaro);
            else
                passaro.element.remove();
        }

        cactos.forEach(cacto => {
            cacto.mover();
            const cactoXInterval = [WIDTH - parseInt(cacto.element.style.right) - parseInt(cacto.element.style.width), WIDTH - parseInt(cacto.element.style.right)];
            const dinoXInterval = [parseInt(dino.element.style.left) + 20, parseInt(dino.element.style.left) + parseInt(dino.element.style.width) - 20];
            if(((dinoXInterval[0] >= cactoXInterval[0] && dinoXInterval[0] <= cactoXInterval[1])
                || (dinoXInterval[1] >= cactoXInterval[0] && dinoXInterval[1] <= cactoXInterval[1]))
                && (parseInt(dino.element.style.bottom) + 20 < parseInt(cacto.element.style.height))) {
                    gameOver();
            }

            if(cactoXInterval[1] < 0) {
                cactos.shift();
                cacto.element.remove();
            }
        });

        passaros.forEach(passaro => {
            passaro.mover();

            const passaroInterval = [
                [WIDTH - parseInt(passaro.element.style.right) - parseInt(passaro.element.style.width), WIDTH - parseInt(passaro.element.style.right)],
                [parseInt(passaro.element.style.top), parseInt(passaro.element.style.top) + parseInt(passaro.element.style.height)]
            ];
            const dinoInterval = [
                [parseInt(dino.element.style.left) + 20, parseInt(dino.element.style.left) + parseInt(dino.element.style.width) - 20],
                [HEIGHT - parseInt(dino.element.style.bottom) - parseInt(dino.element.style.height) + 30, HEIGHT - parseInt(dino.element.style.bottom) - 15]
            ];
            if(((dinoInterval[0][0] >= passaroInterval[0][0] && dinoInterval[0][0] <= passaroInterval[0][1])
                || (dinoInterval[0][1] >= passaroInterval[0][0] && dinoInterval[0][1] <= passaroInterval[0][1]))
                && (((dinoInterval[1][0] >= passaroInterval[1][0] && dinoInterval[1][0] <= passaroInterval[1][1])
                || (dinoInterval[1][1] >= passaroInterval[1][0] && dinoInterval[1][1] <= passaroInterval[1][1])))) {
                    gameOver();
            }

            if(passaroInterval[0][1] < 0) {
                passaros.shift();
                passaro.element.remove();
            }
        });

        if(frame % 2 === 0) {
            nuvens.forEach(nuvem => {
                nuvem.mover();
                if(parseInt(nuvem.element.style.right) > WIDTH) {
                    nuvens.shift();
                    nuvem.element.remove();
                }
            });
        }

        if(frame % 30 === 0) {
            let i = 0;
            while(scoreBoard[i].increment()) {
                i++;
                if(i === score_board_digits) {
                    scoreBoard.push(new Score());
                    scoreBoard[i].element.style.right = `${15 + (i * 15)}px`;
                    score_board_digits++;
                }
            }
        }
    }

    window.addEventListener("keydown", ({ code, key }) => {
        if(code === "Space") {
            if(!started) {
                started = true;
                init();
            } else if(!paused && dino.status === 0) {
                dino.status = 1;
            }
        } else if(key === 'p') {
            paused = !paused;
        } else if(key === "ArrowDown") {
            if(!paused && dino.status === 0) {
                dino.status = 3;
                dino.element.style.width = "90px";
                dino.element.style.height = "45px";
                dino.element.style.backgroundPositionY = "-27px";
            }
        } else if(key === "ArrowUp") {
            if(!paused && dino.status === 0) {
                dino.status = 1;
            }
        }
    });

    window.addEventListener("keyup", ({ key }) => {
        if(key === "ArrowDown") {
            if(!paused && dino.status === 3) {
                dino.status = 0;
                dino.element.style.width = "66px";
                dino.element.style.height = "70px";
                dino.element.style.backgroundPositionY = "-2px";
            }
        }
    });

    const deserto = new Deserto();
    const dino = new Dino();
    for(let i = 0; i < score_board_digits; i++) {
        scoreBoard.push(new Score());
        scoreBoard[i].element.style.right = `${15 + (i * 15)}px`;
    }
})();
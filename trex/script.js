(() => {

    const FPS = 300;
    const WIDTH = 1024;
    const PROB_NUVEM = 0.2;
    const PROB_CACTO = 0.5;
    
    let score_board_digits = 5;
    let gameLoop;
    let frame = 0;
    const nuvens = [];
    const cactos = [];
    const scoreBoard = [];
    let paused = false;
    let started = false;

    class Deserto {
        constructor() {
            this.element = document.createElement("div")
            this.element.className = "deserto";
            document.getElementById("game").appendChild(this.element);
  
            this.chao = document.createElement("div");
            this.chao.className = "chao";
            this.chao.style.backgroundPositionX = 0;
            this.element.appendChild(this.chao);
        }

        mover() {
            this.chao.style.backgroundPositionX = `${parseInt(this.chao.style.backgroundPositionX) - 1}px`;
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
            this.altumaMaxima = 100;
            this.element = document.createElement("div")
            this.element.className = "dino";
            this.element.style.backgroundPositionX = this.backgroundPositionsX.parado;
            this.element.style.backgroundPositionY = "-2px";
            this.element.style.bottom = `${this.altumaMinima}px`;
            this.element.style.height = "70px";
            this.element.style.width = "66px";
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
        constructor() {
            this.element = document.createElement("div");
            this.element.className = "cacto";
            this.element.style.right = 0;
            deserto.element.appendChild(this.element);
        }

        mover() {
            this.element.style.right = `${parseInt(this.element.style.right) + 1}px`;
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

    const deserto = new Deserto();
    const dino = new Dino();
    for(let i = 0; i < score_board_digits; i++) {
        scoreBoard.push(new Score());
        scoreBoard[i].element.style.right = `${15 + (i * 15)}px`;
    }

    function init() {
        gameLoop = setInterval(run, 1000 / FPS);
    }
    
    function gameOver() {
        dino.element.style.backgroundPositionX = dino.backgroundPositionsX.morto;
        clearInterval(gameLoop);

        const restartBtn = document.createElement("div");
        restartBtn.className = "restartBtn";
        const gameOverMsg = document.createElement("div");
        gameOverMsg.className = "gameOver";
        restartBtn.addEventListener("click", () => {
            while(nuvens.length > 0) {
                nuvens[0].element.remove();
                nuvens.shift();
            }

            while(cactos.length > 0) {
                cactos[0].element.remove();
                cactos.shift();
            }

            for(let i = 0; i < score_board_digits; i++) {
                scoreBoard[i].reset();
            }
            score_board_digits = 5;

            dino.element.style.backgroundPositionX = dino.backgroundPositionsX.parado;
            dino.element.style.width = "66px";
            dino.element.style.height = "70px";
            started = false;
            restartBtn.remove();
            gameOverMsg.remove();
        });


        deserto.element.appendChild(restartBtn);
        deserto.element.appendChild(gameOverMsg);
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
            if(!paused && dino.status !== 1) {
                dino.status = dino.status === 0 ? 1 : 0;
                dino.element.style.width = "66px";
                dino.element.style.height = "70px";
                dino.element.style.backgroundPositionY = "-2px";
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
    })

    function run() {
        if(paused)
            return;

        frame = (frame + 1) % FPS;

        deserto.mover();
        dino.correr();

        if(Math.random() * 100 <= PROB_NUVEM)
            nuvens.push(new Nuvem());

        if(Math.random() * 100 <= PROB_CACTO) {
            const cacto = new Cacto();
            if(cactos.length === 0 || (parseInt(cacto.element.style.right) < parseInt(cactos[cactos.length - 1].element.style.right) - 170)) {
                cactos.push(cacto);
            } else {
                cacto.element.remove();
            }
        }

        cactos.forEach(cacto => {
            cacto.mover();
    
            const xPos = WIDTH - parseInt(cacto.element.style.right);
            if(xPos === 40 && parseInt(dino.element.style.bottom) <= 60) {
                gameOver();
            }
    
            if(xPos < 0) {
                cactos.shift();
                cacto.element.remove();
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
})();
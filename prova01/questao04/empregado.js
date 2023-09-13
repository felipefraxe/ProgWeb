class Empregado {
    #nome;
    #salario;
    constructor(nome, salario) {
        this.#nome = nome;
        this.#salario = salario;
    }

    get nome() {
        return this.#nome;
    }

    set nome(nome) {
        this.#nome = nome;
    }

    get salario() {
        return this.#salario;
    }

    set salario(salario) {
        if(salario < 0) {
            console.error("Salário negativo");
            return;
        }
        this.#salario = salario;
    }

    static sumSalarios(empregados) {
        return empregados.reduce((acc, empregado) => acc + empregado.salario, 0);
    }
}

(() => {
    e1 = new Empregado("Alice", 10000);
    e2 = new Empregado("Bob", 5000);
    console.log(e1.salario, e2.salario);
    e1.salario = e1.salario * 1.1;
    e2.salario = e2.salario * 1.1;
    console.log(e1.salario, e2.salario);
    console.log(Empregado.sumSalarios([e1, e2]));
})();
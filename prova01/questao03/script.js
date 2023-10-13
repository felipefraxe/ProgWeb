/* Código desenvolvido corretamente */
/* Nota: 2.0 */

(() => {
    document.querySelector(".soma").addEventListener("click", () => {
        const num1 = parseInt(prompt("Digite um número"));
        const num2 = parseInt(prompt("Digite outro número"));
        document.querySelector(".resultado").innerHTML = `A soma entre ${num1} e ${num2} é ${num1 + num2}`;
    });
})();
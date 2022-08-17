let cards = [];  //array que vai receber as cartas
let cardNumber = 14 // prompt("Digite o número de cartas para o jogo (número par entre 4 e 14):");
gameSettings();
function gameSettings() {

    while (!(cardNumber >= 4 && cardNumber <= 14 && cardNumber % 2 == 0)) {

        cardNumber = prompt(`Número inválido. 
Por favor digite um número número par entre 4 e 14`);
    }

    shuffleCards();
    displayCards();
}


function comparador() { //instruções de randomização?
    return Math.random() - 0.5; //por que -0.5?

}



function shuffleCards() {

    //vou sortear números. valores possíveis: entre 1 e 7
    for (i = 1; i <= cardNumber / 2; i++) {
        cards.push(i, i); //adicionar de 2 em 2 cartas do mesmo tipo na array
    }
    //depois embaralha/dispõe de acordo com a função "comparador"
    cards.sort(comparador);

}


function displayCards() {
    //vou pegar o número de cartas e ir depositando carta a carta na tela
    //primeiro seleciono a classe cards-container
    const container = document.querySelector("#cards-container");

    for (i = 0; i < cards.length; i++) {
        //a cada iteração, inserir uma carta no meu container.
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        container.appendChild(cardDiv) //adicionando um filho dentro do container

        //atribuindo a figura do papagaio estático à frente da carta 
        const cardFront = document.createElement("div");
        cardFront.classList.add("front-card");

        //atribuindo o gif do papagaio à parte de trás da carta
        const cardBack = document.createElement("div");
        cardBack.classList.add("hidden", "back-card");
        const parrot = document.createElement("img");
        parrot.src = `./images/parrot${cards[i]}.gif`;
        cardBack.appendChild(parrot);


        //adicionando as duas informações (frente e trás) para cada carta
        cardDiv.appendChild(cardFront);
        cardDiv.appendChild(cardBack);

        //quando clicar essa carta, eu quero que a função showCard seja executada
        cardDiv.onclick = showCard;
    }

}

function showCard(event) {
    console.log(event.path[1]);
    const cardDiv = event.path[1];
    const frontCard = cardDiv.querySelector(".front-card");
    frontCard.classList.add("hidden");
    const backCard = cardDiv.querySelector(".back-card");
    backCard.classList.remove("hidden");

}




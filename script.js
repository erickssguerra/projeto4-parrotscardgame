let cards = [];  //array que vai receber as cartas
let cardNumber = 14; // prompt("Digite o número de cartas para o jogo (número par entre 4 e 14):");


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
    return Math.random() - 0.5;
}



function shuffleCards() {

    //vou inserir números à array cards com os valores possíveis das cartas: entre 1 e 7
    for (i = 1; i <= cardNumber / 2; i++) {
        cards.push(i, i); //adicionar de 2 em 2 cartas do mesmo tipo na array
    }
    //depois embaralha os elementos da array de acordo com a função "comparador"
    // cards.sort(comparador);

}


function displayCards() { //dispor carta a carta na tela

    //primeiro seleciono a id cards-container em que as cartas serão dispostas
    const container = document.querySelector("#cards-container");

    for (i = 0; i < cards.length; i++) {
        //a cada iteração, inserir uma carta no meu container.


        //primeiro cria-se a div que vai receber a classe "card" do css 
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        container.appendChild(cardDiv) //adicionando uma card dentro do container


        //colocar um atributo na div card chamado position cujo valor é i, isto é, a posição no container
        //este valor vai dar a identidade da carta (que será usada para futura comparação)
        cardDiv.setAttribute("data-position", i)


        //atribuindo a figura do papagaio estático à frente da carta 
        const cardFront = document.createElement("div");
        cardFront.classList.add("front-card");
        cardDiv.appendChild(cardFront);


        //atribuindo o gif do papagaio à parte de trás da carta
        const cardBack = document.createElement("div");
        cardBack.classList.add("hidden", "back-card");
        const parrot = document.createElement("img"); //cria a tag <img> que vai receber...
        parrot.src = `./images/parrot${cards[i]}.gif`; //...cards[i] == valor contido no spot[i] (que já foi embaralhado)
        cardBack.appendChild(parrot);
        cardDiv.appendChild(cardBack);

        //quando clicar essa carta, eu quero que a função showCard seja executada

        cardDiv.onclick = showCard;

    }
}

let lastCard = -1; //posição -1 (inexistente) do container
function showCard(event) {

    //acessar a cardDiv (que é o 1º elemento filho do event)
    const cardDiv = event.path[1];

    //atribuir a posição da carta no container/tabuleiro (que será usada para comparação)
    const position = cardDiv.getAttribute("data-position");

    flipCard(position, false);

    if (lastCard !== -1 && position !== lastCard) {

        if (cards[position] == cards[lastCard]) {
            alert("ganhei um ponto");

        } else {
            flipCard(position, true);
            flipCard(lastCard, true);
            alert("errado");

        }
        lastCard = -1;
        return;
    }

    lastCard = position;

}

function flipCard(posicao, unflip) {

    const cardDiv = document.querySelectorAll(".card")[posicao];

    cardDiv.classList.toggle("flip")
    //atribuindo o front-card à variável cardFront
    const cardFront = cardDiv.querySelector(".front-card");


    //atribuindo a back-card à variável cardBack
    const cardBack = cardDiv.querySelector(".back-card");

    if (unflip == true) {
        //removendo a classe hidden da cardBack
        cardBack.classList.add("hidden");

        //adicionando a classe hidden à front-card
        cardFront.classList.remove("hidden");

    } else {
        cardBack.classList.remove("hidden");
        cardFront.classList.add("hidden");
    }
}
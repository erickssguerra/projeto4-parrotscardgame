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
    cards.sort(comparador);

}


function displayCards() { //dispor carta a carta na tela

    //primeiro seleciono a id cards-container em que as cartas serão dispostas
    const container = document.querySelector("#cards-container");

    for (i = 0; i < cards.length; i++) {
        //a cada iteração, inserir uma carta no meu container.


        //primeiro cria-se a div que vai receber a classe "card" do css 
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        const innerCardDiv = document.createElement("div");
        innerCardDiv.classList.add("inner-card");
        cardDiv.appendChild(innerCardDiv)

        container.appendChild(cardDiv) //adicionando div filha chamada cardDiv dentro do container


        //colocar um atributo na div card chamado position cujo valor é i, isto é, a posição no container
        //este valor vai dar a identidade da carta (que será usada para futura comparação)
        cardDiv.setAttribute("data-position", i);
        cardDiv.setAttribute("onclick", "clickCard(this)");


        //atribuindo a figura do papagaio estático à frente da carta 
        const cardFront = document.createElement("div");
        cardFront.classList.add("front-card", "face");
        const parrotFront = document.createElement("img");
        parrotFront.src = `./images/front.png`;
        cardFront.appendChild(parrotFront);
        innerCardDiv.appendChild(cardFront);


        //atribuindo o gif do papagaio à parte de trás da carta
        const cardBack = document.createElement("div");
        cardBack.classList.add("back-card", "face");
        const parrot = document.createElement("img"); //cria a tag <img> que vai receber...
        parrot.src = `./images/parrot${cards[i]}.gif`; //...cards[i] == valor contido no spot[i] (que já foi embaralhado)
        cardBack.appendChild(parrot);
        innerCardDiv.appendChild(cardBack);
    }
}

function flipCard(position) {
    const inner = document.querySelectorAll(".inner-card")[position]
    inner.classList.toggle("flip")
}

function isFlipped(position) {
    const inner = document.querySelectorAll(".inner-card")[position]
    return inner.classList.contains("flip")
}

let lastCard = -1
let lock = false

function clickCard(element) {
    const position = element.getAttribute("data-position")

    if (isFlipped(position) || lock)
        return

    lock = true
    flipCard(position, false)

    if (lastCard !== -1 && position !== lastCard) {

        if (cards[position] == cards[lastCard]) {
            console.log("acertou")
            lock = false
        } else {
            const currentLastCard = lastCard
            setTimeout(() => {
                flipCard(position);
                flipCard(currentLastCard);
                lock = false
            }, 2000)


            console.log("errado");

        }
        lastCard = -1;
        return;
    }

    lastCard = position;
    lock = false
}



/*
let lastCard = -1; //posição -1 (inexistente) do container

function clickCard(event) {
    console.log(event)
   
    //acessar a cardDiv (que é o 1º elemento filho do event)
    const cardDiv = event.path[0];
    cardDiv.classList.toggle("face");
  
    //atribuir a posição da carta no container/tabuleiro (que será usada para comparação)
    const position = cardDiv.getAttribute("data-position");

    flipCard(position, true);

    if (lastCard !== -1 && position !== lastCard) {

        if (cards[position] == cards[lastCard]) {
            alert("ganhei um ponto");

        } else {

            flipCard(position, false);

            flipCard(lastCard, false);

            alert("errado");

        }
        lastCard = -1;
        return;
    }

    lastCard = position;

}


function flipCard(position, show) {

    const cardDiv = document.querySelectorAll(".card")[position];


    //atribuindo o front-card à variável cardFront
    const cardFront = cardDiv.querySelector(".front-card");

    //atribuindo a back-card à variável cardBack
    const cardBack = cardDiv.querySelector(".back-card");

    if (show == false) {
        //removendo a classe hidden da cardBack
        cardBack.classList.toggle("back-card");

        //adicionando a classe hidden à front-card
        cardFront.classList.toggle("front-card");

    } else {
        cardBack.classList.toggle("back-card");
        cardFront.classList.toggle("front-card");
    }
}
*/
let cardNumber;
let cards = [];  //array que vai receber as cartas


gameSettings();
function gameSettings() {

    cardNumber = prompt("Digite o número de cartas para o jogo (número par entre 4 e 14):");

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

        //adicionando a funçionalidade onclick na função clickCard
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

let lastCard = -1 //vai ser usada para dar a posição (começa com -1 pois é uma posição inexistente = não clicada)
let lock = false
let moves = 0

function clickCard(element) {

    // pego a posição do elemento clicado
    const position = element.getAttribute("data-position")


    //primeiro excluo a possibilidade de clicar numa carta que já está virada ou...
    //...numa carta que está proibida de virar (por ex: durante o intervalo de clicar em 2 cartas, ou em duas cartas já "acertadas")

    //para isso, verifico se isFlipped(position) retorna verdadeiro (ler linha de isFlipped abaixo)... 
    //...ou verifico se lock está verdadeiro.
    //se uma ou outra possibilidade for verdadeira, então, a função clickCard acaba
    if (isFlipped(position) || lock) {
        return
    } //caso contrário...
    // (isto é, se a carta clicada não estiver virada anteriormente ou a carta clicada não estiver proibida de ser clicada)

    lock = true //as cartas vão ser proibidas de serem clicadas
    flipCard(position) //dou toggle na carta[position] com a função flipCard

    //verifico...

    //...se: (I) a última carta clicada estiver não estiver na posição [-1] (isto é, se houver uma lastCard) e... 
    //... (II) a posição dessa carta clicada for ≠ da última carta clicada, (isto é, clicar na mesma carta)... OU SEJA...
    //...RESUMINDO: se a segunda carta clicada estiver apta de ser clicada, sem impedimentos pela regra, executa o que está dentro do {}
    if (lastCard !== -1 && position !== lastCard) {

        //o contador de jogadas é atualizado
        //note que o contador só é atualizado se exclusivamente duas cartas diferentes forem selecionadas (a position e a lastCard)
        updateCounter()

        //verificando se acertou ou não:
        //se o valor guardado pela posição da carta for igual ao valor guardado na posição da última carta, vc acertou
        if (cards[position] == cards[lastCard]) {

            console.log("acertou")
            lock = false //desativa o lock, isto é, outras cartas podem ser clicadas (não estão proibidas)
        }

        //caso contrário...
        else {

            //a última carta atual recebe a última carta
            const currentLastCard = lastCard

            //as duas cartas passam um tempo à mostra antes de serem escondidas
            setTimeout(() => {
                flipCard(position); //dá o toggle na carta daquela posição
                flipCard(currentLastCard); //dá o toggle na carta daquela posição
                lock = false; //desativa o lock, isto é, outras cartas podem ser clicadas depois de...
            }, 2000) //...2 segundos
            //note que o cronômetro só começa a contar depois que a segunda carta (currentLastCard) for clicada

            console.log("errado");

        }
        lastCard = -1; //zerou a posição do lastCard
        return; //acabou a função
    }

    //a linha abaixo será executada quando tivermos apenas a 1ª carta selecionada (todas os if acima só funcionam para 2 cartas selecionadas)
    lastCard = position; //atualiza a lastCard com a posição
    lock = false // desativa o lock
}

function flipCard(position) {

    //transformo todos os inner-card numa array --> nessa array seleciono o array[position]
    const inner = document.querySelectorAll(".inner-card")[position]

    //retorno com o toggle da classe flip. 
    inner.classList.toggle("flip")
}

function isFlipped(position) { //verificar se a carta clicada já estava clicada

    //transformo todos os inner-card numa array --> nessa array seleciono o array[position]
    const inner = document.querySelectorAll(".inner-card")[position]

    //retorno um resultado verdadeiro (se a carta estiver à mostra) ou falso (se a carta estiver escondida)
    return inner.classList.contains("flip")
}

function updateCounter() {
    moves++

    endGame();
}

function endGame() {
    const flippedCards = document.querySelectorAll(".flip")

    if (flippedCards.length == cardNumber) {

        setTimeout(() => {
            alert(`Você ganhou com ${moves} jogadas!`)
            restartGame();

        }, 1000);

    }
}

function restartGame() {
    const answer = prompt("Deseja recomeçar o jogo?");

    if (answer === "sim") {

        const container = document.querySelector("#cards-container");
        container.innerHTML = '';
        cards = [];
        moves = 0;
        gameSettings();

    } else {
        return
    }
}
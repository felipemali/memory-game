function init() {
  fetch(
    "http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json"
  )
    .then(function (response) {
      return response.json();
    })
    .then(({ data }) => {
      const qty = parseInt(document.getElementById("level").value);
      const cards = shuffleCards(Object.keys(data));
      criarCard(cards.slice(0, qty));
      document.getElementById("menu").style.display = "none";
    });
}

var selectedCard1, selectedCard2;

function shuffleCards(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function generateImg(champ, animation) {
  //return `<img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ}.jpg">`;
  return `<img class="animate__animated ${animation}"
   src="http://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${champ}.png">`;
}

function criarCard(cards) {
  const dupliacatedCards = [...cards, ...cards];

  const container = document.getElementById("cards");
  const randomCards = shuffleCards(dupliacatedCards);

  for (card of randomCards) {
    container.innerHTML += `<div class="card" data-card="${card}" data-disabled="false" onclick="virarCardClick(this)">
       ${generateImg("Shaco")}
      </div>`;
  }
}

function resetSelected() {
  selectedCard1 = undefined;
  selectedCard2 = undefined;
}

//Este é o primeiro click
function selectFirstCard(element) {
  selectedCard1 = element;
}

//Este é o segundo click
function selectSecondCard(element) {
  if (selectedCard1 === element) {
    return;
  }

  selectedCard2 = element;

  const isSameCard =
    selectedCard1.getAttribute("data-card") ===
    selectedCard2.getAttribute("data-card");

  if (isSameCard) {
    selectedCard2.setAttribute("data-disabled", "true");
    selectedCard1.setAttribute("data-disabled", "true");
    resetSelected();
  } else {
    setTimeout(() => {
      selectedCard1.innerHTML = generateImg("Shaco", "animate__flipInX");
      selectedCard2.innerHTML = generateImg("Shaco", "animate__flipInX");
      resetSelected();
    }, 1000);
  }
}

function isElementValid(element) {
  return (
    element.getAttribute("data-disabled") === "true" ||
    (selectedCard1 && selectedCard2)
  );
}

function revealCard(element) {
  const currentCardName = element.getAttribute("data-card");
  element.innerHTML = generateImg(currentCardName, "animate__flipInY");
}

function virarCardClick(element) {
  if (isElementValid(element)) {
    return;
  }

  revealCard(element);

  //Se existe o card1 então chama a função para o segundo - Ternario
  selectedCard1 ? selectSecondCard(element) : selectFirstCard(element);
}

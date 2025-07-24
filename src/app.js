const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = [
  { symbol: "♦", class: "diamond" },
  { symbol: "♥", class: "heart" },
  { symbol: "♠", class: "spade" },
  { symbol: "♣", class: "club" }
];

const cardContainer = document.getElementById("cardContainer");
const logContainer = document.getElementById("logContainer");
const drawBtn = document.getElementById("drawBtn");
const sortBtn = document.getElementById("sortBtn");

let cards = [];
let log = [];

const generateCard = () => {
  const valueIndex = Math.floor(Math.random() * values.length);
  const suit = suits[Math.floor(Math.random() * suits.length)];
  return {
    value: values[valueIndex],
    suit: suit.symbol,
    class: suit.class,
    rank: valueIndex
  };
};

const renderCard = (card) => {
  const div = document.createElement("div");
  div.className = `card ${card.class}`;
  div.innerHTML = `
    <div>${card.suit}</div>
    <div>${card.value}</div>
    <div>${card.suit}</div>
  `;
  return div;
};

drawBtn.addEventListener("click", () => {
  const count = parseInt(document.getElementById("cardCount").value);
  if (isNaN(count) || count <= 0) return;

  cards = [];
  log = [];
  cardContainer.innerHTML = "";
  logContainer.innerHTML = "";

  for (let i = 0; i < count; i++) {
    cards.push(generateCard());
  }

  cards.forEach(card => cardContainer.appendChild(renderCard(card)));
});

sortBtn.addEventListener("click", () => {
  if (cards.length === 0) return;

  let copy = [...cards];
  log = [];

  let wall = copy.length - 1;
  while (wall > 0) {
    let i = 0;
    while (i < wall) {
      if (copy[i].rank > copy[i + 1].rank) {
        [copy[i], copy[i + 1]] = [copy[i + 1], copy[i]];
        log.push([...copy]);
      }
      i++;
    }
    wall--;
  }

  cardContainer.innerHTML = "";
  copy.forEach(card => cardContainer.appendChild(renderCard(card)));

  logContainer.innerHTML = "";
  log.forEach((step, index) => {
    const stepDiv = document.createElement("div");
    const label = document.createElement("strong");
    label.innerText = `Step ${index + 1}`;
    stepDiv.className = "card-container";
    stepDiv.appendChild(label);

    step.forEach(card => {
      stepDiv.appendChild(renderCard(card));
    });

    logContainer.appendChild(stepDiv);
  });
});

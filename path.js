function getStyleValue(element, style) {
  return parseInt(window.getComputedStyle(element)[style].split("px")[0]);
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".die")
    .forEach((die) => (die.style.animationPlayState = "paused"));
});

class Game {
  constructor() {

    this.players = {
      human: [
        document.querySelector("#house1"), 
        document.querySelector("#house4")
      ], 
      bot: [
        document.querySelector("#house2"), 
        document.querySelector("#house3")
      ] 
    };

    this.activePlayer = [];
    this.isStarted = false;
    this.die1 = document.querySelector(".die1");
    this.die2 = document.querySelector(".die2");
  }

  getDie1Value() {
    console.log(this.die1.querySelectorAll('.dot').length)
    return this.die1.querySelectorAll(".dot").length;
  }

  getDie2Value() {
    console.log(this.die1.querySelectorAll('.dot').length)
    return this.die2.querySelectorAll(".dot").length;
  }

  initializeSelf() {
    this.setActivePlayer();
    gameInitialization();
    arrangePaths();
  }

  setActivePlayer() {
    document.querySelectorAll(".house").forEach((node) => {
      node.classList.remove("active");
      node.querySelectorAll(".seed").forEach((seed) => (seed.style.pointerEvents = "none"));
      for (let activeNode of this.activePlayer) {
        if (node.isSameNode(activeNode)) {
          activeNode.classList.add("active");
          activeNode.querySelectorAll(".seed").forEach((seed) => {
            seed.style.pointerEvents = "all";
          });
        }
      }
    });

    if (this.activePlayer == this.players.human) {
      document.querySelector("h1").textContent = "Your turn";
    } else {
      document.querySelector("h1").textContent = "Computer's turn";
    }
  }

  changeActivePlayer() {

    if (this.getDie1Value() == 6 && this.getDie2Value() == 6) {

      if (JSON.stringify(this.activePlayer.map((player) => player.id)) == JSON.stringify(this.players.human.map((player) => player.id))) {
        this.activePlayer = this.players.bot;
      } else {
        this.activePlayer = this.players.human;
      }
    } else {
      this.activePlayer = this.activePlayer
    }
    this.setActivePlayer();
    alert(JSON.stringify(this.activePlayer))
  }
}


const game = new Game();

game.initializeSelf();

function gameInitialization() {
  let pathIndex = 1;
  document.querySelector("h1").textContent = "game not started";
  for (let house of document.querySelectorAll(".house")) {
    if (house.id == "house1" || house.id == "house4") {
      horizontalFill(house);
      verticalFill(house);
    } else {
      verticalFill(house);
      horizontalFill(house);
    }
  }

  function horizontalFill(element) {
    let right = parseInt(window.getComputedStyle(element).right.split("px")[0]);
    let top = parseInt(window.getComputedStyle(element).top.split("px")[0]);

    if (top == 0) {
      for (let i = 0; i < 6; i++) {
        let path = document.createElement("div");
        path.className = "path";
        path.classList.add(`path${pathIndex}`);
        if (i == 1 && element.id == "house1") {
          path.style.background = window.getComputedStyle(element).background;
          path.classList.add("main");
          path.classList.add("house1");
        }
        document.querySelector(".ludo").appendChild(path);
        if (right == 0) {
          path.style.right = ((5 - i) * 48).toString() + "px";
        } else {
          path.style.left = (i * 48).toString() + "px";
        }
        path.style.top = window.getComputedStyle(element).height;

        if ((pathIndex + 1) % 13 == 0) {
          pathIndex += 2;
        } else {
          pathIndex++;
        }
      }
    } else {
      for (let i = 0; i < 6; i++) {
        let path = document.createElement("div");
        path.className = "path";
        path.classList.add(`path${pathIndex}`);
        document.querySelector(".ludo").appendChild(path);
        if (i == 1 && element.id == "house4") {
          path.style.background = window.getComputedStyle(element).background;
          path.classList.add("main");
          path.classList.add("house4");
        }
        if (right == 0) {
          path.style.right = (i * 48).toString() + "px";
        } else {
          path.style.left = ((5 - i) * 48).toString() + "px";
        }
        path.style.bottom = window.getComputedStyle(element).height;

        if ((pathIndex + 1) % 13 == 0) {
          pathIndex += 2;
        } else {
          pathIndex++;
        }
      }
    }
  }
  function verticalFill(element) {
    let left = parseInt(window.getComputedStyle(element).left.split("px")[0]);
    let top = parseInt(window.getComputedStyle(element).top.split("px")[0]);
    for (let i = 5; i >= 0; i--) {
      let path = document.createElement("div");
      path.className = "path";
      path.classList.add(`path${pathIndex}`);
      if ((pathIndex + 1) % 13 == 0) {
        pathIndex += 2;
      } else {
        pathIndex++;
      }

      document.querySelector(".ludo").appendChild(path);
      if (top == 0) {
        if (i == 4 && element.id == "house2") {
          path.style.background = window.getComputedStyle(element).background;
          path.classList.add("main");
          path.classList.add("house2");
        }
        path.style.top = (i * 48).toString() + "px";
        if (left == 0) {
          path.style.left = window.getComputedStyle(element).width;
        } else {
          path.style.right = window.getComputedStyle(element).width;
          path.style.top = ((5 - i) * 48).toString() + "px";
        }
      } else {
        if (i == 4 && element.id == "house3") {
          path.style.background = window.getComputedStyle(element).background;
          path.classList.add("main");
          path.classList.add("house3");
        }
        path.style.bottom = (i * 48).toString() + "px";
        if (left == 0) {
          path.style.bottom = ((5 - i) * 48).toString() + "px";
          path.style.left = window.getComputedStyle(element).width;
        } else path.style.right = window.getComputedStyle(element).width;
      }
    }
  }

  // Die Functionality
  function dieValue() {
    const center = document.querySelector(".center");
    const dievalues = document.querySelectorAll(".value");

    center.addEventListener("click", () => {
      function init() {
        game.isStarted = true;
        game.activePlayer = game.players.human
        game.setActivePlayer()
      }

      game.isStarted ? game.changeActivePlayer() : init();

      document.querySelectorAll(".seed").forEach((seed) => seed.classList.remove("selectable"));
      document.querySelectorAll(".value").forEach((value) => (value.style.display = "block"));
      die1 = document.querySelector(".die1");
      die2 = document.querySelector(".die2");


      function random(die) {
        die.style.animationPlayState = "running";
        setTimeout(() => {
          die.style.animationPlayState = "paused";
        }, 500);
        die.querySelectorAll(".parent").forEach((node) => node.remove());
        let randomValue = Math.ceil(Math.random() * 6);

        // FIXME: dont forget to change this
        randomValue = 6;


        for (let i = 0; i < randomValue; i++) {
          let parent = document.createElement("div");
          parent.className = "parent";
          let dot = document.createElement("div");
          dot.className = "dot";
          parent.appendChild(dot);
          die.appendChild(parent);
        }
      }
      random(die1);
      random(die2);

      document.querySelector(".value1").textContent = die1.querySelectorAll(".dot").length;
      document.querySelector(".value2").textContent = die2.querySelectorAll(".dot").length;
      document.querySelector(".die-values").style.display = "flex";

    });

    dievalues.forEach((dievalue) => dievalue.addEventListener("click", (e) => dance(e)));

    function dance(e) {
      e.currentTarget.removeEventListener('click', (e) => dance(e));

      e.currentTarget.style.display = "none";

      e.stopPropagation();

      let element = e.currentTarget;
      let houseId = game.activePlayer.map((house) => house.id);

      function move(e) {
        document.querySelectorAll('.seed').forEach(seed => { seed.removeEventListener('click', move) });
        moveseed(e.currentTarget, element)
      }

      seedSelectability();
      document.querySelectorAll(".seed").forEach((seed) => {
        if (houseId.indexOf(getSeedHouse(seed) !== -1)) {
          seed.addEventListener("click", move)
        } else {
          seed.removeEventListener('click', move)
        }
      });

    }
  }

  dieValue();
  sampleMiddleFill();
  function sampleMiddleFill() {
    let houses = [
      { id: "house1", position: "top left" },
      { id: "house2", position: "right top" },
      { id: "house3", position: "left bottom" },
      { id: "house4", position: "bottom right" },
    ];
    for (let house of houses) {
      fillMiddle(house);
      seedCreator(house);
    }

    function fillMiddle(house) {
      let element = document.getElementById(house.id);
      for (let i = 0; i < 6; i++) {
        let path = document.createElement("div");
        path.className = "path";
        if (i !== 0) {
          path.style.background = window.getComputedStyle(element).background;
          path.classList.add(house.id + "entrance");
        } else {
          if (house.id == "house1") path.classList.add(`path52`);
          else if (house.id == "house2") path.classList.add(`path13`);
          else if (house.id == "house3") path.classList.add(`path39`);
          else path.classList.add(`path26`);
        }
        path.style[house.position.split(" ")[1]] = (i * 48).toString() + "px";
        path.style[house.position.split(" ")[0]] = parseInt(window.getComputedStyle(element).width.split("px")) + 48 + "px";
        document.querySelector(".ludo").appendChild(path);
      }
    }
    function seedCreator(house) {
      for (let i = 0; i < 4; i++) {
        seed = document.createElement("div");
        div = document.createElement("div");
        div.className = "div";
        seed.style.background = window.getComputedStyle(
          document.querySelector(`#${house.id}`)
        ).background;
        seed.className = `seed unmoved ${house.id}`;
        seed.style.pointerEvents = "none";
        div.appendChild(seed);
        document.querySelector(`#${house.id}`).appendChild(div);
      }
    }
  }
}
function arrangePaths() {
  for (let i = 1; i <= 52; i++) {
    let ludo = document.querySelector(".ludo");
    let node = document.querySelector(`.path${i}`);
    ludo.insertBefore(node, document.querySelector(".center"));
  }
}
function seedSelectability(value) {

  for (let seed of document.querySelectorAll(".seed"))
    seed.classList.remove("selectable");

  for (let player of game.activePlayer) {
    document.querySelectorAll(`.seed.${player.id}`).forEach((seed) => seed.classList.add("selectable"));
  }
}
function seedActivityCheck(seed) {
  for (let stuff of game.activePlayer) {
    if (seed.classList.contains(stuff.id)) {
      return true;
    }
  }
  return false;
}
function getSeedHouse(seed) {
  for (let i = 1; i <= 4; i++) {
    if (seed.classList.contains(`house${i}`)) {
      return `house${i}`;
    }
  }
}
async function moveseed(seed, element) {
  if (game.isStarted && seedActivityCheck(seed)) {
    if (seed.classList.contains("unmoved") && element.textContent == "6") {
      seed.classList.remove("unmoved");
      seed.classList.add("moved");
      seed.setAttribute("count", 0);

      if (document.querySelector(`.${getSeedHouse(seed)}.main`).childNodes.length != 0 && !isSameHouse(document.querySelector(`.${getSeedHouse(seed)}.main`).firstElementChild, seed)) {
        removeElement(document.querySelector(`.${getSeedHouse(seed)}.main`).firstElementChild, seed);
        handleWin()
      } else {
        document.querySelector(`.${getSeedHouse(seed)}.main`).appendChild(seed);
      }
    } else if (seed.classList.contains("moved")) {
      let count = 0
      for (let house of game.activePlayer) {
        count += document.querySelectorAll(`.${house.id}.seed.moved`).length
      }
      console.log(count)

      if (count == 1) {
        let sum = parseInt(document.querySelector('.value1').textContent) + parseInt(document.querySelector('.value2').textContent);
        element.textContent = sum;
        document.querySelector('.value1').style.display = 'none';
        document.querySelector('.value2').style.display = 'none';
      }
      for (let i = 0; i < parseInt(element.textContent); i++) {
        if (seed.getAttribute("count") != 50 && seed.getAttribute("count") <= 56) {
          seed.setAttribute("count", parseInt(seed.getAttribute("count")) + 1);
          if (seed.getAttribute('count') == 56 && i == parseInt(element.textContent) - 1) {
            removeElement(null, seed)
            handleWin()
          }
          if (seed.parentElement.classList.contains("path52")) {
            document.querySelector(".path1").appendChild(seed);
          } else {
            if (seed.parentElement.nextElementSibling.childNodes.length != 0 && i == parseInt(element.textContent) - 1 && !isSameHouse(seed.parentElement.nextElementSibling.firstElementChild, seed)) {
              removeElement(seed.parentElement.nextElementSibling.firstElementChild, seed);
              handleWin()
            } else {
              seed.parentElement.nextElementSibling.append(seed)
            }
          }
          await sleep();
          function sleep() {
            return new Promise((resolve) => {
              setTimeout(resolve, 400);
            });
          }
        } else if (seed.getAttribute("count") == 50) {
          document.querySelector(`.path.${getSeedHouse(seed)}entrance`).appendChild(seed);
          seed.setAttribute("count", parseInt(seed.getAttribute("count")) + 1);
          await sleep();
        }
      }
    }
  }
  element.textContent = 0;
}
function removeElement(old, newElement) {
  console.log(old)
  console.log(newElement)
  if (old !== null) {
    let elementHouse = getSeedHouse(old);
    old.classList.remove('moved');
    old.classList.add('unmoved');
    let house = document.querySelector(`.house#${elementHouse}`);
    house.querySelectorAll('.div').forEach(div => {
      if (div.childElementCount == 0) div.append(old);
    })
  }
  if (getSeedHouse(newElement) == 'house1' || getSeedHouse(newElement) == 'house4') {
    newParent = document.querySelector('.seedsWon.player1')
    newParent.appendChild(newElement)
    console.log(newParent)
    console.log(newElement)
  } else {
    newParent = document.querySelector('.seedsWon.player2');
    newParent.appendChild(newElement);
    console.log(newParent);
    console.log(newElement)
    newParent.append(newElement)
  }
}
function isSameHouse(first, second) {
  firstHouse = getSeedHouse(first);
  secondHouse = getSeedHouse(second);

  if (firstHouse == secondHouse) {
    return true
  } else if ((firstHouse == 'house1' && secondHouse == 'house4') || (firstHouse == 'house4' && secondHouse == 'house1')) {
    return true
  } else if ((firstHouse == 'house2' && secondHouse == 'house3') || (firstHouse == 'house3' && secondHouse == 'house2')) {
    return true
  } else {
    return false
  }
}
function checkWinner() {
  if (document.querySelector('.seedsWon.player1').querySelectorAll('.seed').length == 8) {
    return { bool: true, winner: game.players.human }
  } else if (document.querySelector('.seedsWon.player2').querySelectorAll('.seed').length == 8) {
    return { bool: true, winner: game.players.bot }
  } else {
    return { bool: false, winner: null }
  }
}
function handleWin() {
  let winner = checkWinner()
  if (winner.bool) {
    if (winner.winner == game.human.player) {
      alert('Player1 won')
    } else {
      alert('Player2 won')
    }
    return new Promise(resolve => {
      setTimeout(() => {
        resolve
        location.reload()
      }, 5000)
    })
  }
}
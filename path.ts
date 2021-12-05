function sleep() {
    return new Promise((resolve) => {
        setTimeout(resolve, 400);
    });
}

function getStyleValue(element: Element, style: string) {
    return parseInt(getComputedStyle(element)[style].split("px")[0]);
}

document.addEventListener("DOMContentLoaded", () => {
    (document
        .querySelectorAll(".die") as NodeListOf<HTMLDivElement>)
        .forEach((die) => (die.style.animationPlayState = "paused"));
});


enum StaticUsers {
    computer = 'computer',
    human = 'human'
}

type Player = {
    houses: HTMLDivElement[],
    name: string,
}

class Game {

    players: Player[];
    activePlayer: Player;
    isStarted: boolean;
    die1: HTMLDivElement;
    die2: HTMLDivElement;

    constructor() {

        this.players = [
            {
                name: StaticUsers.human,
                houses: [
                    document.querySelector('#house1'),
                    document.querySelector('#house4')
                ]
            },
            {
                name: StaticUsers.computer,
                houses: [
                    document.querySelector('#house2'),
                    document.querySelector('#house3')
                ]
            }
        ];

        this.activePlayer = null;
        this.isStarted = false;
        this.die1 = document.querySelector(".die1");
        this.die2 = document.querySelector(".die2");
    }

    getDie1Value(): number {
        return this.die1.querySelectorAll(".dot").length;
    }

    getDie2Value(): number {
        return this.die2.querySelectorAll(".dot").length;
    }

    initializeSelf(): void {
        this.setActivePlayer();
        gameInitialization();
        arrangePaths();
    }

    getPlayerFromName(username: string): Player {
        const user = this.players.find(player => player.name === username)
        return user;
    }

    setActivePlayer(): void {
        const houses = document.querySelectorAll(".house") as NodeListOf<HTMLDivElement>

        houses.forEach(house => {

            house.classList.remove("active");

            const seeds = house.querySelectorAll(".seed") as NodeListOf<HTMLDivElement>;

            seeds.forEach((seed) => (seed.style.pointerEvents = "none"));

            for (let activeHouse of this.activePlayer?.houses || []) {
                if (house.isSameNode(activeHouse)) {
                    activeHouse.classList.add("active");
                    (activeHouse.querySelectorAll(".seed") as NodeListOf<HTMLDivElement>).forEach((seed) => {
                        seed.style.pointerEvents = "all";
                    });
                }
            }
        });

        if (this.activePlayer == this.getPlayerFromName(StaticUsers.human)) {
            document.querySelector("h1").textContent = "Your turn";
        } else {
            document.querySelector("h1").textContent = "Computer's turn";
        }
    }

    changeActivePlayer() {

        /*
         *  If the value of both dice is not 6, we change the current user, 
         *  If not, the current user continues playing
         */

        if (!(
            this.getDie1Value() === 6 &&
            this.getDie2Value() === 6
        )) {
            if (this.activePlayer.name === StaticUsers.human) {
                this.activePlayer = this.getPlayerFromName(StaticUsers.computer);
            } else {
                this.activePlayer = this.getPlayerFromName(StaticUsers.human);
            }
        }

        this.setActivePlayer();
    }
}


const game = new Game();

game.initializeSelf();

function gameInitialization(): void {
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

    function horizontalFill(element: Element) {
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
    function verticalFill(element: Element) {
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
        const dievalues = document.querySelectorAll(".value") as NodeListOf<HTMLDivElement>;

        center.addEventListener("click", () => {
            function init() {
                game.isStarted = true;
                game.activePlayer = game.getPlayerFromName(StaticUsers.human)
                game.setActivePlayer()
            }

            game.isStarted ? game.changeActivePlayer() : init();

            document.querySelectorAll(".seed").forEach((seed) => seed.classList.remove("selectable"));
            document.querySelectorAll(".value").forEach((value) => (value.style.display = "block"));

            const value1Button = document.querySelector(".value1");
            const value2Button = document.querySelector(".value2");


            function random(die: HTMLDivElement) {
                die.style.animationPlayState = "running";
                setTimeout(() => {
                    die.style.animationPlayState = "paused";
                }, 500);
                die.querySelectorAll(".parent").forEach((node) => node.remove());
                let randomValue = Math.ceil(Math.random() * 6);


                for (let i = 0; i < randomValue; i++) {
                    let parent = document.createElement("div");
                    parent.className = "parent";
                    let dot = document.createElement("div");
                    dot.className = "dot";
                    parent.appendChild(dot);
                    die.appendChild(parent);
                }
            }

            alert(getComputedStyle(value1Button).display)

            if (
                game.isStarted &&
                (getComputedStyle(value1Button).display === 'flex' ||
                    getComputedStyle(value2Button).display === 'flex')
            ) {
                alert('Please make a valid move')
            } else {
                random(game.die1);
                random(game.die2);

                value1Button.textContent = game.die1.querySelectorAll(".dot").length.toString();
                value2Button.textContent = game.die2.querySelectorAll(".dot").length.toString();

                (document.querySelector(".die-values") as HTMLDivElement).style.display = "flex";
            }
        });

        dievalues.forEach((dievalue) => dievalue.addEventListener("click", (e) => dance(e)));

        function dance(e: Event) {
            e.currentTarget.removeEventListener('click', dance);

            e.currentTarget.style.display = "none";

            e.stopPropagation();

            let element = e.currentTarget;
            let activeHouseIds = game.activePlayer.houses.map((house) => house.id);

            function move(e) {

                const moved = moveseed(e.currentTarget, element as HTMLDivElement)

                if (moved) {
                    // remove all the click listeners from the seed
                    document.querySelectorAll('.seed').forEach(seed => { seed.removeEventListener('click', move) });
                }
            }

            seedSelectability();

            (document.querySelectorAll(".seed") as NodeListOf<HTMLDivElement>).forEach((seed) => {

                /*
                 *  if the id of the current seed is contained in the ids active player
                 *  add a listener to the seed, if not remove the event listener 
                 */

                if (activeHouseIds.indexOf(getSeedHouse(seed)) !== -1) {
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
                path.style[house.position.split(" ")[0]] = parseInt(getComputedStyle(element).width.split("px")[0]) + 48 + "px";
                document.querySelector(".ludo").appendChild(path);
            }
        }

        function seedCreator(house) {
            for (let i = 0; i < 4; i++) {
                const seed = document.createElement("div");
                const div = document.createElement("div");
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

function seedSelectability() {

    for (let seed of document.querySelectorAll(".seed"))
        seed.classList.remove("selectable");

    for (let house of game.activePlayer.houses) {
        document.querySelectorAll(`.seed.${house.id}`).forEach((seed) => seed.classList.add("selectable"));
    }
}

function seedActivityCheck(seed: HTMLDivElement) {
    for (let house of game.activePlayer.houses) {
        if (seed.classList.contains(house.id)) {
            return true;
        }
    }
    return false;
}

function getSeedHouse(seed: HTMLDivElement) {
    for (let i = 1; i <= 4; i++) {
        if (seed.classList.contains(`house${i}`)) {
            return `house${i}`;
        }
    }
}

async function moveseed(seed: HTMLDivElement, diceElement: HTMLDivElement): boolean {

    enum SeedPossibilities {
        HAS_MOVED,
        ELEMENT_EXISTS_IN_DESTINATION,
        ELEMENT_IN_DESTINATION_IS_OF_SAME_HOUSE,
        VALUE_IS_6,
        MOVED_50_TIMES,
        MOVED_MORE_THAN_50_TIMES,
        MOVED_LESS_THAN_50_TIMES
    }

    let hasSeedMoved: boolean = false;
    const dieValue = parseInt(diceElement.textContent);

    function takeAction(
        seed: HTMLDivElement,
        possibleAction: SeedPossibilities,
        isTrue: Function,
        isFalse: Function,
    ) {
        switch (possibleAction) {
            case SeedPossibilities.HAS_MOVED:
                seed.classList.contains('unmoved') ? isTrue() : isFalse();
                break;

            case SeedPossibilities.ELEMENT_EXISTS_IN_DESTINATION:
                takeAction(
                    seed,
                    SeedPossibilities.HAS_MOVED,

                    // if the seed has moved
                    function () {
                        // get the seed path number
                        const seedParentElementPathNumber = parseInt(seed.parentElement.classList.item(1).split('path')[1]);

                        const seedDestinationParent = document.querySelector(`.path${seedParentElementPathNumber + dieValue}`)

                        seedDestinationParent.hasChildNodes() ? isTrue(seedDestinationParent.firstElementChild) : isFalse()
                    },
                    // if the seed has not moved
                    function () {
                        const seedHouse = getSeedHouse(seed);
                        const seedHouseInitPath = document.querySelector(`path main ${seedHouse}`)

                        seedHouseInitPath.hasChildNodes() ? isTrue() : isFalse()
                    }
                )
                break;
            case SeedPossibilities.VALUE_IS_6:
                dieValue === 6 ? isTrue() : isFalse()
                break;
            case SeedPossibilities.MOVED_50_TIMES:
                let timesMoved = parseInt(seed.getAttribute('count'))
                timesMoved === 50 ? isTrue() : isFalse()
                break;
            case SeedPossibilities.MOVED_LESS_THAN_50_TIMES:
                timesMoved < 50 ? isTrue() : isFalse()
                break;
            case SeedPossibilities.MOVED_MORE_THAN_50_TIMES:
                timesMoved > 50 ? isTrue() : isFalse()
                break;

        }
    }

    takeAction(
        seed,
        SeedPossibilities.ELEMENT_EXISTS_IN_DESTINATION,
        function(oldElement){
            for(let i = 0; i < dieValue; i++){
                
            }
        },
        function(){}
    )


    if (game.isStarted && seedActivityCheck(seed)) {



        // the seed has not moved at all
        if (seed.classList.contains('unmoved')) {
            if (dieValue === 6) {
                moveToNextPhase(seed, seed.parentElement.nextElementSibling)
            }
        }

        if (seed.classList.contains("unmoved")) {

            if (dieValue === 6) {

            }

            // the next two line updates the seed movement state
            seed.classList.remove("unmoved");
            seed.classList.add("moved");
            seed.setAttribute("count", '0'); // helps us know the number of moves the seed has made

            const seedKind = document.querySelector(`.${getSeedHouse(seed)}.main`).firstElementChild;

            // TODO: Comment this goddamn thing

            /*
             * If there are still seeds in the house of the seed that was currently seleected
             * and they are not of 
             */

            if (
                document.querySelector(`.${getSeedHouse(seed)}.main`).childNodes.length != 0
                && !isSameHouse(seedKind, seed)
            ) {
                removeElement(document.querySelector(`.${getSeedHouse(seed)}.main`).firstElementChild, seed);
                handleWin()
            } else {
                document.querySelector(`.${getSeedHouse(seed)}.main`).appendChild(seed);
            }
        } else if (seed.classList.contains("moved")) {
            alert('this stuff should move now')


            // let sum = parseInt(document.querySelector('.value1').textContent) + parseInt(document.querySelector('.value2').textContent);
            // diceElement.textContent = sum;
            document.querySelector('.value1').style.display = 'none';
            document.querySelector('.value2').style.display = 'none';

            if (dieValue + seedInitialCountAttribute > 55) {
                alert('this move is not valid')
                game.changeActivePlayer()
            } else if (dieValue + seedInitialCountAttribute === 55) {
                removeElement(null, seed);
                handleWin()
            } else {
                for (let i = 1; i <= dieValue; i++) {
                    seed.setAttribute('count', (seedInitialCountAttribute + i).toString())
                    seed.parentElement.nextElementSibling.append(seed)
                    await sleep()
                }
            }

            // for (let i = 0; i < dieValue; i++) {
            //     if (parseInt(seed.getAttribute("count")) <= 50) {
            //         seed.setAttribute("count", (parseInt(seed.getAttribute("count")) + 1).toString());
            //         if (parseInt(seed.getAttribute('count')) === 56 && i == parseInt(diceElement.textContent) - 1) {
            //             removeElement(null, seed)
            //             handleWin()
            //         }
            //         if (seed.parentElement.classList.contains("path52")) {
            //             document.querySelector(".path1").appendChild(seed);
            //         } else {
            //             if (seed.parentElement.nextElementSibling.childNodes.length != 0 && i == parseInt(element.textContent) - 1 && !isSameHouse(seed.parentElement.nextElementSibling.firstElementChild, seed)) {
            //                 removeElement(seed.parentElement.nextElementSibling.firstElementChild, seed);
            //                 handleWin()
            //             } else {
            //                 seed.parentElement.nextElementSibling.append(seed)
            //             }
            //         }

            //     } else if (seed.getAttribute("count") == 50) {
            //         document.querySelector(`.path.${getSeedHouse(seed)}entrance`).appendChild(seed);
            //         seed.setAttribute("count", parseInt(seed.getAttribute("count")) + 1);
            //         await sleep();
            //     }
            // }
        }
    }
    diceElement.textContent = String(0);
    return seedHasMoved;
}

/* 
 *  this is the function that removes handles the removing of element when there's a win
 *  takes two arguments: old and newElement, old is the element that was there before
 *  and is going back to his house. New is the one that ate the old one
 *  
 *  the first argument can be null: if and only if the element is removed by itself i.e. after completing
 *  its complete journey through the board
*/
function removeElement(old, newElement) {
    console.log(old)
    console.log(newElement)
    if (old !== null) {
        let elementHouse = getSeedHouse(old);
        old.classList.remove('moved');
        old.classList.add('unmoved');
        let house = document.querySelector(`.house#${elementHouse}`);
        house.querySelectorAll('.div').forEach(div => {

            // put the seed that was eaten back to the element house
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
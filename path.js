var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function getStyleValue(element, style) {
    return parseInt(window.getComputedStyle(element)[style].split("px")[0]);
}
document.addEventListener("DOMContentLoaded", function () {
    document
        .querySelectorAll(".die")
        .forEach(function (die) { return (die.style.animationPlayState = "paused"); });
});
var StaticUsers;
(function (StaticUsers) {
    StaticUsers["computer"] = "computer";
    StaticUsers["human"] = "human";
})(StaticUsers || (StaticUsers = {}));
var Game = /** @class */ (function () {
    function Game() {
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
    Game.prototype.getDie1Value = function () {
        return this.die1.querySelectorAll(".dot").length;
    };
    Game.prototype.getDie2Value = function () {
        return this.die2.querySelectorAll(".dot").length;
    };
    Game.prototype.initializeSelf = function () {
        this.setActivePlayer();
        gameInitialization();
        arrangePaths();
    };
    Game.prototype.getPlayerFromName = function (username) {
        var user = this.players.find(function (player) { return player.name === username; });
        return user;
    };
    Game.prototype.setActivePlayer = function () {
        var _this = this;
        var houses = document.querySelectorAll(".house");
        houses.forEach(function (house) {
            var _a;
            house.classList.remove("active");
            var seeds = house.querySelectorAll(".seed");
            seeds.forEach(function (seed) { return (seed.style.pointerEvents = "none"); });
            for (var _i = 0, _b = ((_a = _this.activePlayer) === null || _a === void 0 ? void 0 : _a.houses) || []; _i < _b.length; _i++) {
                var activeHouse = _b[_i];
                if (house.isSameNode(activeHouse)) {
                    activeHouse.classList.add("active");
                    activeHouse.querySelectorAll(".seed").forEach(function (seed) {
                        seed.style.pointerEvents = "all";
                    });
                }
            }
        });
        if (this.activePlayer == this.getPlayerFromName(StaticUsers.human)) {
            document.querySelector("h1").textContent = "Your turn";
        }
        else {
            document.querySelector("h1").textContent = "Computer's turn";
        }
    };
    Game.prototype.changeActivePlayer = function () {
        /*
         *  If the value of both dice is not 6, we change the current user,
         *  If not, the current user continues playing
         */
        if (!(this.getDie1Value() === 6 &&
            this.getDie2Value() === 6)) {
            if (this.activePlayer.name === StaticUsers.human) {
                this.activePlayer = this.getPlayerFromName(StaticUsers.computer);
            }
            else {
                this.activePlayer = this.getPlayerFromName(StaticUsers.human);
            }
        }
        this.setActivePlayer();
    };
    return Game;
}());
var game = new Game();
game.initializeSelf();
function gameInitialization() {
    var pathIndex = 1;
    document.querySelector("h1").textContent = "game not started";
    for (var _i = 0, _a = document.querySelectorAll(".house"); _i < _a.length; _i++) {
        var house = _a[_i];
        if (house.id == "house1" || house.id == "house4") {
            horizontalFill(house);
            verticalFill(house);
        }
        else {
            verticalFill(house);
            horizontalFill(house);
        }
    }
    function horizontalFill(element) {
        var right = parseInt(window.getComputedStyle(element).right.split("px")[0]);
        var top = parseInt(window.getComputedStyle(element).top.split("px")[0]);
        if (top == 0) {
            for (var i = 0; i < 6; i++) {
                var path = document.createElement("div");
                path.className = "path";
                path.classList.add("path".concat(pathIndex));
                if (i == 1 && element.id == "house1") {
                    path.style.background = window.getComputedStyle(element).background;
                    path.classList.add("main");
                    path.classList.add("house1");
                }
                document.querySelector(".ludo").appendChild(path);
                if (right == 0) {
                    path.style.right = ((5 - i) * 48).toString() + "px";
                }
                else {
                    path.style.left = (i * 48).toString() + "px";
                }
                path.style.top = window.getComputedStyle(element).height;
                if ((pathIndex + 1) % 13 == 0) {
                    pathIndex += 2;
                }
                else {
                    pathIndex++;
                }
            }
        }
        else {
            for (var i = 0; i < 6; i++) {
                var path = document.createElement("div");
                path.className = "path";
                path.classList.add("path".concat(pathIndex));
                document.querySelector(".ludo").appendChild(path);
                if (i == 1 && element.id == "house4") {
                    path.style.background = window.getComputedStyle(element).background;
                    path.classList.add("main");
                    path.classList.add("house4");
                }
                if (right == 0) {
                    path.style.right = (i * 48).toString() + "px";
                }
                else {
                    path.style.left = ((5 - i) * 48).toString() + "px";
                }
                path.style.bottom = window.getComputedStyle(element).height;
                if ((pathIndex + 1) % 13 == 0) {
                    pathIndex += 2;
                }
                else {
                    pathIndex++;
                }
            }
        }
    }
    function verticalFill(element) {
        var left = parseInt(window.getComputedStyle(element).left.split("px")[0]);
        var top = parseInt(window.getComputedStyle(element).top.split("px")[0]);
        for (var i = 5; i >= 0; i--) {
            var path = document.createElement("div");
            path.className = "path";
            path.classList.add("path".concat(pathIndex));
            if ((pathIndex + 1) % 13 == 0) {
                pathIndex += 2;
            }
            else {
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
                }
                else {
                    path.style.right = window.getComputedStyle(element).width;
                    path.style.top = ((5 - i) * 48).toString() + "px";
                }
            }
            else {
                if (i == 4 && element.id == "house3") {
                    path.style.background = window.getComputedStyle(element).background;
                    path.classList.add("main");
                    path.classList.add("house3");
                }
                path.style.bottom = (i * 48).toString() + "px";
                if (left == 0) {
                    path.style.bottom = ((5 - i) * 48).toString() + "px";
                    path.style.left = window.getComputedStyle(element).width;
                }
                else
                    path.style.right = window.getComputedStyle(element).width;
            }
        }
    }
    // Die Functionality
    function dieValue() {
        var center = document.querySelector(".center");
        var dievalues = document.querySelectorAll(".value");
        center.addEventListener("click", function () {
            function init() {
                game.isStarted = true;
                game.activePlayer = game.getPlayerFromName(StaticUsers.human);
                game.setActivePlayer();
            }
            game.isStarted ? game.changeActivePlayer() : init();
            document.querySelectorAll(".seed").forEach(function (seed) { return seed.classList.remove("selectable"); });
            document.querySelectorAll(".value").forEach(function (value) { return (value.style.display = "block"); });
            var die1 = document.querySelector(".die1");
            var die2 = document.querySelector(".die2");
            function random(die) {
                die.style.animationPlayState = "running";
                setTimeout(function () {
                    die.style.animationPlayState = "paused";
                }, 500);
                die.querySelectorAll(".parent").forEach(function (node) { return node.remove(); });
                var randomValue = Math.ceil(Math.random() * 6);
                for (var i = 0; i < randomValue; i++) {
                    var parent_1 = document.createElement("div");
                    parent_1.className = "parent";
                    var dot = document.createElement("div");
                    dot.className = "dot";
                    parent_1.appendChild(dot);
                    die.appendChild(parent_1);
                }
            }
            random(die1);
            random(die2);
            var value1Button = document.querySelector(".value1");
            var value2Button = document.querySelector(".value2");
            value1Button.textContent = die1.querySelectorAll(".dot").length.toString();
            value2Button.textContent = die2.querySelectorAll(".dot").length.toString();
            document.querySelector(".die-values").style.display = "flex";
        });
        dievalues.forEach(function (dievalue) { return dievalue.addEventListener("click", function (e) { return dance(e); }); });
        function dance(e) {
            e.currentTarget.removeEventListener('click', dance);
            e.currentTarget.style.display = "none";
            e.stopPropagation();
            var element = e.currentTarget;
            var activeHouseIds = game.activePlayer.houses.map(function (house) { return house.id; });
            function move(e) {
                // remove all the click listeners from the seed
                document.querySelectorAll('.seed').forEach(function (seed) { seed.removeEventListener('click', move); });
                moveseed(e.currentTarget, element);
            }
            seedSelectability();
            document.querySelectorAll(".seed").forEach(function (seed) {
                /*
                 *  if the id of the current seed is contained in the ids active player
                 *  add a listener to the seed, if not remove the event listener
                 */
                if (activeHouseIds.indexOf(getSeedHouse(seed)) !== -1) {
                    seed.addEventListener("click", move);
                }
                else {
                    seed.removeEventListener('click', move);
                }
            });
        }
    }
    dieValue();
    sampleMiddleFill();
    function sampleMiddleFill() {
        var houses = [
            { id: "house1", position: "top left" },
            { id: "house2", position: "right top" },
            { id: "house3", position: "left bottom" },
            { id: "house4", position: "bottom right" },
        ];
        for (var _i = 0, houses_1 = houses; _i < houses_1.length; _i++) {
            var house = houses_1[_i];
            fillMiddle(house);
            seedCreator(house);
        }
        function fillMiddle(house) {
            var element = document.getElementById(house.id);
            for (var i = 0; i < 6; i++) {
                var path = document.createElement("div");
                path.className = "path";
                if (i !== 0) {
                    path.style.background = window.getComputedStyle(element).background;
                    path.classList.add(house.id + "entrance");
                }
                else {
                    if (house.id == "house1")
                        path.classList.add("path52");
                    else if (house.id == "house2")
                        path.classList.add("path13");
                    else if (house.id == "house3")
                        path.classList.add("path39");
                    else
                        path.classList.add("path26");
                }
                path.style[house.position.split(" ")[1]] = (i * 48).toString() + "px";
                path.style[house.position.split(" ")[0]] = parseInt(getComputedStyle(element).width.split("px")[0]) + 48 + "px";
                document.querySelector(".ludo").appendChild(path);
            }
        }
        function seedCreator(house) {
            for (var i = 0; i < 4; i++) {
                var seed = document.createElement("div");
                var div = document.createElement("div");
                div.className = "div";
                seed.style.background = window.getComputedStyle(document.querySelector("#".concat(house.id))).background;
                seed.className = "seed unmoved ".concat(house.id);
                seed.style.pointerEvents = "none";
                div.appendChild(seed);
                document.querySelector("#".concat(house.id)).appendChild(div);
            }
        }
    }
}
function arrangePaths() {
    for (var i = 1; i <= 52; i++) {
        var ludo = document.querySelector(".ludo");
        var node = document.querySelector(".path".concat(i));
        ludo.insertBefore(node, document.querySelector(".center"));
    }
}
function seedSelectability() {
    for (var _i = 0, _a = document.querySelectorAll(".seed"); _i < _a.length; _i++) {
        var seed = _a[_i];
        seed.classList.remove("selectable");
    }
    for (var _b = 0, _c = game.activePlayer.houses; _b < _c.length; _b++) {
        var house = _c[_b];
        document.querySelectorAll(".seed.".concat(house.id)).forEach(function (seed) { return seed.classList.add("selectable"); });
    }
}
function seedActivityCheck(seed) {
    for (var _i = 0, _a = game.activePlayer.houses; _i < _a.length; _i++) {
        var house = _a[_i];
        if (seed.classList.contains(house.id)) {
            return true;
        }
    }
    return false;
}
function getSeedHouse(seed) {
    for (var i = 1; i <= 4; i++) {
        if (seed.classList.contains("house".concat(i))) {
            return "house".concat(i);
        }
    }
}
function moveseed(seed, diceElement) {
    return __awaiter(this, void 0, void 0, function () {
        function sleep() {
            return new Promise(function (resolve) {
                setTimeout(resolve, 400);
            });
        }
        var seedKind, count, _i, _a, house, sum, i;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(game.isStarted && seedActivityCheck(seed))) return [3 /*break*/, 7];
                    if (!(seed.classList.contains("unmoved") && diceElement.textContent === "6")) return [3 /*break*/, 1];
                    // the next two line updates the seed movement state
                    seed.classList.remove("unmoved");
                    seed.classList.add("moved");
                    seed.setAttribute("count", '0'); // helps us know the number of moves the seed has made
                    seedKind = document.querySelector(".".concat(getSeedHouse(seed), ".main")).firstElementChild;
                    // TODO: Comment this goddamn thing
                    /*
                     * If there are still seeds in the house of the seed that was currently seleected
                     * and they are not of
                     */
                    if (document.querySelector(".".concat(getSeedHouse(seed), ".main")).childNodes.length != 0
                        && !isSameHouse(seedKind, seed)) {
                        removeElement(document.querySelector(".".concat(getSeedHouse(seed), ".main")).firstElementChild, seed);
                        handleWin();
                    }
                    else {
                        document.querySelector(".".concat(getSeedHouse(seed), ".main")).appendChild(seed);
                    }
                    return [3 /*break*/, 7];
                case 1:
                    if (!seed.classList.contains("moved")) return [3 /*break*/, 7];
                    count = 0;
                    for (_i = 0, _a = game.activePlayer; _i < _a.length; _i++) {
                        house = _a[_i];
                        count += document.querySelectorAll(".".concat(house.id, ".seed.moved")).length;
                    }
                    console.log(count);
                    if (count == 1) {
                        sum = parseInt(document.querySelector('.value1').textContent) + parseInt(document.querySelector('.value2').textContent);
                        element.textContent = sum;
                        document.querySelector('.value1').style.display = 'none';
                        document.querySelector('.value2').style.display = 'none';
                    }
                    i = 0;
                    _b.label = 2;
                case 2:
                    if (!(i < parseInt(element.textContent))) return [3 /*break*/, 7];
                    if (!(seed.getAttribute("count") != 50 && seed.getAttribute("count") <= 56)) return [3 /*break*/, 4];
                    seed.setAttribute("count", parseInt(seed.getAttribute("count")) + 1);
                    if (seed.getAttribute('count') == 56 && i == parseInt(element.textContent) - 1) {
                        removeElement(null, seed);
                        handleWin();
                    }
                    if (seed.parentElement.classList.contains("path52")) {
                        document.querySelector(".path1").appendChild(seed);
                    }
                    else {
                        if (seed.parentElement.nextElementSibling.childNodes.length != 0 && i == parseInt(element.textContent) - 1 && !isSameHouse(seed.parentElement.nextElementSibling.firstElementChild, seed)) {
                            removeElement(seed.parentElement.nextElementSibling.firstElementChild, seed);
                            handleWin();
                        }
                        else {
                            seed.parentElement.nextElementSibling.append(seed);
                        }
                    }
                    return [4 /*yield*/, sleep()];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 4:
                    if (!(seed.getAttribute("count") == 50)) return [3 /*break*/, 6];
                    document.querySelector(".path.".concat(getSeedHouse(seed), "entrance")).appendChild(seed);
                    seed.setAttribute("count", parseInt(seed.getAttribute("count")) + 1);
                    return [4 /*yield*/, sleep()];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 2];
                case 7:
                    element.textContent = 0;
                    return [2 /*return*/];
            }
        });
    });
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
    console.log(old);
    console.log(newElement);
    if (old !== null) {
        var elementHouse = getSeedHouse(old);
        old.classList.remove('moved');
        old.classList.add('unmoved');
        var house = document.querySelector(".house#".concat(elementHouse));
        house.querySelectorAll('.div').forEach(function (div) {
            // put the seed that was eaten back to the element house
            if (div.childElementCount == 0)
                div.append(old);
        });
    }
    if (getSeedHouse(newElement) == 'house1' || getSeedHouse(newElement) == 'house4') {
        newParent = document.querySelector('.seedsWon.player1');
        newParent.appendChild(newElement);
        console.log(newParent);
        console.log(newElement);
    }
    else {
        newParent = document.querySelector('.seedsWon.player2');
        newParent.appendChild(newElement);
    }
}
function isSameHouse(first, second) {
    firstHouse = getSeedHouse(first);
    secondHouse = getSeedHouse(second);
    if (firstHouse == secondHouse) {
        return true;
    }
    else if ((firstHouse == 'house1' && secondHouse == 'house4') || (firstHouse == 'house4' && secondHouse == 'house1')) {
        return true;
    }
    else if ((firstHouse == 'house2' && secondHouse == 'house3') || (firstHouse == 'house3' && secondHouse == 'house2')) {
        return true;
    }
    else {
        return false;
    }
}
function checkWinner() {
    if (document.querySelector('.seedsWon.player1').querySelectorAll('.seed').length == 8) {
        return { bool: true, winner: game.players.human };
    }
    else if (document.querySelector('.seedsWon.player2').querySelectorAll('.seed').length == 8) {
        return { bool: true, winner: game.players.bot };
    }
    else {
        return { bool: false, winner: null };
    }
}
function handleWin() {
    var winner = checkWinner();
    if (winner.bool) {
        if (winner.winner == game.human.player) {
            alert('Player1 won');
        }
        else {
            alert('Player2 won');
        }
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve;
                location.reload();
            }, 5000);
        });
    }
}

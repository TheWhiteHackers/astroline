let planetlist = [
    {
        name: "moon", image: "moon.png",
        distance: 0.384, density: 0, wind: 0, pressure: 3e-15, gravity: 1.62, temp: -20,
        distanceText: "0.384 million km", densityText: "Virtually none", windText: "None",
        pressureText: "~3x10^-15 bar", gravityText: "1.62 m/s2", tempText: "-20 C (avg)",
        deltaV: 3.2
    },
    {
        name: "mars", image: "mars.png",
        distance: 225, density: 0.020, wind: 30, pressure: 0.00636, gravity: 3.73, temp: -65,
        distanceText: "54.6 - 401.4 million km", densityText: "~0.020 kg/m3", windText: "2 - 30 m/s",
        pressureText: "6.36 mb", gravityText: "3.73 m/s2", tempText: "-65 C (avg)",
        deltaV: 3.6
    },
    {
        name: "venus", image: "venus.png",
        distance: 150, density: 65, wind: 1, pressure: 92, gravity: 8.87, temp: 464,
        distanceText: "38.2 - 261.0 million km", densityText: "~65 kg/m3", windText: "0.3 - 1.0 m/s (surface)",
        pressureText: "92 bars", gravityText: "8.87 m/s2", tempText: "464 C (avg)",
        deltaV: 3.5
    },
    {
        name: "saturn", image: "saturn.png",
        distance: 1430, density: 0.19, wind: 400, pressure: 1000, gravity: 11.19, temp: -140,
        distanceText: "1,205.5 - 1,658.6 million km", densityText: "0.19 kg/m3 (at 1 bar)", windText: "Up to 400 m/s",
        pressureText: ">1000 bars", gravityText: "11.19 m/s2", tempText: "-140 C (at 1 bar)",
        deltaV: 7.3
    },
    {
        name: "pluto", image: "pluto.png",
        distance: 5900, density: 0.0001, wind: 0, pressure: 0.000013, gravity: 0.62, temp: -225,
        distanceText: "4,284.7 - 7,528.0 million km", densityText: "Very thin (mostly nitrogen)", windText: "Not listed by NASA",
        pressureText: "~13 microbar", gravityText: "0.62 m/s2", tempText: "-225 C (avg)",
        deltaV: 8.2
    }
];

let itemeffects = [
    ["astronaut", 0, 80, 1000000],
    ["food", 0, 20, 100000],
    ["water", 0, 40, 100000],
    ["oxygen", 0, 30, 150000],
    ["fuel", 0, 100, 500000],
    ["shield", 0, 150, 800000],
    ["fins", 0, 50, 300000],
    ["hull", 0, 200, 600000],
    ["landing gear", 0, 120, 700000]
];

let astroneeds = [2.39, 2.79, 0.89];

const itemIds = ["astronautnum", "foodnum", "waternum", "oxygennum", "fuelnum",
                 "shieldnum", "thrusternnum", "hullnum", "landingnum"];

const DEFAULT_BUDGET = 150000000;

const LAUNCH_COST_PER_KG = 2720;
const ASTRONAUT_SEAT_PRICE = 55000000;

const ENGINE_ISP = 465.5;
const G0 = 9.80665;
const KG_PER_FUEL = 100;
const DAYS_PER_CRATE = 10;
const MISSION_DAYS = 10;

let budget = DEFAULT_BUDGET;
let currentPlanet = 0;
let totalScore = 0;

window.onload = start;

function start() {
    itemeffects[1][2] = astroneeds[0] * 10;
    itemeffects[2][2] = astroneeds[1] * 10;
    itemeffects[3][2] = astroneeds[2] * 10;

    itemeffects[0][3] = ASTRONAUT_SEAT_PRICE;
    for (let i = 1; i < itemeffects.length; i++) {
        itemeffects[i][3] = Math.round(itemeffects[i][2] * LAUNCH_COST_PER_KG);
    }

    setupPage();
    pickPlanet(0);

    document.getElementById("launchbtn").addEventListener("click", launch);
    document.getElementById("resetbtn").addEventListener("click", resetItems);
    document.getElementById("budgetinput").addEventListener("change", setBudget);
}

function setupPage() {
    let cards = document.querySelectorAll(".partofgrid");

    for (let i = 0; i < cards.length; i++) {
        let lines = cards[i].querySelectorAll("p");
        lines[1].textContent = formatMoney(itemeffects[i][3]);
        lines[2].textContent = itemeffects[i][2].toLocaleString() + " kg";

        cards[i].onclick = function () { getItem(i); };
        cards[i].oncontextmenu = function (event) {
            event.preventDefault();
            removeItem(i);
        };
        cards[i].tabIndex = 0;
        cards[i].setAttribute("role", "button");
        cards[i].onkeydown = function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                getItem(i);
            } else if (event.key === "Delete" || event.key === "Backspace") {
                event.preventDefault();
                removeItem(i);
            }
        };

        let minusBtn = document.createElement("button");
        minusBtn.className = "minusbtn";
        minusBtn.textContent = "−";
        minusBtn.setAttribute("aria-label", "remove one " + itemeffects[i][0]);
        minusBtn.onclick = function (event) {
            event.stopPropagation();
            removeItem(i);
        };
        minusBtn.onkeydown = function (event) {
            event.stopPropagation();
        };
        cards[i].appendChild(minusBtn);
    }

    let picker = document.getElementById("planetpicker");
    for (let i = 0; i < planetlist.length; i++) {
        let btn = document.createElement("button");
        btn.className = "planetbtn";
        btn.innerHTML = "<img src='imgs/" + planetlist[i].image + "' alt=''>" + planetlist[i].name;
        btn.onclick = function () { pickPlanet(i); };
        picker.appendChild(btn);
    }

    document.getElementById("budgetinput").value = budget;
}

function pickPlanet(index) {
    currentPlanet = index;

    let buttons = document.querySelectorAll(".planetbtn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.toggle("selected", i === index);
    }
    resetItems();
}

function setBudget() {
    let input = document.getElementById("budgetinput");
    let amount = Math.floor(Number(input.value));

    if (!(amount > 0)) {
        showMessage("Budget must be a number bigger than 0.");
        input.value = budget;
        return;
    }
    budget = amount;
    if (totalCost() > budget) {
        resetItems();
        showMessage("New budget is lower than your ship cost, so the items were reset.");
    } else {
        showMessage("Budget set to " + formatMoney(budget) + ".");
        updateDisplay();
    }
}

function getItem(i) {
    if (totalCost() + itemeffects[i][3] > budget) {
        showMessage("Not enough budget for " + itemeffects[i][0] + "!");
        return;
    }
    itemeffects[i][1]++;
    showMessage("");
    updateDisplay();
}

function removeItem(i) {
    if (itemeffects[i][1] > 0) {
        itemeffects[i][1]--;
        showMessage("");
        updateDisplay();
    }
}

function resetItems() {
    for (let i = 0; i < itemeffects.length; i++) {
        itemeffects[i][1] = 0;
    }
    showMessage("");
    updateDisplay();
}

function launch() {
    let reqs = getRequirements();
    let missing = [];

    for (let i = 0; i < reqs.length; i++) {
        let label = reqs[i][0];
        let needed = reqs[i][1];
        let have = reqs[i][2];
        if (have < needed) {
            missing.push(label + " (need " + (needed - have) + " more)");
        }
    }

    let success = (missing.length === 0);
    let astronauts = itemeffects[0][1];
    let points = 0;
    if (success) {
        points = astronauts * MISSION_DAYS * 5;
        totalScore += points;
    }

    let launchBtn = document.getElementById("launchbtn");
    launchBtn.disabled = true;
    showResult(success, points, missing);
}


function totalCost() {
    let cost = 0;
    for (let i = 0; i < itemeffects.length; i++) {
        cost += itemeffects[i][1] * itemeffects[i][3];
    }
    return cost;
}

function totalWeight() {
    let weight = 0;
    for (let i = 0; i < itemeffects.length; i++) {
        weight += itemeffects[i][1] * itemeffects[i][2];
    }
    return weight;
}

function planetNeeds(planet) {
    return {
        shield: 1 + Math.round(Math.log10(planet.density * 1000 + 1)) + (planet.temp > 100 ? 1 : 0),
        fins: 1 + Math.ceil(planet.wind / 100),
        hull: 1 + Math.round(Math.log10(planet.pressure * 1000 + 1)),
        gear: 1 + Math.round(planet.gravity / 3)
    };
}

function fuelNeededKg() {
    let planet = planetlist[currentPlanet];
    let dryMass = totalWeight() - itemeffects[4][1] * itemeffects[4][2];
    let deltaV = planet.deltaV * 1000;
    let exhaustSpeed = ENGINE_ISP * G0;
    return dryMass * (Math.exp(deltaV / exhaustSpeed) - 1);
}

function getRequirements() {
    let planet = planetlist[currentPlanet];
    let needs = planetNeeds(planet);
    let astronauts = itemeffects[0][1];

    let crates = Math.ceil(astronauts * MISSION_DAYS / DAYS_PER_CRATE);
    let food = crates;
    let water = crates;
    let oxygen = crates;

    let fuelNeeded = Math.ceil(fuelNeededKg() / KG_PER_FUEL);

    return [
        ["astronaut",     1,           itemeffects[0][1]],
        ["food",          food,        itemeffects[1][1]],
        ["water",         water,       itemeffects[2][1]],
        ["oxygen",        oxygen,      itemeffects[3][1]],
        ["fuel",          fuelNeeded,  itemeffects[4][1]],
        ["shield",        needs.shield, itemeffects[5][1]],
        ["fins",          needs.fins,  itemeffects[6][1]],
        ["hull",          needs.hull,  itemeffects[7][1]],
        ["landing gear",  needs.gear,  itemeffects[8][1]]
    ];
}

function formatMoney(amount) {
    return "$" + amount.toLocaleString();
}

function showMessage(text) {
    document.getElementById("message").textContent = text;
}

function updateDisplay() {
    for (let i = 0; i < itemeffects.length; i++) {
        document.getElementById(itemIds[i]).textContent = itemeffects[i][1];
    }

    let minusButtons = document.querySelectorAll(".minusbtn");
    for (let i = 0; i < minusButtons.length; i++) {
        minusButtons[i].disabled = (itemeffects[i][1] === 0);
    }

    document.getElementById("totalcost").textContent = formatMoney(totalCost());
    document.getElementById("weight").textContent = totalWeight().toLocaleString() + " kg";
    document.getElementById("budgetleft").textContent = formatMoney(budget - totalCost());
    document.getElementById("score").textContent = totalScore;

    let planet = planetlist[currentPlanet];
    document.getElementById("planetname").textContent = planet.name;
    document.getElementById("planetimg").src = "imgs/" + planet.image;
    document.getElementById("planetimg").alt = planet.name;
    document.getElementById("planetdistance").textContent = planet.distanceText;
    document.getElementById("planetdensity").textContent = planet.densityText;
    document.getElementById("planetwind").textContent = planet.windText;
    document.getElementById("planetpressure").textContent = planet.pressureText;
    document.getElementById("planetgravity").textContent = planet.gravityText;
    document.getElementById("planettemp").textContent = planet.tempText;
    document.getElementById("planetdeltav").textContent = planet.deltaV + " km/s";

    drawRequirements();
}

function drawRequirements() {
    let planet = planetlist[currentPlanet];
    let reqs = getRequirements();
    let html = "<h3>Needed for " + planet.name + " (" +
               Math.round(fuelNeededKg()).toLocaleString() + " kg of propellant)</h3>";

    for (let i = 0; i < reqs.length; i++) {
        let ok = reqs[i][2] >= reqs[i][1];
        let mark = ok ? "OK " : "NEED ";
        html += "<p class='" + (ok ? "req-ok" : "req-need") + "'>" + mark + reqs[i][0] +
                ": " + reqs[i][2] + " / " + reqs[i][1] + "</p>";
    }
    html += "<p class='hint'>Click a card to buy. Press − to remove.</p>";

    document.getElementById("requirements").innerHTML = html;
}

function showResult(success, points, missing) {
    let planet = planetlist[currentPlanet];
    let isLastPlanet = (currentPlanet === planetlist.length - 1);

    let shadow = document.createElement("div");
    shadow.id = "resultshadow";
    shadow.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; " +
                           "background:rgba(0,0,0,0.75); z-index:10;";

    let box = document.createElement("div");
    box.id = "resultbox";
    box.setAttribute("role", "dialog");
    box.style.cssText = "position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); " +
                        "background:white; color:#000080; border:4px solid #000080; " +
                        "border-radius:20px; padding:30px; z-index:11; text-align:center; " +
                        "max-width:80%; font-family:inherit;";

    let html = "";
    if (success) {
        html += "<h2>Mission SUCCESS to " + planet.name + "!</h2>";
        html += "<h3>Astronauts on board: " + itemeffects[0][1] + "</h3>";
        html += "<h3>Points earned: " + points + "</h3>";
        html += "<h3>Total score: " + totalScore + "</h3>";
        if (isLastPlanet) {
            html += "<p>You reached every planet!</p>";
        }
    } else {
        html += "<h2>Mission FAILED</h2>";
        html += "<p>Your ship can't make it to " + planet.name + ". Missing:</p>";
        for (let i = 0; i < missing.length; i++) {
            html += "<p>" + missing[i] + "</p>";
        }
    }
    box.innerHTML = html;

    let endBtn = document.createElement("button");
    endBtn.textContent = "End!";
    endBtn.onclick = function () {
        totalScore = 0;
        closeResult();
        pickPlanet(0);
    };

    let nextBtn = document.createElement("button");
    nextBtn.textContent = success ? "Continue!" : "Try again!";
    nextBtn.onclick = function () {
        closeResult();
        if (success) {
            pickPlanet((currentPlanet + 1) % planetlist.length);
        } else {
            resetItems();
        }
    };

    box.appendChild(endBtn);
    box.appendChild(nextBtn);
    document.body.appendChild(shadow);
    document.body.appendChild(box);
    nextBtn.focus();
}

function closeResult() {
    let shadow = document.getElementById("resultshadow");
    let box = document.getElementById("resultbox");
    if (shadow) { shadow.remove(); }
    if (box) { box.remove(); }

}

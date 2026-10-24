
// name, fuel-needed, heat-shield-needed, stering-fins-needed, hull-needed, landing-gear-needed
let planetlist = [
    ["moon", 1, 1, 1, 1, 1],
    ["mars", 2, 2, 1, 1, 2],
    ["venus", 2, 5, 3, 4, 3],
    ["saturn", 4, 3, 4, 5, 4], 
    ["kepler-70b", 5, 4, 5, 3, 5]
]

// name, number purchased, distance effect, weight effect (fuel effect), price
let itemeffects = [
    ["astronaut", 0, 0, 10, 1000000],
    ["food", 0, 0, 20, 200000],
    ["water", 0, 0, 30, 1231231],
    ["oxygen", 0, 0, 40, 1232343],
    ["fuel", 0, 100, 50, 324342],
    ["shield", 0, 0, 60, 1010001],
    ["fins", 0, 0, 70, 10000],
    ["hull", 0, 0, 80, 234234],
    ["landing gear", 0, 0, 90, 23423432]
]

// food-needed, water-needed, oxygen-needed
let astroneeds = [1, 2, 3]

window.onload=start();

// start first planet
function start(){
    pickPlanet();
}

// pick the planets
function pickPlanet(){

}

// buys an item
function getItem(id) {

}

// resets items
function resetItems(){

}

// checks if requirements are met
function launch(){

}


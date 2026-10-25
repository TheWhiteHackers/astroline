<div align="center">

  # Spacecation!

  Plan a space mission on a budget: pick a planet, build your ship, and launch as many astronauts as you can.

</div>

## King Cupcakes

[Nurefsan Demir](https://github.com/example), [Bera Demir](https://linkedin/in/dude)

## About

<div align="center">

  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

Spacecation is a browser game about planning a space trip. You choose a destination (the Moon, Mars, Venus, Saturn or Pluto), set a budget, and buy parts and supplies for your ship: fuel, hull, heat shield, landing gear, steering thrusters, food, water, oxygen and astronauts.

Each planet needs different things. Thick air and high pressure call for a stronger hull and heat shield, high gravity needs more fuel, and longer trips need more food, water and oxygen. When every requirement shows **OK** and you are still under budget, you can launch. More astronauts means more points, but each one adds to the supplies you need.

### How to play

1. Pick a planet
2. Set your budget (it starts at $150 million)
3. Click items to buy them (− removes one)
4. Get every line to OK
5. Launch!

### Accessibility

The settings page has three options that are saved in your browser and apply on every page:

- **Dyslexia-friendly font**
- **Colorblind-friendly colors**
- **Large text**

### Pages

| File | What it is |
| --- | --- |
| `spacecation.html` / `.css` / `.js` | The game |
| `information.html` / `.css` | How to play |
| `setting.html` / `.css` + `settings.js` | Accessibility settings |
| `accessibility.css` | Styles for the accessibility options, shared by every page |
| `imgs/` | Planet and item pictures |

### Sources and tools

- Planet data (distance, atmospheric density, wind, pressure, gravity, temperature) comes from [NASA's Planetary Fact Sheets](https://nssdc.gsfc.nasa.gov/planetary/factsheet/). Pluto's density and wind speed aren't listed there, so those are estimates.
- Trip lengths shown on the page are based on real missions (Apollo, the Mars rovers, Venus Express, Cassini and New Horizons).
- No frameworks, libraries or boilerplate: plain HTML, CSS and JavaScript.
- AI use: this README was written with help from Claude (Anthropic). <!-- TODO: list any other AI-assisted code here -->

## Prerequisites

Just a web browser. There is nothing to install or build.

## Build from source

```sh
# Clone the project
git clone https://github.com/TheWhiteHackers/spaceaction.git && cd spaceaction
```

Then open `spacecation.html` in your browser (double-click it, or drag it into a browser window).

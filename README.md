<div align="center">

  # Astroline!

  A space mission planner built on real NASA data: pick a planet, pack your ship, and find out what it really takes to keep humans alive beyond Earth.

</div>

## King Cupcakes

[Nurefsan Demir](https://github.com/TheWhiteHackers),
[Garri Lawson](https://github.com/glawso9),
[Bera Demir](https://github.com/berademir)

## About

<div align="center">

  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

If humans are going to live beyond Earth one day, someone has to plan how to get them there and keep them alive. Astroline lets you try. You pick a destination (the Moon, Mars, Venus, Saturn or Pluto), set a budget, and pack a ship with astronauts, food, water, oxygen, fuel, a hull, heat shields, steering thrusters and landing gear.

The numbers come from real space data. Every astronaut needs real amounts of food, water and oxygen each day. Fuel is worked out with the rocket equation, the same formula real mission planners use. Prices are based on real launch costs. When every line on the checklist shows **OK** and you're still under budget, you can launch: the rocket blasts off if your plan works and shakes if it doesn't.

The game shows why sustainable space travel is so hard. Every kilogram of supplies needs fuel to carry it, and that fuel needs more fuel to carry it.

### How to play

1. Pick a planet
2. Set your budget (it starts at $150 million)
3. Click items to buy them (the **−** button removes one)
4. Get every line on the checklist to **OK**
5. Launch!

### The real data behind it

| What | Value used | Source |
| --- | --- | --- |
| Planet stats (distance, atmosphere, wind, pressure, gravity, temperature) | Real values per planet | [NASA Planetary Fact Sheets](https://nssdc.gsfc.nasa.gov/planetary/factsheet/) |
| Food, water and oxygen per astronaut | 2.39 kg food, 2.79 kg water, 0.89 kg oxygen per day | Ewert & Stromgren, NASA ICES-2019-126 ([NTRS](https://ntrs.nasa.gov/citations/20190027563)) |
| Delta-v (speed change needed to get from Earth orbit to each planet) | Moon 3.2, Mars 3.6, Venus 3.5, Saturn 7.3, Pluto 8.2 km/s | [Delta-v budget (Wikipedia)](https://en.wikipedia.org/wiki/Delta-v_budget) |
| Engine efficiency for the rocket equation | 465.5 s specific impulse (RL10B-2 engine) | [L3Harris RL10 spec sheet](https://www.l3harris.com/sites/default/files/2024-01/AJRD-LHX_RL10_SpecSheet_CMYK_APPROVED_011024.pdf) |
| Astronaut price | $55 million per seat (SpaceX Crew Dragon) | NASA Office of Inspector General, 2019 ([CNBC](https://www.cnbc.com/2019/11/19/nasa-cost-to-fly-astronauts-with-spacex-boeing-and-russian-soyuz.html)) |
| Price of everything else | Weight × $2,720 per kg (Falcon 9 launch price to low Earth orbit) | [NASA conference paper](https://ntrs.nasa.gov/api/citations/20200001093/downloads/20200001093.pdf) |

What's simplified for the game:

- The delta-v values only cover getting from Earth orbit to the planet, not landing or flying home.
- Prices are launch costs only. They don't include building the parts, and going past Earth orbit costs more in real life.
- The weights of the hull, heat shield, fins, landing gear and astronaut are estimates.
- How many hulls, heat shields, fins and landing gear each planet needs is a game formula based on its real stats.
- Every mission lasts 10 days. One food, water or oxygen crate holds 10 astronaut-days of supplies.
- Pluto's air density and wind speed aren't listed by NASA, so those are estimates.

### Accessibility

The settings page has three options that are saved in your browser and apply on every page:

- **Dyslexia-friendly font** (OpenDyslexic)
- **Colorblind-friendly colors** (blue and orange instead of red, green and pink)
- **Bigger text**

The checklist always says **OK** or **NEED** in words, so it never relies on color alone. Every item card can be used with the keyboard: Tab to move, Enter to buy, Delete to remove. The rocket animations turn off by themselves if your computer is set to reduce motion.

### Pages

| File | What it is |
| --- | --- |
| `information.html` / `.css` | How to play, with a Play button |
| `spacecation.html` / `.css` / `.js` | The mission planner (the game) |
| `setting.html` / `setting.css` + `settings.js` | Accessibility settings |
| `accessibility.css` | Styles for the accessibility options, shared by every page |
| `imgs/` | Planet, item and rocket pictures |

### Tools, libraries and AI use

- No frameworks, libraries or boilerplate code: plain HTML, CSS and JavaScript.
- Fonts: [Pixelify Sans](https://fonts.google.com/specimen/Pixelify+Sans) from Google Fonts, and [OpenDyslexic](https://fontsource.org/fonts/opendyslexic) from Fontsource (loaded through jsDelivr).
- **AI-assisted code:** our team wrote the HTML pages and some of the JavaScript. For the more complicated parts we used AI (Claude, by Anthropic), including:
  - the game logic: the requirements checklist, the rocket equation, budget checks and scoring
  - the accessibility settings system (`settings.js` and `accessibility.css`)
  - the rocket blast-off and shake animations
  - most of the page styling (CSS) and layout fixes

## Prerequisites

Just a web browser. There is nothing to install or build. An internet connection is needed for the fonts.

## Build from source

```sh
# Clone the project
git clone https://github.com/TheWhiteHackers/spaceaction.git && cd spaceaction
```

Then open `information.html` in your browser (double-click it, or drag it into a browser window) and press **Play!**

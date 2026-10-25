const SETTINGS_KEY = "spacecation-settings";

const SETTING_CLASSES = {
    dyslexia: "dyslexia",
    colorblind: "colorblind",
    largeText: "large-text"
};

let settings = loadSettings();
applySettings();

document.addEventListener("DOMContentLoaded", updateButtons);

function loadSettings() {
    let saved = { dyslexia: false, colorblind: false, largeText: false };
    try {
        let text = localStorage.getItem(SETTINGS_KEY);
        if (text) {
            let fromStorage = JSON.parse(text);
            for (let name in saved) {
                saved[name] = (fromStorage[name] === true);
            }
        }
    } catch (error) {
    }
    return saved;
}

function saveSettings() {
    try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
    }
}

function applySettings() {
    for (let name in SETTING_CLASSES) {
        document.documentElement.classList.toggle(SETTING_CLASSES[name], settings[name]);
    }
    updateButtons();
}

function toggleSetting(name) {
    if (!(name in settings)) {
        return;
    }
    settings[name] = !settings[name];
    saveSettings();
    applySettings();
}

function updateButtons() {
    let buttons = document.querySelectorAll("[data-setting]");
    for (let i = 0; i < buttons.length; i++) {
        let on = settings[buttons[i].dataset.setting];
        buttons[i].setAttribute("aria-pressed", on);
        buttons[i].querySelector(".state").textContent = on ? "ON" : "OFF";
    }
}

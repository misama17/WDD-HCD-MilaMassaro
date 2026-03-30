// MARK: Constanten
const analyzeButton = document.querySelector("button");
const colorSection = document.querySelector(".color");

// AUDIO FILES
const audioYellow = new Audio("./audios/yellow.mp3")
const audioGreen = new Audio("./audios/green.mp3")
const audioOrange = new Audio("./audios/orange-pink.mp3")
const audioDarkPurple = new Audio("./audios/dark-purple-blue-orange.mp3")
const audioBlue = new Audio("./audios/blue-tones.mp3")


// ChatGPT: hoe haal ik de achtergrondkleur van mijn section op met JavaScript?
const bgColor = window.getComputedStyle(colorSection).backgroundColor;



// MARK: Function

// GET THE HUE DEGREES
// function van: https://css-tricks.com/converting-color-spaces-in-javascript/
function RGBtoHSL(rgb) {
    
    // NORMALIZE: waardes van 0-1
    // r /= 255;
    // g /= 255;
    // b /= 255;

    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);

    for (let R in rgb) {
        let r = rgb[R];
        if (r.indexOf("%") > -1) 
        rgb[R] = Math.round(r.substr(0,r.length - 1) / 100 * 255);
    }

    // Make r, g, and b fractions of 1
    let r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255;



    // cmin = kleinste rgb (contrast), cmax = grootste rgb (dominante kleur), delta = verschil tussen cmin en cmax (verzadiging)
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    
    // BEREKEN HUE
    // Geen verschil (hue = 0, grijs)
    if (delta == 0)
        h = 0;
    // R (rood) is max 
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // G (groen) is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // B (blauw) is max
    else
        h = (r - g) / delta + 4;


    // van schaal naar 360 graden
    h = Math.round(h * 60);
        

    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;



    // Bereken lightness (gemiddelde van cmin en cmax)
    l = (cmax + cmin) / 2;


    // Bereken saturation (hoe intens de kleur is)
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        
    // Vermenigvuldig l en s met 100
    // Omzetten naar percentages
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    // return "hsl(" + h + "," + s + "%," + l + "%)";

    return h;

    
}



// https://css-tricks.com/snippets/javascript/random-hex-color/
function setBg() {
    const h = Math.floor(Math.random() * 360);
    const randomColor = `hsl(${h}, 100%, 50%)`;

    colorSection.style.backgroundColor= randomColor; 
    console.log(randomColor);

    const text = document.querySelector(".text-color");
    text.textContent = `Ik zie de kleur ${randomColor}`
    

    // Voor screenreader
    const update = document.getElementById("update");
    update.textContent = `audio voor kleur ${randomColor} wordt afgespeeld.`


    return h;
}



analyzeButton.addEventListener("click", () => {
    // setBg();
    // let h = RGBtoHSL(bgColor);
    const h = setBg();


    playAudioHSL(h);
})

// function playAudioHSL(h) {
//     if (h >= 0 && h <= 75) {
//         audioGreen.play()
//     }
//     if (h >= 300 && h <= 360) {
//         audioYellow.play()
//     }
// }

// ChatGPT: maar hoe laat ik de vorige audio stoppen als een nieuwe kleur een nieuwe audio aanwakkert?
let currentAudio = null;


function playAudioHSL(h) {
    if(currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    if (h >= 0 && h <= 71) {
        currentAudio = audioOrange;
    }
    if (h >= 72 && h <= 143) {
        currentAudio = audioYellow;
    }
    if (h >= 144 && h <= 215) {
        currentAudio = audioGreen;
    }
    if (h >= 216 && h <= 287) {
        currentAudio = audioBlue;
    }
    if (h >= 288 && h <= 360) {
        currentAudio = audioDarkPurple;
    }

    if(currentAudio) {
        currentAudio.play();
    }
}
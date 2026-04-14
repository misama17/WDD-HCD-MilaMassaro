// MARK: Bronnenlijst
// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
// https://medium.com/@dimterion/modals-with-html-dialog-element-in-javascript-and-react-fb23c885d62e
// https://css-tricks.com/some-hands-on-with-the-html-dialog-element/


// MARK: Constants
// const audioButton = document.querySelector(".play-audio");
const dialog = document.getElementById("analyzing-assistant");
const description = document.getElementById("general-description");
const play = document.getElementById("play-button");
const pause = document.getElementById("pause-button");
const replay = document.getElementById("replay-button");
const close = document.getElementById("close-button");
const indeptDescription = document.getElementById("indept-description");

const buttonsDialog = document.querySelectorAll(".play-audio");

// MARK: Variables
let currentAudio = null;
let currentText = "";


// MARK: Constanten - Audio descriptions
const audios = {
    1: {
        intro: "You see a powerful moment on an American football field. A player in purple stands at the center, his muscles tense and his fists clenched. He is shouting it out, full of adrenaline and pride. Around him are teammates, close and connected, as if they have just achieved something important together. In the background, you can feel the energy of a loud stadium. The atmosphere is intense and charged — a moment of pure release, strength, and victory.",
        options: [
            { opt: "Color and spatial layout", text: "The scene is dominated by deep purple uniforms, which create a strong visual identity for the team and stand out sharply against the green football field and the blurred, darker tones of the stadium in the background. The composition is tightly centered, with the main player positioned at the front of the frame and slightly lower than eye level, while teammates cluster around him in a close semicircle that fills the middle of the image and draws attention inward. The background stadium rises behind them in soft focus, giving a sense of scale and height without distracting from the players in the foreground." },
            { opt: "Action and emotion", text: "The central player is captured mid-celebration with clenched fists, a forward-leaning posture, and an open mouth as he shouts, expressing an immediate release of energy after a decisive moment. Around him, teammates move inward with raised arms and converging bodies, creating a sense of motion that suggests they are rushing in to share the moment. The entire group appears frozen in the peak of emotional intensity, as if the action has just completed and the reaction is unfolding in real time." },
            { opt: "Context", text: "The context of the image points to a college football setting, most likely involving the Washington Huskies, a team known for their purple uniforms and participation in high-stakes American football games. This moment likely follows a critical play such as a touchdown or game-changing action that shifts momentum and triggers an immediate team celebration. The environment and uniforms indicate a formal competitive setting, with the energy of a major stadium event and a crowd responding just beyond the frame." },
            { opt: "Feeling of the moment", text: "The feeling of the moment is one of overwhelming release and collective triumph, where pressure and tension suddenly break into joy and unity. It carries the sensation of loudness, movement, and physical closeness, as if the viewer is standing directly on the field among the players. The combination of adrenaline, teamwork, and stadium energy creates a powerful emotional snapshot of victory that feels both immediate and unforgettable." }
        ]
    },

    2: {
        intro: "Lionel Messi dribbling the ball for Argentina during a match against France, closely challenged by French defenders as he looks to create an attacking opportunity.",
        options: [
            { opt: "Color and spatial layout", text: "The image shows a professional football match scene where the dominant colors are deep reds and darker tones contrasted against a bright green pitch. The red kits of the players stand out clearly as the main visual identity, while the stadium background is darker and slightly blurred, creating depth and making the action on the field feel closer and more immediate. The composition is wide, with multiple players spread across the frame, and the central focus pulled toward a group interaction in the middle of the pitch rather than a single isolated subject." },
            { opt: "Action and emotion", text: "The main action captures a moment of confrontation and intensity between players, with one or more athletes reacting physically in close proximity—bodies turned toward each other, arms engaged or partially raised, and postures that suggest either a dispute, challenge, or highly emotional exchange during live play. The movement is frozen at a peak moment, where momentum has just built up and has not yet resolved, giving the scene a sense of tension rather than celebration." },
            { opt: "Context", text: "The context is a high-level international football match, most likely involving a national team rather than a club side, based on the kit styling and stadium scale. The image appears to be from a competitive fixture at the elite level of world football, possibly a tournament or friendly between top-tier national squads. The presence of professional broadcast photography and the formal stadium setting reinforces that this is an officially sanctioned, high-stakes match rather than a casual game." },
            { opt: "Feeling of the moment", text: "The feeling of the moment is tense, physical, and emotionally charged, with a sense of pressure building between players as the match intensity peaks. Instead of joy or celebration, the atmosphere feels like confrontation, urgency, and competitive fire, where every movement carries emotional weight. For a listener, it would feel like standing close to the field during a decisive moment when tempers, effort, and stakes are all at their highest, and the outcome of the situation is still unfolding." }
        ]
    }
}


// MARK: functions
function speechDescription(text) {
    speechSynthesis.cancel();

    const utteranceSpeech = new SpeechSynthesisUtterance(text);
    utteranceSpeech.lang = "en-US";

    currentText = text;

    window.speechSynthesis.speak(utteranceSpeech);
}



buttonsDialog.forEach(button => {
    button.addEventListener("click", () => {
        const id = button.dataset.id;

        currentAudio = audios[id];

        if (!currentAudio) return;

        dialog.showModal();

        description.textContent = currentAudio.intro;

        speechDescription(currentAudio.intro);

        showOptions();
    });
});



function showOptions() {
    indeptDescription.innerHTML = "";

    currentAudio.options.forEach(option => {
        const newButton = document.createElement("button");

        newButton.textContent = option.opt;

        newButton.addEventListener("click", () => {
            description.textContent = option.text;
            speechDescription(option.text);
        })

        indeptDescription.appendChild(newButton);
    })
}




// -------- Audio control buttons --------
play.addEventListener("click", () => {
    if (!currentText) return;

    speechSynthesis.resume();
});

pause.addEventListener("click", () => {
    speechSynthesis.pause();
});

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault(); 

        if (speechSynthesis.speaking) {
            if (speechSynthesis.paused) {
                speechSynthesis.resume();
            } else {
                speechSynthesis.pause();
            }
        }
    }
});

replay.addEventListener("click", () => {
    if (!currentText) return;

    speechDescription(currentText);
});

close.addEventListener("click", () => {
    dialog.close();
    speechSynthesis.cancel();
})

// MARK: Constanten
const audioButton = document.querySelector(".play-audio");

// AUDIO FILES
const audioTest = new Audio("./audios/test-audio.mp3");

audioButton.addEventListener("click", playAudioAnalysis);

function playAudioAnalysis() {
    if (audioTest.paused) {
        audioTest.play();
        audioTest.volume = 0.4;

        // !! ChatGPT: hoe laat ik een tekst uitspreken via JavaScript?
        const descriptionText = "You see a powerful moment on an American football field. A player in purple stands at the center, his muscles tense and his fists clenched. He is shouting it out, full of adrenaline and pride. Around him are teammates, close and connected, as if they have just achieved something important together. In the background, you can feel the energy of a loud stadium. The atmosphere is intense and charged — a moment of pure release, strength, and victory.";
        const descriptionSpeech = new SpeechSynthesisUtterance(descriptionText);
        descriptionSpeech.lang = "en-EN"; 

        window.speechSynthesis.speak(descriptionSpeech);
    } else {
        audioTest.pause();
        window.speechSynthesis.pause();
    }
}
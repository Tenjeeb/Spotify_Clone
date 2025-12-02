// List of songs
const songs = [
    "Hassan _ Roshaan - Duur Se.mp3",
    "Passenger _ Let Her Go.mp3",
    "Under Your Spell - Desire (Drive).mp3"
]

// Create the audio player object
const currentSong = new Audio();

// Function to play the song
function playMusic(track, pause = false) {
    currentSong.src = "songs/" + track
    if (!pause) {
        currentSong.play()
        play.src = "pausebtn.svg"
    }
    document.querySelector(".songinfo").innerText = track;
    document.querySelector(".songtime").innerText = "0:00 / 0:00";
}


function loadSongList() {
    let ul = document.querySelector(".songList ul");
    songs.forEach(song => {
        ul.innerHTML += 
        `<li>
                <img src="music.svg" alt="">
                <div class="info">
                    <div>${song}</div> 
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img class="playbtn" src="playbtn.svg" alt="">
                </div>
            </li>`
     

    });
}

function main() {
    loadSongList();
    playMusic(songs[0], true);
}

main();


// Add event listener for play/pause
play.addEventListener("click", () => {
    if (currentSong.paused) {
        currentSong.play()
        play.src = "pausebtn.svg"
    }
    else {
        currentSong.pause();
        play.src = "playbtn.svg"
    }
})

// Add event listener to next and previous btn
let currentIndex = 0; // keep the track of the song that is playing
next.addEventListener("click", () => {
    if (currentIndex < songs.length - 1) {
        currentIndex++;
        playMusic(songs[currentIndex])
    }
});

previous.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        playMusic(songs[currentIndex])
    }
});

// Format time helper 
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Update time and progress on timeupdate event
const songtime = document.querySelector(".songtime");
const seekbar = document.querySelector(".seekbar");
const circle = document.querySelector(".circle");

currentSong.addEventListener("timeupdate", () => {
    const current = currentSong.currentTime;
    const duration = currentSong.duration;

    songtime.textContent = `${formatTime(current)} : ${formatTime(duration)}`

    if (duration > 0) {
        // Calculate % progress
        const progressPercent = (current / duration) * 100;

        // Move the circle along with the seekbar
        circle.style.left = progressPercent + "%"
    }

    else {
        circle.style.left = "0%";
    }
});

// Making the seekbar clickable to seek the song

seekbar.addEventListener("click", (e) => {
    // Get the total width of the seekbar
    const seekbarWidth = seekbar.clientWidth;

    // get the position where the click happens
    const clickX = e.offsetX;

    // Calculate the click position as a percentage of the seekbart widht
    const clickPercent = clickX / seekbarWidth


    // Set the currentSong time to the percentage of the duration
    currentSong.currentTime = clickPercent * currentSong.duration
})

// Volume control button
currentSong.volume = 0.3
volume.addEventListener("input", (e) => {
    console.log(e.target.value); // Value betwen 0 and 100
    currentSong.volume = parseInt(e.target.value) / 100
})


// Add event listener to the hamburger 
document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = 0
    document.querySelector(".leftlogo").style.left = 0
    document.querySelector(".cross").style.left = "320px"

})
// Add event listener to the cross button
document.querySelector(".cross").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%"
    document.querySelector(".leftlogo").style.left = "-120%"
    document.querySelector(".cross").style.left = "-120%"

})



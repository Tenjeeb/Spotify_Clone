
console.log("JavaScript")
let currentSong = new Audio();  // This is the global variable

// Function to convert seconds into minute
function formatTime(timeInSeconds) {
  if (isNaN(timeInSeconds)) return "0:00";   // Handle NaN cases

  const totalSeconds = Math.floor(timeInSeconds); // Remove decimals
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}


// This function will bring the songs from the server because we are not using backend here
async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    // a.text() reads whatever text your server sends back from the url
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")

    let songs = []
    for (let i = 0; i < as.length; i++) {
        const element = as[i]; //grabs the array(as) items
        if (element.href.endsWith(".mp3")) {
            // songs.push(element.href)
            songs.push(element.href.split("songs")[1])  // split remove all the part before the songs
        }
    }
    return (songs)
}

// Making function for playing music
const playMusic = (track, pause = false) => {
    // let audio = new Audio("/songs/" + track)
    currentSong.src = "/songs/" + track
    if(!pause){
        currentSong.play()  // This will play one song at a time
        play.src = "pausebtn.svg"   // svg image of pause
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track).replace(/^\\/, " ")
    document.querySelector(".songtime").innerHTML = "00 / 00" ///////////

}

// again we need to make aync function because the above function return promise
async function main() {
    // get the list of all the songs
    let songs = await getSongs()
    playMusic(songs[0], true )  // Play the first music

    // putting songname inside the ul li of html
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        let decoded = decodeURIComponent(song).replace(/^\\/, " ")  // decode the URL encoded format and replace / after decoding it
        songUL.innerHTML = songUL.innerHTML + `<li> 
                    <img src="music.svg" alt="">
                    <div class="info">
                        <div>${decoded}</div>
                    </div>
                    <div class="playnow">
                        <span>Play Now</span>
                        <img class="playbtn" src="playbtn.svg" alt="">
                    </div> </li>`
    }

    // play the first song
    // var audio = new Audio(songs[0])
    // audio.play() 

    // Attach an event listner to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())  // trim will remove additional spaces as it will appear later

        })

    })

    // Attach an event listener to play, next and previous song
    // Note: You can directly access the btn id like this
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pausebtn.svg"
        }
        else {
            currentSong.pause()
            play.src = "playbtn.svg"
        }
    })

    // Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () =>{
        console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })

    // Add event listener to seekbar (Moving the seekbar)
    document.querySelector(".seekbar").addEventListener("click" , e=>{
        console.log(e.offsetX)  // at first do console.log(e)
        let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%" 
        currentSong.currentTime = ((currentSong.duration) * percent) / 100

        
    })

    // Add event listener to the hamburger 
    document.querySelector(".hamburger").addEventListener("click", () =>{
        document.querySelector(".left").style.left = 0
        document.querySelector(".leftlogo").style.left = 0
        document.querySelector(".cross").style.left = "350px"

    })
    // Add event listener to the cross button
    document.querySelector(".cross").addEventListener("click", () =>{
        document.querySelector(".left").style.left = "-100%"
        document.querySelector(".leftlogo").style.left = "-100%"
        document.querySelector(".cross").style.left = "-100%"

    })

}

main()



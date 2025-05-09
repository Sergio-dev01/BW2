const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const audio = document.getElementById("player");
const audioInfo = document.getElementById("audio-info");

console.log("Elementi caricati:", playBtn, playIcon, pauseIcon, audio, audioInfo);

playBtn.addEventListener("click", () => {
  console.log("Pulsante cliccato!");

  if (audio.src) {
    if (audio.paused) {
      console.log("Riproduzione in corso...");
      audio.play();
      playIcon.style.display = "none";
      pauseIcon.style.display = "inline";
    } else {
      console.log("In pausa...");
      audio.pause();
      playIcon.style.display = "inline";
      pauseIcon.style.display = "none";
    }
  } else {
    console.log("Nessuna traccia caricata. Fetch in corso...");

    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": token,
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        console.log("Dati ricevuti:", data);
        const previewUrl = data.data[0].preview;
        const title = data.data[0].title;
        const artist = data.data[0].artist.name;

        audio.src = previewUrl;
        audio.play();

        audioInfo.textContent = `${artist} - ${title}`;
        playIcon.style.display = "none";
        pauseIcon.style.display = "inline";
      })
      .catch(err => {
        console.error("Errore API:", err);
        audioInfo.textContent = "Errore nel caricamento";
      });
  }
});

audio.addEventListener("ended", () => {
  playIcon.style.display = "inline";
  pauseIcon.style.display = "none";
  audioInfo.textContent = "Traccia terminata";
});

document.getElementById("playBtn").addEventListener("click", () => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": token,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      const previewUrl = data.data[0].preview;
      const title = data.data[0].title;
      const artist = data.data[0].artist.name;

      const audio = document.getElementById("player");
      const audioInfo = document.getElementById("audio-info");

      audio.src = previewUrl;
      audio.play();

      audioInfo.textContent = `${artist} - ${title}`;
    })
    .catch((err) => {
      console.error("Errore API:", err);
      document.getElementById("audio-info").textContent = "Errore nel caricamento";
    });
});

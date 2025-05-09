const searchInput = document.getElementById("searchInput");
const liveResults = document.getElementById("liveResults");

let timeoutId;

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();

  if (query === "") {
    liveResults.classList.add("d-none");
    liveResults.innerHTML = "";
    return;
  }

  clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": token,
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const results = data.data.slice(0, 5);
        liveResults.innerHTML = "";
        liveResults.classList.remove("d-none");

        results.forEach((item) => {
          const link = document.createElement("a");
          let url = "";
          let textContent = "";

          if (item.type === "track") {
            url = `track.html?id=${item.id}`;
            textContent = `${item.title} – ${item.artist.name}`;
          } else if (item.type === "artist") {
            url = `artist.html?id=${item.id}`;
            textContent = item.artist.name;
          } else if (item.type === "album") {
            url = `album.html?id=${item.id}`;
            textContent = `${item.album.title} - ${item.artist.name}`;
          }

          link.href = url;
          link.className = "d-block px-2 py-1 text-dark text-decoration-none";
          link.textContent = textContent;

          liveResults.appendChild(link);
        });
      })
      .catch((err) => {
        liveResults.innerHTML = "";
        const errorMsg = document.createElement("div");
        errorMsg.className = "p-2 text-danger";
        errorMsg.textContent = "Errore nella ricerca";
        liveResults.appendChild(errorMsg);
        liveResults.classList.remove("d-none");
      });
  }, 500);
});

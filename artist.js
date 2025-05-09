const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// dettagli dell'artista
const fetchArtistDetails = (id) => {
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${id}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": token,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
    }
  })
    .then((resp) => {
      if (!resp.ok) {
        if (resp.status === 404) throw new Error("Risorsa non trovata");
        if (resp.status >= 500) throw new Error("Errore lato server");
        throw new Error("Errore nella fetch");
      }
      return resp.json();
    })
    .then((artist) => {
      if (!artist) {
        console.error("Dati artista non validi.");
        return;
      }

      const header = document.getElementById("artist-header");

      const divImg = document.createElement("div");
      divImg.style.height = "380px";
      divImg.style.overflow = "hidden";
      divImg.style.position = "relative";

      const artistImg = document.createElement("img");
      artistImg.src = artist.picture_xl;
      artistImg.className = "img-fluid rounded mb-3 artist-img";
      artistImg.style.height = "100%";
      artistImg.style.width = "100%";
      artistImg.style.objectFit = "cover";
      artistImg.style.objectPosition = "50% 10%";

      // Container per h1,span e svg
      const infoContainer = document.createElement("div");
      infoContainer.style.position = "absolute";
      infoContainer.style.bottom = "20px";
      infoContainer.style.left = "20px";
      infoContainer.style.zIndex = "10";
      infoContainer.style.color = "white";
      infoContainer.style.textShadow = "1px 1px 4px black";

      // riga "Artista verificato"
      const verifiedRow = document.createElement("div");
      verifiedRow.style.display = "flex";
      verifiedRow.style.alignItems = "center";
      verifiedRow.style.gap = "5px";

      const verifiedSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      verifiedSvg.setAttribute("viewBox", "0 0 24 24");
      verifiedSvg.setAttribute("aria-hidden", "true");
      verifiedSvg.classList.add("verified-badge");

      verifiedSvg.innerHTML = `
  <title>Verified account</title>
  <!-- contorno azzurro -->
  <path fill="#1DA1F2" d="M10.814.5a1.658 1.658 0 0 1 2.372 0l2.512 2.572
      3.595-.043a1.658 1.658 0 0 1 1.678 1.678l-.043 3.595 2.572 2.512c.667.65.667
      1.722 0 2.372l-2.572 2.512.043 3.595a1.658 1.658 0 0 1-1.678
      1.678l-3.595-.043-2.512 2.572a1.658 1.658 0 0 1-2.372
      0l-2.512-2.572-3.595.043a1.658 1.658 0 0 1-1.678-1.678l.043-3.595L.5
      13.186a1.658 1.658 0 0 1 0-2.372l2.572-2.512-.043-3.595a1.658
      1.658 0 0 1 1.678-1.678l3.595.043L10.814.5z"/>
  <!-- spunta bianca -->
  <path fill="#FFFFFF" d="M17.398 9.62a1 1 0 0 0-1.414-1.413l-6.011
      6.01-1.894-1.893a1 1 0 0 0-1.414
      1.414l3.308 3.308 7.425-7.425z"/>
`;

      const verifiedText = document.createElement("span");
      verifiedText.innerText = "Artista verificato";
      verifiedText.style.fontSize = "0.9rem";

      verifiedRow.appendChild(verifiedSvg);
      verifiedRow.appendChild(verifiedText);

      // Nome artista
      const artistH1 = document.createElement("h1");
      artistH1.innerText = artist.name;
      artistH1.style.margin = "0";
      artistH1.style.fontSize = "4rem";
      artistH1.style.fontWeight = "bold";

      // Ascoltatori mensili
      const listenersSpan = document.createElement("span");
      listenersSpan.innerText = `${artist.nb_fan.toLocaleString("it-IT")} ascoltatori mensili`;
      listenersSpan.style.fontSize = "1rem";
      listenersSpan.style.marginTop = "5px";

      infoContainer.appendChild(verifiedRow);
      infoContainer.appendChild(artistH1);
      infoContainer.appendChild(listenersSpan);
      divImg.appendChild(artistImg);
      divImg.appendChild(infoContainer);
      header.appendChild(divImg);
    })
    .catch((err) => {
      console.error("Errore nel recupero dettagli artista:", err);
    });
};

const fetchArtistTrack = (id) => {
  const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=10`;

  fetch(url)
    .then((resp) => {
      if (!resp.ok) {
        if (resp.status === 404) throw new Error("Risorsa non trovata");
        if (resp.status >= 500) throw new Error("Errore lato server");
        throw new Error("Errore nella fetch");
      }
      return resp.json();
    })
    .then((data) => {
      const trackList = document.getElementById("track-list");
      const albumList = document.getElementById("album-list");
      trackList.innerHTML = "";
      albumList.innerHTML = "";

      console.log(data);

      const modifiedSongs = data.data.map((song) => ({
        ...song,
        totalPlays: (Math.floor(Math.random() * (20000000 - 1000000 + 1)) + 1000000).toLocaleString("it-IT"),
        durationInMinutes: (song.duration / 60).toFixed(2)
      }));

      console.log("canzoni modificate", modifiedSongs);

      const slicedData = modifiedSongs.slice(0, 5);
      slicedData.forEach((track, index) => {
        const flexDiv = document.createElement("div");
        flexDiv.className = "d-flex align-items-center flexDiv mb-2";
        flexDiv.style.cursor = "pointer";

        const card = document.createElement("div");
        card.className = "d-flex align-items-center gap-2 pb-0 px-3";

        const trackNumber = document.createElement("span");
        trackNumber.className = "me-2 text-secondary p-2";
        trackNumber.innerText = `${index + 1}`;

        const img = document.createElement("img");
        img.className = "imgTrack";
        img.src = track.album.cover;

        const containerPdiv = document.createElement("div");
        containerPdiv.className = "d-flex flex-column";

        const pUp = document.createElement("p");
        pUp.className = "text-white pTrack";
        pUp.style.width = "250px";
        pUp.style.margin = "0";
        pUp.innerText = track.title;

        const divDown = document.createElement("div");
        divDown.className = "text-secondary";
        divDown.innerHTML = `
          <div class="d-flex align-items-center">
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="rgb(179, 179, 179)" style="width: 12px; height: 12px" class="me-1">
              <path d="M1.75 2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25H1.75zM0 2.75C0 1.784.784 1 1.75 1h12.5c.967 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25V2.75z"/>
              <path d="m6 5 5.196 3L6 11V5z" />
            </svg>
            <span>Video Musicale</span>
          </div>`;

        const rightPartDiv = document.createElement("div");
        rightPartDiv.className = "d-flex justify-content-between gap-3 p-3 rightPartDiv";

        const allPlays = document.createElement("p");
        allPlays.className = "text-secondary m-0";
        allPlays.innerText = track.totalPlays;

        const songTime = document.createElement("p");
        songTime.className = "text-secondary m-0";
        songTime.innerText = track.durationInMinutes;

        flexDiv.addEventListener("mouseover", () => {
          trackNumber.innerHTML = `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#6C757D" style="width: 13px; height: 13px">
          <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" />
        </svg>`;
        });
        // funzione per cambiare cover-img song-title artist-name in player-bar
        function updatePlayerBarInfo(track) {
          const playerCoverImg = document.getElementById("player-bar-cover-img");
          const playerSongTitle = document.getElementById("player-bar-song-title");
          const playerArtistName = document.getElementById("player-bar-artist-name");

          if (playerCoverImg) {
            playerCoverImg.src = track.album.cover_small;
            playerCoverImg.alt = track.title;
          }

          if (playerSongTitle) {
            playerSongTitle.textContent = track.title;
          }

          if (playerArtistName) {
            playerArtistName.textContent = track.artist.name;
          }
        }
        flexDiv.addEventListener("click", () => {
          console.log("Traccia cliccata:", track);
          updatePlayerBarInfo(track);
        });

        flexDiv.addEventListener("mouseout", () => {
          trackNumber.innerText = `${index + 1}`;
        });

        containerPdiv.appendChild(pUp);
        containerPdiv.appendChild(divDown);
        card.appendChild(trackNumber);
        card.appendChild(img);
        card.appendChild(containerPdiv);
        rightPartDiv.appendChild(allPlays);
        rightPartDiv.appendChild(songTime);
        flexDiv.appendChild(card);
        flexDiv.appendChild(rightPartDiv);
        trackList.appendChild(flexDiv);

        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-2 px-1 mb-4";

        const cardAlbum = document.createElement("div");
        cardAlbum.className = "card p-3 pb-0 h-100";

        const imgAlbum = document.createElement("img");
        imgAlbum.className = "card-img-top";
        imgAlbum.src = track.album.cover;

        const div = document.createElement("div");
        div.className = "card-body p-0 py-3";

        const p = document.createElement("p");
        p.className = "card-text text-white";
        p.innerText = track.album.title;

        div.appendChild(p);
        cardAlbum.appendChild(imgAlbum);
        cardAlbum.appendChild(div);
        col.appendChild(cardAlbum);
        albumList.appendChild(col);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchArtistAlbum = (id) => {
  const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=10`;

  fetch(url)
    .then((resp) => {
      if (!resp.ok) {
        if (resp.status === 404) throw new Error("Risorsa non trovata");
        if (resp.status >= 500) throw new Error("Errore lato server");
        throw new Error("Errore nella fetch");
      }
      return resp.json();
    })
    .then((data) => {
      const albumList = document.getElementById("album-list");
      albumList.innerHTML = "";

      console.log(data);

      const slicedData = data.data.slice(0, 6);
      slicedData.forEach((track, index) => {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-2 px-1 mb-4";

        const cardAlbum = document.createElement("div");
        cardAlbum.className = "card p-3 pb-0 h-100";

        const imgAlbum = document.createElement("img");
        imgAlbum.className = "card-img-top";
        imgAlbum.src = track.album.cover;

        const div = document.createElement("div");
        div.className = "card-body p-0 py-3";

        const p = document.createElement("p");
        p.className = "card-text text-white";
        p.innerText = track.album.title;

        col.addEventListener("click", function () {
          window.location.href = `album.html?id=${track.album.id}`;
        });

        div.appendChild(p);
        cardAlbum.appendChild(imgAlbum);
        cardAlbum.appendChild(div);
        col.appendChild(cardAlbum);
        albumList.appendChild(col);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchArtistVideo = (id) => {
  const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=10`;

  fetch(url)
    .then((resp) => {
      if (!resp.ok) {
        if (resp.status === 404) throw new Error("Risorsa non trovata");
        if (resp.status >= 500) throw new Error("Errore lato server");
        throw new Error("Errore nella fetch");
      }
      return resp.json();
    })
    .then((data) => {
      const videoList = document.getElementById("video-list");
      const littleCard = document.getElementById("little-card");
      videoList.innerHTML = "";

      console.log(data);

      const slicedData = data.data.slice(4);
      slicedData.forEach((track, index) => {
        const colVideo = document.createElement("div");
        colVideo.className = "col-12 col-sm-6 col-md-4 col-lg-2 px-1 mb-4";

        const cardVideo = document.createElement("div");
        cardVideo.className = "card p-3 pb-0 h-100";

        const imgVideo = document.createElement("img");
        imgVideo.className = "card-img-top";
        imgVideo.src = track.album.cover;

        const divVideo = document.createElement("div");
        divVideo.className = "card-body p-0 py-3";

        const p = document.createElement("p");
        p.className = "card-text text-white";
        p.innerText = track.album.title;

        colVideo.addEventListener("click", function () {
          window.location.href = `album.html?id=${track.album.id}`;
        });

        divVideo.appendChild(p);
        cardVideo.appendChild(imgVideo);
        cardVideo.appendChild(divVideo);
        colVideo.appendChild(cardVideo);
        videoList.appendChild(colVideo);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchLittleCard = (id) => {
  const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=10`;

  fetch(url)
    .then((resp) => {
      if (!resp.ok) {
        if (resp.status === 404) throw new Error("Risorsa non trovata");
        if (resp.status >= 500) throw new Error("Errore lato server");
        throw new Error("Errore nella fetch");
      }
      return resp.json();
    })
    .then((data) => {
      const littleCard = document.getElementById("little-card");
      littleCard.innerHTML = "";

      console.log(data);

      const slicedData = data.data.slice(1, 2);
      slicedData.forEach((track) => {
        const imgLittleCard = document.createElement("img");
        imgLittleCard.className = "imgLittleCard";
        imgLittleCard.src = track.album.cover;

        littleCard.appendChild(imgLittleCard);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const logo = document.getElementById("logo");

logo.addEventListener("click", function () {
  window.location.href = "index.html";
});
loadRandomAlbumRightbar = () => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=a`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": token,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
    }
  };

  fetch(url, options)
    .then((resp) => {
      if (!resp.ok) throw new Error("Errore nel recupero della rightbar");
      return resp.json();
    })
    .then((data) => {
      const albums = data.data;
      const rightbar = document.querySelector(".right-part");

      const usedIndexes = new Set();

      for (let i = 0; i < 3; i++) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * albums.length);
        } while (usedIndexes.has(randomIndex));
        usedIndexes.add(randomIndex);

        const album = albums[randomIndex];

        const imageContainer = document.createElement("div");
        imageContainer.className = "text-center mb-4";

        const img = document.createElement("img");
        img.src = album.album.cover_big;
        img.alt = album.album.title;
        img.className = "img-fluid rounded shadow mb-2";

        const artistName = document.createElement("p");
        artistName.className = "text-white fw-bold mb-1";
        artistName.innerText = album.artist.name;
        artistName.style.cursor = "pointer";
        artistName.addEventListener("click", function () {
          window.location.href = `artist.html?id=${album.artist.id}`;
        });

        const trackTitle = document.createElement("p");
        trackTitle.className = "text-light small";
        trackTitle.innerText = album.title;
        trackTitle.style.cursor = "pointer";
        trackTitle.addEventListener("click", function () {
          window.location.href = `album.html?id=${album.album.id}`;
        });

        imageContainer.appendChild(img);
        imageContainer.appendChild(artistName);
        imageContainer.appendChild(trackTitle);

        rightbar.appendChild(imageContainer);
      }
    })
    .catch((error) => {
      console.error("Errore nella rightbar:", error);
    });
};

window.onload = () => {
  fetchArtistDetails(id);
  fetchArtistTrack(id);
  fetchArtistAlbum(id);
  fetchArtistVideo(id);
  fetchLittleCard(id);
};

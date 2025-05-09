const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const fetchAlbumDetails = id => {
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${id}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": token,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(resp => {
      if (!resp.ok) throw new Error("Errore nel recupero album");
      return resp.json();
    })
    .then(album => {
      console.log("album", album);
      const artistId = album.artist.id;
      const header = document.getElementById("artist-header");
      header.innerHTML = "";

      const divImg = document.createElement("div");
      divImg.style.height = "380px";
      divImg.style.overflow = "hidden";
      divImg.style.position = "relative";

      const albumImg = document.createElement("img");
      albumImg.src = album.cover_xl;
      albumImg.className = "img-fluid rounded mb-3";
      albumImg.style.height = "100%";
      albumImg.style.width = "100%";
      albumImg.style.objectFit = "cover";
      albumImg.style.objectPosition = "center";

      const infoContainer = document.createElement("div");
      infoContainer.style.position = "absolute";
      infoContainer.style.bottom = "20px";
      infoContainer.style.left = "20px";
      infoContainer.style.zIndex = "10";
      infoContainer.style.color = "white";
      infoContainer.style.textShadow = "1px 1px 4px black";

      const albumTitle = document.createElement("h1");
      albumTitle.innerText = album.title;
      albumTitle.style.fontSize = "3rem";
      albumTitle.style.margin = "0";

      const artistName = document.createElement("span");
      artistName.innerText = `di ${album.artist.name}`;
      artistName.style.fontSize = "1.2rem";

      infoContainer.appendChild(albumTitle);
      infoContainer.appendChild(artistName);
      divImg.appendChild(albumImg);
      divImg.appendChild(infoContainer);
      header.appendChild(divImg);

      const trackList = document.getElementById("track-list");
      trackList.innerHTML = "";
      album.tracks.data.forEach((track, index) => {
        const card = document.createElement("div");
        card.className = "d-flex align-items-center gap-2 p-3 pb-0";

        const trackNumber = document.createElement("span");
        trackNumber.className = "me-2 text-secondary";
        trackNumber.innerText = `${index + 1}`;

        const img = document.createElement("img");
        img.className = "imgTrack";
        img.src = album.cover_small;

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
            <span>Traccia</span>
          </div>`;

        containerPdiv.appendChild(pUp);
        containerPdiv.appendChild(divDown);
        card.appendChild(trackNumber);
        card.appendChild(img);
        card.appendChild(containerPdiv);
        trackList.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Errore nel recupero dettagli album:", err);
    });
};

const fetchArtistAlbum = id => {
  const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=10`;

  fetch(url)
    .then(resp => {
      if (!resp.ok) {
        if (resp.status === 404) throw new Error("Risorsa non trovata");
        if (resp.status >= 500) throw new Error("Errore lato server");
        throw new Error("Errore nella fetch");
      }
      return resp.json();
    })
    .then(album => {
      const albumList = document.getElementById("album-list");
      albumList.innerHTML = "";

      console.log(album);

      const slicedData = album.data.slice(0, 6);
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
    .catch(error => {
      console.log(error);
    });
};

const fetchArtistVideo = id => {
  const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=10`;

  fetch(url)
    .then(resp => {
      if (!resp.ok) {
        if (resp.status === 404) throw new Error("Risorsa non trovata");
        if (resp.status >= 500) throw new Error("Errore lato server");
        throw new Error("Errore nella fetch");
      }
      return resp.json();
    })
    .then(album => {
      const videoList = document.getElementById("video-list");
      videoList.innerHTML = "";

      console.log(album);

      const slicedData = album.data.slice(4);
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
    .catch(error => {
      console.log(error);
    });
};

const fetchLittleCard = id => {
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${id}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": token,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(resp => resp.json())
    .then(album => {
      const littleCard = document.getElementById("little-card");
      littleCard.innerHTML = "";

      const imgLittleCard = document.createElement("img");
      imgLittleCard.className = "imgLittleCard";
      imgLittleCard.src = album.cover_small;

      littleCard.appendChild(imgLittleCard);
    })
    .catch(error => {
      console.log(error);
    });
};

const loadRandomAlbumRightbar = () => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=a`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": token,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then(resp => {
      if (!resp.ok) throw new Error("Errore nella rightbar");
      return resp.json();
    })
    .then(data => {
      const albums = data.data;
      const rightbar = document.querySelector(".right-part");
      rightbar.innerHTML = "";

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
    .catch(error => {
      console.error("Errore nella rightbar:", error);
    });
};

const logo = document.getElementById("logo");
logo.addEventListener("click", function () {
  window.location.href = "index.html";
});

const fetchAlbumDetails2 = id => {
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${id}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": token,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(resp => {
      if (!resp.ok) throw new Error("Errore nel recupero album");
      return resp.json();
    })
    .then(album => {
      console.log("album", album);

      const artistId = album.artist.id;

      fetchArtistAlbum(artistId);
      fetchArtistVideo(artistId);
    })
    .catch(err => {
      console.error("Errore nel recupero dettagli album:", err);
    });
};

window.onload = () => {
  fetchAlbumDetails(id);
  fetchLittleCard(id);
  loadRandomAlbumRightbar();
  fetchAlbumDetails2(id);
};

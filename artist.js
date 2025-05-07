const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// dettagli dell'artista
const fetchArtistDetails = id => {
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${id}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": token,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(resp => {
      console.log(resp);
      if (!resp.ok) {
        if (resp.status === 404) {
          throw new Error("Risorsa non trovata");
        } else if (resp.status >= 500) {
          throw new Error("Errore lato server");
        }
        throw new Error("Errore nella fetch");
      }
      return resp.json();
    })
    .then(artist => {
      if (!artist) {
        console.error("Dati artista non validi.");
        return;
      }

      // inserisco immagine e nome
      const header = document.getElementById("artist-header");

      const divImg = document.createElement("div");
      divImg.style.height = "30px";

      const artistImg = document.createElement("img");
      artistImg.src = artist.picture_xl;
      artistImg.className = "img-fluid rounded mb-3 artist-img";

      const artistH1 = document.createElement("h1");
      artistH1.innerText = artist.name;

      header.appendChild(divImg);
      header.appendChild(artistH1);
      divImg.appendChild(artistImg);
    })
    .catch(err => {
      console.error("Errore nel recupero dettagli artista:", err);
    });
};

fetchArtistAlbums = id => {
  // URL con il proxy di Strive School
  const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=10`;

  fetch(url)
    .then(resp => {
      console.log(resp);
      if (!resp.ok) {
        if (resp.status === 404) {
          throw new Error("Risorsa non trovata");
        } else if (resp.status >= 500) {
          throw new Error("Errore lato server");
        }
        throw new Error("Errore nella fetch");
      }
      return resp.json();
    })
    .then(data => {
      console.log(data);

      // Recupero l'elemento che conterrà gli album
      const albumList = document.getElementById("album-list");
      albumList.innerHTML = ""; // Pulisco prima di aggiungere nuovi risultati
      const slicedData = data.data.slice(0, 5);
      slicedData.forEach((track, index) => {
        // Creazione dell'elemento per ogni album
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-2 px-1 mb-4";

        const card = document.createElement("div");
        card.className = "d-flex align-items-center gap-2 p-3 pb-0";

        const trackNumber = document.createElement("span");
        trackNumber.className = "me-2 text-secondary";
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
        divDown.innerHTML = `<div class="d-flex align-items-center"><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="rgb(179, 179, 179)" style="width: 12px; height: 12px" class="me-1">
                  <path
                    d="M1.75 2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25H1.75zM0 2.75C0 1.784.784 1 1.75 1h12.5c.967 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25V2.75z"
                  />
                  <path d="m6 5 5.196 3L6 11V5z" />
                </svg>
                <span>Video Musicale</span></div>`;

        containerPdiv.appendChild(pUp);
        containerPdiv.appendChild(divDown);
        card.appendChild(trackNumber);
        card.appendChild(img);
        card.appendChild(containerPdiv);
        col.appendChild(card);
        albumList.appendChild(col);
      });
    })
    .catch(error => {
      console.log(error);
    });
};

window.onload = () => {
  fetchArtistDetails(id);
  fetchArtistAlbums(id);
};

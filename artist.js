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
      header.innerHTML = `
          <img src="${artist.picture_xl}" alt="${artist.name}" class="img-fluid rounded mb-3" />
          <h1>${artist.name}</h1>
        `;
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

      data.data.forEach(track => {
        // Creazione dell'elemento per ogni album
        const col = document.createElement("div");
        col.className = "col-12 px-1 mb-4";

        const card = document.createElement("div");
        card.className = "p-3 pb-0";

        const img = document.createElement("img");
        img.className = "";
        img.src = track.album.cover;

        const div = document.createElement("div");
        div.className = "card-body p-0 py-3";

        const p = document.createElement("p");
        p.className = "card-text text-white";
        p.innerText = track.album.title;

        div.appendChild(p);
        card.appendChild(img);
        card.appendChild(div);
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

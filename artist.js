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
  const url = `https://deezerdevs-deezer.p.rapidapi.com/artist/${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": token,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  fetch(url, options)
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
      const albumList = document.getElementById("album-list");
      albumList.innerHTML = "";

      const urlTrack = data.tracklist;
      const optionsTrack = {
        method: "GET",
        headers: {
          "x-rapidapi-key": token,
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        },
      };

      fetch(urlTrack, optionsTrack)
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
        .then(data => console.log(data))
        .catch(error => {
          console.log(error);
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

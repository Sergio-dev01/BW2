const token = "8459b56e94msh8dcb07c5aa8a2fbp16c8c2jsn6eebaa59843a";
const getArtistIdFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
};

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

// popolo la pagina dell'artista
const renderArtistPage = () => {
  const id = getArtistIdFromURL();
  if (!id) {
    console.error("ID artista non trovato nell'URL.");
    return;
  }
};

fetchArtistAlbums = id => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=e`;
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
      const slicedData = data.data.slice(start, end);
      console.log(slicedData);
      const albumList = document.getElementById("album-list");
      albumList.innerHTML = "";

      slicedData.forEach(artist => {
        console.log(artist);
        console.log(artist.album);
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-2 px-1 mb-4";

        const card = document.createElement("div");
        card.className = "card p-3 pb-0 h-100";

        const img = document.createElement("img");
        img.className = "card-img-top";
        img.src = artist.album.cover_medium;

        const div = document.createElement("div");
        div.className = "card-body p-0 py-3";

        const p = document.createElement("p");
        p.className = "card-text text-white";
        p.innerText = artist.album.title;

        div.appendChild(p);
        card.appendChild(img);
        card.appendChild(div);
        col.appendChild(card);
        grid.appendChild(col);
      });
    })
    .catch(error => {
      console.log(error);
    });
};

window.onload = () => {
  renderArtistPage();
  fetchArtistDetails("params");
  fetchArtistAlbums("params");
};

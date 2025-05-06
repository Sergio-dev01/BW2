const token = "8459b56e94msh8dcb07c5aa8a2fbp16c8c2jsn6eebaa59843a";
const getArtistIdFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
};

// dettagli dell'artista
const fetchArtistDetails = (id) => {
  return fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${id}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": token,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error("Errore nel recupero dettagli artista:", err);
    });
};

// album dell'artista
const fetchArtistAlbums = (id) => {
  return fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${id}/albums`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": token,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))

    .catch((err) => {
      console.error("Errore nel recupero album artista:", err);
      return [];
    });
};

// popolo la pagina dell'artista
const renderArtistPage = () => {
  const id = getArtistIdFromURL();
  if (!id) {
    console.error("ID artista non trovato nell'URL.");
    return;
  }

  fetchArtistDetails(id).then((artist) => {
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

    // caric0 album
    fetchArtistAlbums(id).then((albums) => {
      const albumList = document.getElementById("album-list");
      albumList.innerHTML = "";

      albums.forEach((album) => {
        const col = document.createElement("div");
        col.className = "col";
        console.log(album);

        col.innerHTML = `
            <div class="card h-100 bg-dark text-white border-light">
              <img src="${album.cover_medium}" class="card-img-top" alt="${album.title}">
              <div class="card-body">
                <h5 class="card-title">${album.title}</h5>
                <p class="card-text"><small>${new Date(album.release_date).getFullYear()}</small></p>
              </div>
            </div>
          `;

        albumList.appendChild(col);
      });
    });
  });
};

renderArtistPage();

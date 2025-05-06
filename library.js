const fetchArtists = (query = "e") => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": token,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((err) => {
      console.error("Errore fetch artisti Deezer:", err);
      return [];
    });
};

fetchArtists("e").then((tracks) => {
  const artistList = document.getElementById("artist-list");
  const uniqueArtists = [];

  tracks.forEach((track) => {
    const artist = track.artist;

    if (!uniqueArtists.includes(artist.id)) {
      uniqueArtists.push(artist.id);

      const artistItem = document.createElement("div");
      artistItem.className = "d-flex align-items-center gap-2";

      const img = document.createElement("img");
      img.src = artist.picture_small;
      img.alt = artist.name;
      img.className = "rounded-circle";
      img.width = 40;
      img.height = 40;

      const name = document.createElement("span");
      name.textContent = artist.name;

      artistItem.appendChild(img);
      artistItem.appendChild(name);

      artistList.appendChild(artistItem);
    }
  });
});

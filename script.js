mainFetch = (containerNum, start, end) => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=artist/%7Bid%7D`;
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
      const grid = document.querySelector(`.${containerNum}-main-grid-container`);

      slicedData.forEach(artist => {
        console.log(artist);
        console.log(artist.album);
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-2 px-1 mb-4";

        const card = document.createElement("div");
        card.className = "card bg-dark p-3 pb-0 h-100";

        const img = document.createElement("img");
        img.className = "card-img-top";
        img.src = artist.album.cover;

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
  mainFetch("first", 0, 6);
  mainFetch("second", 7, 13);
  mainFetch("third", 14, 20);
};

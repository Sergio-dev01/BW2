mainFetch = (containerNum, start, end) => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=i`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": token,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((resp) => {
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
    .then((data) => {
      console.log(data);
      const slicedData = data.data.slice(start, end);
      console.log(slicedData);
      const grid = document.querySelector(`.${containerNum}-main-grid-container`);

      slicedData.forEach((artist) => {
        console.log(artist);
        console.log(artist.album);
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-2 px-1 mb-4 cardCol";

        const card = document.createElement("div");
        card.className = "card p-3 pb-0 h-100";

        const divSvg = document.createElement("div");
        divSvg.className = "position-relative";

        const img = document.createElement("img");
        img.className = "card-img-top";
        img.src = artist.album.cover;

        const btnWrapper = document.createElement("div");
        btnWrapper.className = "position-absolute bottom-0 end-0 m-2 playBtn";

        const playBtn = document.createElement("button");
        playBtn.className = "btn btn-link p-0 rounded-circle d-flex justify-content-center align-items-center";
        playBtn.style.width = "45px";
        playBtn.style.height = "45px";
        playBtn.style.backgroundColor = "#1bd760";

        const playIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        playIcon.setAttribute("viewBox", "0 0 16 16");
        playIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        playIcon.setAttribute("fill", "black");
        playIcon.style.width = "17px";
        playIcon.style.height = "17px";

        playIcon.innerHTML = `<path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" />`;

        playBtn.appendChild(playIcon);
        btnWrapper.appendChild(playBtn);

        divSvg.appendChild(img);
        divSvg.appendChild(btnWrapper);
        card.appendChild(divSvg);

        const div = document.createElement("div");
        div.className = "card-body p-0 py-3";

        const p = document.createElement("p");
        p.className = "card-text text-white";
        p.innerText = artist.album.title;

        div.appendChild(p);
        card.appendChild(div);
        col.appendChild(card);
        grid.appendChild(col);

        col.addEventListener("click", function () {
          window.location.href = `album.html?id=${artist.album.id}`;
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

upperMainFetch = () => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=i`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": token,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((resp) => {
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
    .then((data) => {
      const slicedData = data.data.slice(0, 8);
      const grid = document.querySelector(`.upper-main-grid-container`);

      slicedData.forEach((artist) => {
        const col = document.createElement("div");
        col.className = " col-md-6 col-lg-3 px-1 mb-2 cardCol";

        const card = document.createElement("div");
        card.className = "pb-0 upperCard position-relative";

        const img = document.createElement("img");
        img.className = "upperCardImg";
        img.src = artist.album.cover;

        const btnWrapper = document.createElement("div");
        btnWrapper.className = "position-absolute end-0 top-50 translate-middle-y me-2 playBtn";

        const playBtn = document.createElement("div");
        playBtn.className = "btn btn-link p-0 rounded-circle d-flex justify-content-center align-items-center";
        playBtn.style.width = "45px";
        playBtn.style.height = "45px";
        playBtn.style.backgroundColor = "#1bd760";

        const playIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        playIcon.setAttribute("viewBox", "0 0 16 16");
        playIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        playIcon.setAttribute("fill", "black");
        playIcon.style.width = "17px";
        playIcon.style.height = "17px";

        playIcon.innerHTML = `<path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" />`;

        playBtn.appendChild(playIcon);
        btnWrapper.appendChild(playBtn);

        card.appendChild(img);
        card.appendChild(btnWrapper);

        const div = document.createElement("div");
        div.className = "p-0 py-3";

        const p = document.createElement("p");
        p.className = "card-text text-white";
        p.innerText = artist.album.title;

        div.appendChild(p);
        card.appendChild(div);
        col.appendChild(card);
        grid.appendChild(col);

        col.addEventListener("click", function () {
          window.location.href = `album.html?id=${artist.album.id}`;
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

loadRandomAlbumRightbar = () => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=a`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": token,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
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
        img.style.cursor = "pointer";
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

        img.addEventListener("click", function () {
          window.location.href = `album.html?id=${album.album.id}`;
        });
      }
    })
    .catch((error) => {
      console.error("Errore nella rightbar:", error);
    });
};

window.onload = () => {
  mainFetch("first", 0, 6);
  mainFetch("second", 7, 13);
  mainFetch("third", 14, 20);
  upperMainFetch();
  loadRandomAlbumRightbar();

  const input = document.getElementById("searchInput");
  const shortcuts = document.getElementById("shortcutKeys");

  if (input && shortcuts) {
    input.addEventListener("focus", () => (shortcuts.style.display = "flex"));
    input.addEventListener("blur", () => (shortcuts.style.display = "none"));
  }
};

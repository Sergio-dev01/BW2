document.addEventListener("DOMContentLoaded", () => {
  const rowContainer = document.getElementById("rowContainer");
  const cardTemplate = document.getElementById("cardTemplate");

  // array with colors
  const spotifyColors = [
    "rgb(220, 20, 140)",
    "rgb(0, 100, 80)",
    "rgb(40, 62, 163)",
    "rgb(124, 58, 237)",
    "rgb(79, 70, 229)",
    "rgb(14, 116, 144)",
    "rgb(5, 150, 105)",
    "#65A30D",
    "#F59E0B",
    "#D97706",
    "#57534E",
    "#1DB954",
    "#FFC107",
    "#FF5722",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
    "#2196F3",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#8BC34A",
    "#CDDC39"
  ];

  // card data
  const cardData = [
    { title: "Musica", image: "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb" },
    { title: "Podcast", image: "https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285bfa" },
    { title: "Audiolibri", image: "https://i.scdn.co/image/ab67fb8200005cafd7d76fc8a9096042a317ddb7" },
    { title: "Eventi dal vivo", image: "url da copiare da spotify" },
    { title: "Create per te", image: "url da copiare da spotify" },
    { title: "Nuove uscite", image: "url da copiare da spotify" },
    { title: "Pop", image: "url da copiare da spotify" },
    { title: "Mood", image: "epicodeAssets/imgs/search/image-8.jpg" },
    { title: "Glastonbury 2025", image: "epicodeAssets/imgs/search/image-8.jpg" },
    { title: "Hip Hop", image: "epicodeAssets/imgs/search/image-9.jpg" },
    { title: "Classifiche podcast", image: "epicodeAssets/imgs/search/image-10.jpg" },
    { title: "Podcast New Releases", image: "epicodeAssets/imgs/search/image-11.jpg" },
    { title: "Video", image: "epicodeAssets/imgs/search/image-12.jpg" },
    { title: "Giallo e thriller", image: "epicodeAssets/imgs/search/image-13.jpeg" },
    { title: "Fai da te", image: "epicodeAssets/imgs/search/image-14.jpeg" },
    { title: "Party", image: "epicodeAssets/imgs/search/image-15.jpeg" },
    { title: "Dance/Elettronica", image: "epicodeAssets/imgs/search/image-16.jpeg" },
    { title: "Allenamento", image: "epicodeAssets/imgs/search/image-17.jpeg" },
    { title: "EQUAL", image: "epicodeAssets/imgs/search/image-18.jpeg" },
    { title: "Frequency", image: "epicodeAssets/imgs/search/image-19.jpeg" },
    { title: "Narrativa e letteratura", image: "epicodeAssets/imgs/search/image-20.jpeg" },
    { title: "Audiolibri piccanti", image: "epicodeAssets/imgs/search/image-21.jpeg" },
    { title: "Classifiche", image: "epicodeAssets/imgs/search/image-22.jpeg" },
    { title: "Scopri", image: "epicodeAssets/imgs/search/image-23.jpeg" },
    { title: "Alternative", image: "epicodeAssets/imgs/search/image-24.jpeg" },
    { title: "Indie", image: "epicodeAssets/imgs/search/image-24.jpeg" },
    { title: "Netflix", image: "epicodeAssets/imgs/search/image-24.jpeg" },
    { title: "GLOW", image: "epicodeAssets/imgs/search/image-24.jpeg" },
    { title: "Rock", image: "epicodeAssets/imgs/search/image-24.jpeg" },
    { title: "R&B", image: "epicodeAssets/imgs/search/image-24.jpeg" }
  ];

  for (let i = 0; i < 30; i++) {
    const data = cardData[i];

    // comando per clonare il contenuto del tag <template>
    const cardNode = cardTemplate.content.cloneNode(true);

    const cardElement = cardNode.querySelector(".card-custom");
    const titleElement = cardNode.querySelector(".card-title-custom");
    const imgElement = cardNode.querySelector(".img-search-custom");

    if (cardElement) {
      cardElement.style.backgroundColor = spotifyColors[i % spotifyColors.length];
    }
    if (titleElement) {
      titleElement.textContent = data.title;
    }
    if (imgElement) {
      imgElement.src = data.image;
      imgElement.alt = data.title;
    }

    rowContainer.appendChild(cardNode);
  }
});

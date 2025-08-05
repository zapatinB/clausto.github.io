const imageSets = {
  "zapatin": [
    "https://www.dropbox.com/scl/fi/hc9q2h7oca46nfgeyet8o/2.jpeg?rlkey=bvo22wzb1m1luswj6t2hapdk7&raw=1",
    "https://www.dropbox.com/scl/fi/j7w03hisgn0knojnwdadh/3.jpeg?rlkey=8mxp78isenla8rt144q0gfk1j&raw=1",
    "https://www.dropbox.com/scl/fi/4ynihbky9gdcjqm9x4vei/4.jpg?rlkey=0zkr0uzak8ui1awocxsi28l7x&raw=1",
    "https://www.dropbox.com/scl/fi/av273mwrdeyqjhwnyflk6/a1.jpg?rlkey=i2d7vea2bys9op74sr3x6otzd&raw=1",
    "https://www.dropbox.com/scl/fi/83j3shza5gvvwhkmynxol/5.jpg?rlkey=61v7x2b43kb5bvh6inuv40cpk&raw=1",
    "https://www.dropbox.com/scl/fi/n2b0e0wmr8v53qlleecwh/6.jpg?rlkey=5gi086d9yr1li6aij56scvxng&raw=1",
    "https://www.dropbox.com/scl/fi/boaoz0n8vw1kcri4ubz0p/7.jpg?rlkey=7ebuttm122frjs3stb1ta40hv&raw=1"
  ],
  "taladro": [
    "images/page2/img1.jpg",
    "images/page2/img2.jpg",
    "images/page2/img3.jpg"
  ],
};

function getPageId() {
  const path = window.location.pathname; // e.g. "/page1.html"
  const page = path.split("/").pop().split(".")[0]; // get 'page1'
  return page;
}

function loadGalleryImages() {
  const pageId = getPageId();
  const images = imageSets[pageId] || [];

  const container = document.querySelector(".content_wrapper");
  container.innerHTML = ""; // Clear previous content

  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Gallery image";
    img.classList.add("gallery-image"); // for CSS styling
    container.appendChild(img);
  });
}

// Run on page load
window.addEventListener("DOMContentLoaded", loadGalleryImages);

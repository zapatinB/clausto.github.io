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
    "https://www.dropbox.com/scl/fi/djm250mcninxcwbw4kema/t1.jpg?rlkey=6qpao1vv1i06pbnk20w414c7x&raw=1",
    "https://www.dropbox.com/scl/fi/c5mhm457ohozktvcy50a4/t2.jpg?rlkey=3osl6d8i6x2w8ey28x3874yhp&raw=1",
    "https://www.dropbox.com/scl/fi/6k0htt6xu3jeidql1km4j/CV_Alejandro_Naranjo_Caraza.jpeg?rlkey=0awn0xxjrtg3vkbp86nplaluz&raw=1",
    "https://www.dropbox.com/scl/fi/a8ql7u40j9b52op769qtq/t4.JPG?rlkey=lsmv4n52bvo9k35sxfwcl4slk&st=nfno0rlm&raw=1",
    "https://www.dropbox.com/scl/fi/hrbusoze9a5cky82slko9/t5.JPG?rlkey=z2us49qmoqp06rnx17kh54ir2&st=xmgh5hy2&raw=1",
    "https://www.dropbox.com/scl/fi/nkzgdz0a3ddlippa12dz5/t6.jpg?rlkey=697vbzzrvjg4ou9cxw1bu6a4b&st=esnfk58m&raw=1",
    "https://www.dropbox.com/scl/fi/7lka4vr08wzbxibp11h4h/t7.jpg?rlkey=37islztjrw4ngaruoanv6zne6&st=emkwqns6&raw=1"
  ],
};

function loadGalleryImages(galleryId) {
  const images = imageSets[galleryId] || [];

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

window.addEventListener("DOMContentLoaded", () => {
  // Optionally load default gallery on page load
  loadGalleryImages("zapatin");

  // Attach click event to all gallery links
  document.querySelectorAll('nav a[data-gallery]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();  // prevent default link behavior
      const galleryId = link.getAttribute("data-gallery");
      loadGalleryImages(galleryId);
    });
  });
});

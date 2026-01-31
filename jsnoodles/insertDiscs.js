async function insertText(textDir, parentId) {
  const parent = document.querySelector(`#${parentId}`);
  //parent.innerHTML = "";
  try {
    const res = await fetch(textDir);
    const text = await res.text();
    const child = document.createElement("p");
    child.textContent = text;//was innerHTML
    parent.appendChild(child);
  }
  catch(err) {
    console.log(err);
  }
}

//<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=537638172/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/track=926764261/transparent=true/" seamless><a href="https://aya-yco.bandcamp.com/album/hexed">hexed! by aya</a></iframe>


async function insertDiscs(yamlDir, discDirRef, parentId) {
  const url = yamlDir;
  const container = document.querySelector(`#${parentId}`);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const text = await response.text();
    const result = jsyaml.load(text);
    for (let key in result) {
      let title = result[key]['title'];
      let textDir = discDirRef+result[key]['name'];
      let imageDir = result[key]['image'];
      let iframeDir = result[key]['iframe'];
      console.log(title);
      console.log(textDir);
      console.log(imageDir);
      console.log(iframeDir);
      const titleElem = document.createElement('h2');
      titleElem.textContent = title;
      const textContainer = document.createElement('div');
      const textId = title.toLowerCase().replace(/[^a-z0-9]/g, '');
      textContainer.setAttribute("id",textId);
      textContainer.setAttribute("class","textContainer");
      container.appendChild(titleElem);
      container.appendChild(textContainer);
      if (imageDir!="") {
        const imageElem = document.createElement("img");
        imageElem.setAttribute("src",imageDir);
        textContainer.appendChild(imageElem);
      }
      if (iframeDir!="") {
        const iframeElem = document.createElement("iframe");
        iframeElem.setAttribute("src",iframeDir);
        iframeElem.style.border = "0";
        iframeElem.style.width = "100%";
        iframeElem.style.height = "120px";
        iframeElem.style.marginBottom = "10px"
        //iframeElem.style.marginTop = "10px"
        iframeElem.setAttribute("seamless", "");
        textContainer.appendChild(iframeElem);
      }
      await insertText(textDir,textId);
    }
  } catch (error) {
    console.error(error.message);
  }
}

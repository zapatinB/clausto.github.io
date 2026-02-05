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

async function insertDiscs(yamlDir, parentId) {
	const textsPath = "/content/discs/texti/"
	const imagesPath = "/static/media/discs/"
  const container = document.querySelector(`#${parentId}`);
  try {
    const response = await fetch(yamlDir);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const text = await response.text();
    const result = jsyaml.load(text);
    for (let key in result) {
      let title = result[key]['title'];
      let textDir = textsPath + result[key]['name'];
      let imageDir = imagesPath + result[key]['image'];
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

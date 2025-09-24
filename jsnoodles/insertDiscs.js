async function insertText(textDir, parentId) {
  const parent = document.querySelector(`#${parentId}`);
  parent.innerHTML = "";
  try {
    const res = await fetch(textDir);
    const text = await res.text();
    const child = document.createElement("pre");
    child.textContent = text;//was innerHTML
    parent.appendChild(child);
  }
  catch(err) {
    console.log(err);
  }
}

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
      console.log(title);
      console.log(textDir);
      console.log(imageDir);
      const titleElem = document.createElement('h2');
      titleElem.textContent = title;
      const textElem = document.createElement('div');
      const textId = title.toLowerCase().replace(/[^a-z0-9]/g, '');
      textElem.setAttribute("id",textId);
      container.appendChild(titleElem);
      if (imageDir!="") {
        const imgElem = document.createElement('img');
        imgElem.setAttribute("src",imageDir);
        container.appendChild(imgElem);
      }
      container.appendChild(textElem);
      await insertText(textDir,textId);
    }
  } catch (error) {
    console.error(error.message);
  }
}

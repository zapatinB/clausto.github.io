async function insertText(textDir, parentId) {
  const parent = document.querySelector(`#${parentId}`);
  parent.innerHTML = "";
  try {
    const res = await fetch(textDir);
    const text = await res.text();
    const child = document.createElement("pre");
    child.innerHTML = text;
    parent.appendChild(child);
  }
  catch(err) {
    console.log(err);
  }
}

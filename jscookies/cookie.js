function squared(num) {
  return num * num;
}

function cubed(num) {
  return num * num * num;
}

function factorial(num) {
  if (num < 0) return undefined;
  if (num === 0) return 1;
  let x = num - 1;
  while (x > 1) {
    num *= x;
    x--;
  }
  return num;
}

function fizbuz(num) {
  fizbuzout.textContent = "";
  for (let i=1; i<=num; i++) {
    if (i%3 == 0 & i%5 == 0) {
      fizbuzout.textContent += "fizbuz";
    }
    else if (i%3 == 0) {
      fizbuzout.textContent += "fiz ";
    }
    else if (i%5 == 0) {
      fizbuzout.textContent += "buz ";
    }
    else {
      fizbuzout.textContent += i + " ";
    }
  }
  fizbuzout.textContent += "Olé."
}

let out = "Checa esto";
const input = document.getElementById("input")
const para = document.getElementById("output")
input.addEventListener("change", () => {
  const num = parseFloat(input.value);
  if (isNaN(num)) {
    para.textContent = "Mete un número.";
  } else {
    para.textContent = `${num} al cuadrado es ${squared(num)}. `;
    para.textContent += `${num} al cubo ${cubed(num)}. `;
    para.textContent += `${num} factorial es ${factorial(num)}. Olé `;
  }
});

let fizbuzin = document.getElementById("fizbuzin")
let fizbuzout = document.getElementById("fizbuzout")
fizbuzin.addEventListener("change", () => {
  const num = parseInt(fizbuzin.value);
  if (isNaN(num)) {
    fizbuzout.textContent = "Mete un número";
  }
  else {
    fizbuz(num)
  }
});


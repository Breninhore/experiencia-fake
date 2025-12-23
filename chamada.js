const audio = document.getElementById("audio");
const tempo = document.getElementById("tempo");
const status = document.getElementById("status");
const tela = document.getElementById("tela");
const slider = document.getElementById("slider");

let segundos = 0;
let contador = null;
let inicioY = null;
let vibrando = true;
let atendida = false;

/* ===== VIBRAÇÃO REAL DO CELULAR ===== */
if (navigator.vibrate) {
  vibrar();
}

function vibrar() {
  if (!vibrando) return;
  navigator.vibrate([500, 300]);
  setTimeout(vibrar, 900);
}

/* ===== SLIDE PARA ATENDER ===== */
slider.addEventListener("touchstart", (e) => {
  inicioY = e.touches[0].clientY;
});

slider.addEventListener("touchmove", (e) => {
  if (!inicioY || atendida) return;

  let atualY = e.touches[0].clientY;
  let diferenca = inicioY - atualY;

  if (diferenca > 40) {
    slider.classList.add("arrastando");
  }
});

slider.addEventListener("touchend", () => {
  if (slider.classList.contains("arrastando") && !atendida) {
    atender();
  }

  slider.classList.remove("arrastando");
  inicioY = null;
});

/* ===== ATENDER CHAMADA ===== */
function atender() {
  atendida = true;
  vibrando = false;

  navigator.vibrate(0);
  tela.classList.remove("vibrating");

  status.style.display = "none";
  tempo.style.display = "block";

  audio.play();

  contador = setInterval(() => {
    segundos++;
    let min = String(Math.floor(segundos / 60)).padStart(2, "0");
    let sec = String(segundos % 60).padStart(2, "0");
    tempo.innerText = `${min}:${sec}`;
  }, 1000);

  audio.onended = () => {
    clearInterval(contador);
    tempo.innerText = "Encerrado";
  };
}


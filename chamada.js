const audio = document.getElementById("audio");
const vibracaoAudio = document.getElementById("vibracao");
const tempo = document.getElementById("tempo");
const status = document.getElementById("status");
const tela = document.getElementById("tela");
const slider = document.getElementById("slider");
const indicacao = document.querySelector(".indicacao");

let segundos = 0;
let contador = null;
let inicioY = null;
let atendida = false;
let vibrando = false;
let audioLiberado = false;

/* ===============================
   LIBERAR ÁUDIO NO PRIMEIRO TOQUE
================================ */
document.addEventListener("touchstart", () => {
  if (audioLiberado) return;

  vibracaoAudio.volume = 0.6;
  vibracaoAudio.currentTime = 0;

  vibracaoAudio.play().then(() => {
    // agora o navegador liberou áudio
    audioLiberado = true;

    vibrando = true;
    tela.classList.add("vibrating");
    vibrar();
  }).catch(() => {});
}, { once: true });

/* ===============================
   VIBRAÇÃO DO CELULAR
================================ */
function vibrar() {
  if (!vibrando) return;
  navigator.vibrate([500, 300]);
  setTimeout(vibrar, 900);
}

/* ===============================
   SLIDE PARA ATENDER
================================ */
slider.addEventListener("touchstart", (e) => {
  if (atendida) return;
  inicioY = e.touches[0].clientY;
});

slider.addEventListener("touchmove", (e) => {
  if (!inicioY || atendida) return;

  const atualY = e.touches[0].clientY;
  const diferenca = inicioY - atualY;

  if (diferenca > 20) {
    slider.classList.add("arrastando");
    indicacao.style.opacity = "0";
  }
});

slider.addEventListener("touchend", () => {
  if (slider.classList.contains("arrastando") && !atendida) {
    atender();
  } else {
    indicacao.style.opacity = "1";
  }

  slider.classList.remove("arrastando");
  inicioY = null;
});

/* ===============================
   ATENDER CHAMADA
================================ */
function atender() {
  if (atendida) return;
  atendida = true;

  // PARA VIBRAÇÃO E SOM
  vibrando = false;
  vibracaoAudio.pause();
  vibracaoAudio.currentTime = 0;
  navigator.vibrate(0);
  tela.classList.remove("vibrating");

  // UI
  indicacao.style.display = "none";
  status.style.display = "none";
  tempo.style.display = "block";

  // INICIA ÁUDIO DA CHAMADA
  audio.currentTime = 0;
  audio.play();

  // CONTADOR
  contador = setInterval(() => {
    segundos++;
    const min = String(Math.floor(segundos / 60)).padStart(2, "0");
    const sec = String(segundos % 60).padStart(2, "0");
    tempo.innerText = `${min}:${sec}`;
  }, 1000);

  audio.onended = () => {
    clearInterval(contador);
    tempo.innerText = "Encerrado";
  };
}












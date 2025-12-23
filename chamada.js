const audio = document.getElementById("audio");
const tempo = document.getElementById("tempo");
const status = document.getElementById("status");
const tela = document.getElementById("tela");

let segundos = 0;
let contador;

// vibração real do celular
if (navigator.vibrate) {
  vibrar();
}

function vibrar() {
  navigator.vibrate([500, 300]);
  setTimeout(vibrar, 900);
}

function atender() {
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

let vibrando = true;
let audio = document.getElementById("audio");

// Vibração contínua
if (navigator.vibrate) {
    vibrar();
}

function vibrar() {
    if (!vibrando) return;
    navigator.vibrate([500, 300, 500]);
    setTimeout(vibrar, 1300);
}

// Atender chamada
function atender() {
    vibrando = false;
    navigator.vibrate(0);
    audio.play();
}

// Recusar (por enquanto só para)
function recusar() {
    vibrando = false;
    navigator.vibrate(0);
    alert("Chamada recusada");
}

document.getElementById('dar-banana').addEventListener('click', function() {
  if (animacionEspecialActiva) return; // Evita interacción durante la animación especial
  reproducirSonido('banana.mp3'); // <--- AÑADIDO: Sonido de banana
  const animacion = document.getElementById('animacion');
  let globo = document.getElementById('globo-mensaje');
  if (!globo) {
    globo = document.createElement('div');
    globo.id = 'globo-mensaje';
    globo.className = 'globo-mensaje';
    document.getElementById('mono').appendChild(globo);
  }
  globo.textContent = '';
  globo.style.display = 'none';
  const mono = document.getElementById('mono');
  const boton = document.getElementById('dar-banana');

  // Crear la banana animada
  const banana = document.createElement('img');
  banana.src = 'banana.png';
  banana.alt = 'banana';
  banana.className = 'banana-lanzada';
  document.body.appendChild(banana);

  // Obtener posición del botón y del mono
  const botonRect = boton.getBoundingClientRect();
  const monoRect = mono.getBoundingClientRect();

  // Posicionar la banana sobre el botón
  banana.style.position = 'fixed';
  banana.style.left = (botonRect.left + botonRect.width/2 - 12) + 'px';
  banana.style.top = (botonRect.top - 8) + 'px';
  banana.style.width = '24px';
  banana.style.height = '24px';
  banana.style.zIndex = 1000;
  banana.style.transition = 'left 0.5s cubic-bezier(.5,1.5,.5,1), top 0.5s cubic-bezier(.5,1.5,.5,1)';

  setTimeout(() => {
    // Animar la banana hacia el mono
    banana.style.left = (monoRect.left + monoRect.width/2 - 12) + 'px';
    banana.style.top = (monoRect.top + monoRect.height/2 - 12) + 'px';
  }, 10);

  setTimeout(() => {
    banana.remove();
    // Eliminar todas las cacas acumuladas inmediatamente
    cacas.forEach(c => c.remove());
    cacas = [];
    // Selección aleatoria de mensaje
    const mensajes = ['Buen banano', 'Mal banano', 'Tirame una monea'];
    const idx = Math.floor(Math.random() * mensajes.length);
    globo.textContent = mensajes[idx];
    globo.style.display = 'block';
    if (mensajes[idx] === 'Mal banano') {
      animacionEspecialActiva = true;
      reproducirSonido('caca.mp3'); // <--- AÑADIDO: Sonido de caca
      setTimeout(() => {
        const feca3d = document.createElement('img');
        feca3d.className = 'feca feca-3d animar-3d';
        feca3d.src = 'caca8bit.png';
        feca3d.alt = 'caca';
        const monoRect = mono.getBoundingClientRect();
        const animacionRect = animacion.getBoundingClientRect();
        const centerX = monoRect.left + monoRect.width / 2;
        const centerY = monoRect.top + monoRect.height / 2;
        const animacionX = animacionRect.left;
        const animacionY = animacionRect.top;
        feca3d.style.left = (centerX - animacionX - 9) + 'px';
        feca3d.style.top = (centerY - animacionY - 9) + 'px';
        feca3d.style.transform = 'scale(1)';
        feca3d.style.position = 'absolute';
        feca3d.style.zIndex = 120;
        animacion.appendChild(feca3d);
        mostrarSocialCredit('social-credit-score-bad.gif', {delta: -38});
        setTimeout(() => {
          feca3d.style.transition = 'transform 1s cubic-bezier(.5,1.5,.5,1), left 1s, top 1s';
          feca3d.style.transform = 'scale(3) translate(-40px, 80px)';
          feca3d.style.left = (centerX - animacionX - 49) + 'px';
          feca3d.style.top = (centerY - animacionY + 71) + 'px';
        }, 50);
        setTimeout(() => {
          feca3d.remove();
          animacionEspecialActiva = false;
        }, 1200);
        mono.classList.add('saltar');
        setTimeout(() => {
          mono.classList.remove('saltar');
        }, 500);
        globo.style.display = 'none';
      }, 500);
    } else if (mensajes[idx] === 'Tirame una monea') {
      // Mostrar botón de lanzar moneda por 0.9 segundos
      let botonMoneda = document.getElementById('lanzar-moneda');
      if (!botonMoneda) {
        botonMoneda = document.createElement('button');
        botonMoneda.id = 'lanzar-moneda';
        botonMoneda.textContent = 'Lanzar moneda 🪙';
        botonMoneda.style.marginTop = '12px';
        botonMoneda.style.display = 'block';
        botonMoneda.style.background = '#e0e0e0';
        botonMoneda.style.border = 'none';
        botonMoneda.style.borderRadius = '8px';
        botonMoneda.style.padding = '10px 20px';
        botonMoneda.style.fontSize = '1.1em';
        botonMoneda.style.cursor = 'pointer';
        document.querySelector('.container').appendChild(botonMoneda);
      } else {
        botonMoneda.style.display = 'block';
      }
      // Reiniciar el estado de lanzamiento cada vez que aparece el botón
      botonMoneda._monedaLanzada = false;
      setTimeout(() => {
        botonMoneda.style.display = 'none';
        if (!botonMoneda._monedaLanzada) {
          mostrarSocialCredit('castigo_moneda.jpg', {delta: -100000});
        }
      }, 900);
      botonMoneda.onclick = function() {
        if (animacionEspecialActiva) return;
        animacionEspecialActiva = true;
        reproducirSonido('sonido-moneda.mp3'); // <--- AÑADIDO: Sonido de moneda
        botonMoneda._monedaLanzada = true;
        // Animación de lanzar moneda (igual que banana)
        const moneda = document.createElement('img');
        moneda.src = 'moneda.png';
        moneda.alt = 'moneda';
        moneda.className = 'banana-lanzada';
        document.body.appendChild(moneda);
        const botonRect = botonMoneda.getBoundingClientRect();
        const monoRect = mono.getBoundingClientRect();
        moneda.style.position = 'fixed';
        moneda.style.left = (botonRect.left + botonRect.width/2 - 12) + 'px';
        moneda.style.top = (botonRect.top - 8) + 'px';
        moneda.style.width = '24px';
        moneda.style.height = '24px';
        moneda.style.zIndex = 1000;
        moneda.style.transition = 'left 0.5s cubic-bezier(.5,1.5,.5,1), top 0.5s cubic-bezier(.5,1.5,.5,1)';
        setTimeout(() => {
          moneda.style.left = (monoRect.left + monoRect.width/2 - 12) + 'px';
          moneda.style.top = (monoRect.top + monoRect.height/2 - 12) + 'px';
        }, 10);
        setTimeout(() => {
          moneda.remove();
          mostrarSocialCredit('69420credits.jpg', {delta: 69420});
          animacionEspecialActiva = false;
        }, 520);
        botonMoneda.style.display = 'none';
      };
    } else if (mensajes[idx] === 'Buen banano') {
      mostrarSocialCredit('social-credit-score.gif', {delta: 15});
    }
  }, 520);
});
// Preparado para usar sprites 8bit en vez de figuras CSS en siguientes pasos
// Variables para acumulación de cacas
let cacas = [];
let animacionEspecialActiva = false;
// Contador de social credits
let socialCredits = 0;
function actualizarSocialCredits(delta) {
  socialCredits += delta;
  let contador = document.getElementById('contador-social-credits');
  if (!contador) {
    contador = document.createElement('div');
    contador.id = 'contador-social-credits';
    contador.style.position = 'fixed';
    contador.style.top = '32px';
    contador.style.right = '32px';
    contador.style.background = '#fffbe6';
    contador.style.color = '#4a3c1a';
    contador.style.border = '2px solid #e2c96b';
    contador.style.borderRadius = '16px';
    contador.style.padding = '16px 28px';
    contador.style.fontSize = '1.5em';
    contador.style.fontWeight = 'bold';
    contador.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)';
    contador.style.zIndex = '3000';
    contador.style.transition = 'background 0.3s';
    document.body.appendChild(contador);
  }
  contador.textContent = 'Social Credits: ' + socialCredits.toLocaleString('es-ES');
  contador.style.background = delta < 0 ? '#ffeaea' : '#eaffea';
  setTimeout(() => {
    contador.style.background = '#fffbe6';
  }, 600);
}
// Mostrar social-credit-score.gif o bad.gif en la esquina superior izquierda
function mostrarSocialCredit(src, opciones = {}) {
  let cont = document.getElementById('social-credit-container');
  if (!cont) {
    cont = document.createElement('div');
    cont.id = 'social-credit-container';
    cont.style.position = 'fixed';
    cont.style.top = '16px';
    cont.style.left = '16px';
    cont.style.zIndex = '2000';
    document.body.appendChild(cont);
  }
  cont.innerHTML = '';
  const img = document.createElement('img');
  img.src = src;
  img.alt = 'social credit';
  // Si es castigo_moneda o 62420credits, hacerla más grande
  if (src === 'castigo_moneda.jpg' || src === '69420credits.jpg') {
    img.style.width = '320px';
    img.style.height = '320px';
  } else {
    img.style.width = '192px';
    img.style.height = '192px';
  }
  img.style.borderRadius = '0';
  img.style.boxShadow = '0 2px 12px rgba(0,0,0,0.18)';
  img.style.background = '#fff';
  cont.appendChild(img);
  cont.style.display = 'block';
  // Si es castigo_moneda o 62420credits, mostrar más tiempo
  let duracion = 2000;
  if (src === 'castigo_moneda.jpg' || src === '69420credits.jpg') duracion = 4000;
  setTimeout(() => {
    cont.style.display = 'none';
  }, duracion);
  // Si se pasa la opción de socialCredits, actualizar
  if (opciones && typeof opciones.delta === 'number') {
    actualizarSocialCredits(opciones.delta);
  }
}

// Función para reproducir sonidos
function reproducirSonido(src) {
  const audio = new Audio(src);
  audio.play();
}

// Música de fondo
window.addEventListener('load', () => {
  const musicaFondo = document.createElement('audio');
  musicaFondo.src = 'musica-fondo.mp3';
  musicaFondo.loop = true;
  musicaFondo.autoplay = true;
  musicaFondo.volume = 0.5; // Ajusta el volumen si es necesario
  document.body.appendChild(musicaFondo);

  // Intento de reproducir después de interacción del usuario si autoplay está bloqueado
  document.body.addEventListener('click', () => {
    if (musicaFondo.paused) {
      musicaFondo.play().catch(e => console.error("Error al reproducir música de fondo:", e));
    }
  }, { once: true });
});
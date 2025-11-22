

/*-------------scroll aos -----------------*/


AOS.init();



// --------------------------- music -------------------------------

document.addEventListener('DOMContentLoaded', function () {
  const playButton = document.getElementById('play');
  const pauseButton = document.getElementById('pause');
  const audio = document.querySelector('audio');
  const musicImg = document.querySelector('.music__img');

  // Ocultar el botón de pausa al inicio
  pauseButton.style.display = 'none';

  // Función para iniciar el spinner
  function startSpinner() {
    let rotation = 0;
    musicImg.style.transformOrigin = 'center center'; // Asegurar que el punto de origen esté centrado
    musicImg.dataset.rotating = 'true'; // Marcar que está girando

    // Función de animación
    function rotate() {
      if (musicImg.dataset.rotating !== 'true') return; // Salir si se detiene la rotación
      rotation += 2; // Ajustar velocidad de rotación (incremento de grados)
      musicImg.style.transform = `rotate(${rotation}deg)`; // Aplicar rotación
      requestAnimationFrame(rotate); // Siguiente frame de animación
    }

    // Iniciar la animación
    rotate();
  }

  // Función para detener el spinner
  function stopSpinner() {
    musicImg.dataset.rotating = 'false'; // Marcar que no está girando
  }

  playButton.addEventListener('click', function () {
    audio.play();
    playButton.style.display = 'none'; // Ocultar el botón de play
    pauseButton.style.display = 'inline-block'; // Mostrar el botón de pausa
    startSpinner(); // Iniciar el spinner cuando se inicie la música
  });

  pauseButton.addEventListener('click', function () {
    audio.pause();
    pauseButton.style.display = 'none'; // Ocultar el botón de pausa
    playButton.style.display = 'inline-block'; // Mostrar el botón de play
    stopSpinner(); // Detener el spinner cuando se pause la música
  });

  // Adelantar la canción
  document.getElementById('forward').addEventListener('click', function () {
    audio.currentTime += 10; // Adelantar 10 segundos (ajustable según necesidad)
  });

  // Rebobinar la canción
  document.getElementById('rewind').addEventListener('click', function () {
    audio.currentTime -= 10; // Rebobinar 10 segundos (ajustable según necesidad)
  });

});




// ---------------------- temporizador -------------------------
function updateTimer() {
  const targetDate = new Date("february 21, 2026 21:00:00").getTime();
  const currentDate = new Date().getTime();
  const timeRemaining = targetDate - currentDate;

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

updateTimer();
setInterval(updateTimer, 1000);

// --------------------------------fotos---------------------------------




document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
  });

  // Inicializar Fancybox
  $(".fancybox").fancybox({
    buttons: [
      "zoom",
      "slideShow",
      "fullScreen",
      "thumbs",
      "close"
    ],
    loop: true,
    infobar: true,
    arrows: true,
    protect: true,
    animationEffect: "fade",
    transitionEffect: "slide",
    transitionDuration: 500,
    touch: {
      vertical: false,
    },
    autoFocus: false,
  });
});




// --------------------------- dresscode-------------------------


const showImageBtn = document.getElementById("showImage");
const lightbox = document.getElementById("lightbox");
const closeButton = document.getElementById("closeButton");

showImageBtn.addEventListener("click", function () {
  lightbox.style.display = "flex";
});

closeButton.addEventListener("click", function () {
  lightbox.style.display = "none";
});

const boton = document.getElementById('mostrarBoton');
const textoDesplegable = document.getElementById('textoDesplegable');

boton.addEventListener('click', () => {
  textoDesplegable.classList.toggle('oculto');
});


// --------------------------------gift---------------------------------

document.addEventListener('DOMContentLoaded', function () {
  const boton = document.getElementById('mostrarBoton');
  const textoDesplegable = document.getElementById('textoDesplegable');

  boton.addEventListener('click', function () {
    textoDesplegable.classList.toggle('mostrar');
  });
});


function copyText() {
  var aliasText = document.getElementById('alias').innerText; // Obtener el texto del alias
  var tempInput = document.createElement('input');
  tempInput.value = aliasText;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  // Mostrar el mensaje de "¡Copiado!"
  var copyMessage = document.getElementById('copyMessage');
  copyMessage.style.display = 'block';
  setTimeout(function () {
    copyMessage.style.display = 'none';
  }, 1500); // Ocultar el mensaje después de 1.5 segundos
}



function copyCbuText() {
  const aliasText = document.getElementById('cbuAlias').textContent;
  const copyMessage = document.getElementById('copyCbuMessage');

  const textarea = document.createElement('textarea');
  textarea.value = aliasText;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  copyMessage.style.display = 'block';
  setTimeout(() => {
    copyMessage.style.display = 'none';
  }, 2000);
}


// --------------------------- playlist --------------------------------

document.addEventListener('DOMContentLoaded', function () {

  function sendMessage() {
    const name = document.getElementById('userName').value.trim();
    const message = document.getElementById('whatsappMessage').value.trim();
    const selectedPhone = document.querySelector('input[name="playlistPhone"]:checked');

    if (name === '' || message === '') {
      alert('Por favor, completa ambos campos antes de enviar.');
      return;
    }

    if (!selectedPhone) {
      alert('Por favor, selecciona a quién quieres enviar el mensaje.');
      return;
    }

    const fullMessage =
      `*Nombre y Apellido:* ${name}\n\n` +
      `*Tema recomendado:* ${message}`;

    const whatsappURL =
      `https://wa.me/${selectedPhone.value}?text=${encodeURIComponent(fullMessage)}`;

    window.open(whatsappURL, '_blank');
    alert('Mensaje enviado');

    document.getElementById('userName').value = '';
    document.getElementById('whatsappMessage').value = '';
    document.querySelectorAll('input[name="playlistPhone"]').forEach(r => r.checked = false);

    document.querySelector('.playlist').scrollIntoView({ behavior: 'smooth' });
  }

  document.getElementById('botonplay1').addEventListener('click', sendMessage);
  document.getElementById('botonplay2').addEventListener('click', sendMessage);
});



// --------------------------------menu 2---------------------------------
document.addEventListener('DOMContentLoaded', function () {

  function sendCondMessage() {
    const name = document.getElementById('condName').value.trim();
    const condition = document.getElementById('condMessage').value.trim();
    const selectedPhone = document.querySelector('input[name="condPhone"]:checked');

    if (name === '' || condition === '') {
      alert('Por favor, completa ambos campos antes de enviar.');
      return;
    }

    if (!selectedPhone) {
      alert('Por favor, selecciona a quién quieres enviar el mensaje.');
      return;
    }

    const fullMessage =
      `*Nombre y Apellido:* ${name}\n\n` +
      `*Condición alimentaria:* ${condition}`;

    const whatsappURL =
      `https://wa.me/${selectedPhone.value}?text=${encodeURIComponent(fullMessage)}`;

    window.open(whatsappURL, '_blank');
    alert('Información enviada con éxito');

    document.getElementById('condName').value = '';
    document.getElementById('condMessage').value = '';
    document.querySelectorAll('input[name="condPhone"]').forEach(r => r.checked = false);

    document.querySelector('#condicion').scrollIntoView({ behavior: 'smooth' });
  }

  document.getElementById('condBtn1').addEventListener('click', sendCondMessage);
  document.getElementById('condBtn2').addEventListener('click', sendCondMessage);
});



// --------------------------------Invitados---------------------------------

// Función para normalizar el texto eliminando acentos
function eliminarAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Función para capitalizar la primera letra
function capitalizarPrimeraLetra(texto) {
  if (texto.length === 0) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Función para buscar la mesa por nombre
function buscarMesa() {
  // Obtener el valor del nombre de la búsqueda, eliminar espacios y convertirlo a minúsculas y eliminar acentos
  var nombreBuscado = eliminarAcentos(document.getElementById("nombreBusqueda").value.trim().toLowerCase());

  // Validar si se ingresó un nombre
  if (nombreBuscado !== "") {
    // Simular una búsqueda (puedes ajustar esto según tu situación real)
    var mesaInfo = obtenerInformacionMesa(nombreBuscado);

    // Validar si se encontró la mesa
    if (mesaInfo !== null) {
      // Capitalizar la primera letra del nombre
      var nombreCapitalizado = capitalizarPrimeraLetra(mesaInfo.nombre);

      // Crear el texto a desplegar
      var texto = "¡Hola, " + nombreCapitalizado + "! " + mesaInfo.textoLibre;

      // Mostrar el texto en el div de resultado con transición suave
      var resultadoDiv = document.getElementById("resultado");
      resultadoDiv.innerText = texto;
      resultadoDiv.style.display = "block"; // Mostrar el div
      resultadoDiv.style.opacity = 1;

      // Limpiar el input de búsqueda
      document.getElementById("nombreBusqueda").value = "";
    } else {
      alert("Lo siento, no se encontró el nombre ingresado, prueba con mayúsculas o minúsculas");
    }
  } else {
    alert("Por favor, ingrese su nombre.");
  }
}

// Función de ejemplo para obtener la información de la mesa (puedes personalizar según tus necesidades)
function obtenerInformacionMesa(nombre) {
  // Simulamos una búsqueda, aquí deberías implementar la lógica real
  var invitados = [
    { nombre: "Estela Beatriz Gaspar", textoLibre: "Su invitación corresponde para 1 persona" },
    { nombre: "Andres Rene Yanos", textoLibre: "Su invitación corresponde para 1 persona" },
    { nombre: "Angelica Rosario Lasquera", textoLibre: "Su invitación corresponde para 1 persona" },
  ];

  for (var i = 0; i < invitados.length; i++) {
    // Convertir los nombres a minúsculas y eliminar acentos para la comparación
    if (eliminarAcentos(invitados[i].nombre.toLowerCase()) === nombre) {
      return invitados[i]; // Retornar el objeto completo para usar el nombre capitalizado
    }
  }

  return null; // Retornar null si no se encuentra el nombre
}



// ---------------------menu----------------------


document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('precio__toggle-btn');
  const mostrarSection = document.getElementById('precio__mostrar');
  const copyCbuBtn = document.getElementById('precio__copy-cbu');
  const copyAliasBtn = document.getElementById('precio__copy-alias');

  // Toggle bank details
  toggleBtn.addEventListener('click', () => {
    mostrarSection.classList.toggle('active');
    toggleBtn.textContent = mostrarSection.classList.contains('active')
      ? 'Ocultar datos bancarios'
      : 'Ver datos bancarios para pagos';
  });

  // Función común para copiar texto (para CBU y Alias)
  const copiarTexto = (button, elementSelector) => {
    const element = document.querySelector(elementSelector);
    if (element) {
      const text = element.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        button.textContent = `¡${elementSelector === '.precio__CBU' ? 'CBU' : 'Alias'} Copiado!`;
        setTimeout(() => {
          button.textContent = `Copiar ${elementSelector === '.precio__CBU' ? 'CBU' : 'Alias'}`;
        }, 2000);
      });
    } else {
      // Si el elemento no existe, cambia el texto del botón para informar al usuario
      button.textContent = `${elementSelector === '.precio__CBU' ? 'CBU' : 'Alias'} no disponible`;
      setTimeout(() => {
        button.textContent = `Copiar ${elementSelector === '.precio__CBU' ? 'CBU' : 'Alias'}`;
      }, 2000);
    }
  };

  // Copy CBU
  if (copyCbuBtn) {
    copyCbuBtn.addEventListener('click', () => {
      copiarTexto(copyCbuBtn, '.precio__CBU');
    });
  }

  // Copy Alias
  if (copyAliasBtn) {
    copyAliasBtn.addEventListener('click', () => {
      copiarTexto(copyAliasBtn, '.precio__alias');
    });
  }

  // Lightbox del menú
  const btnAbrir = document.querySelector('.foto__menu');
  const lightbox = document.getElementById('menuFotoLightbox');
  const btnCerrar = document.getElementById('menuFotoCerrar');
  const overlay = document.querySelector('.menuFoto-overlay');

  // Abrir lightbox
  btnAbrir.addEventListener('click', () => {
    lightbox.style.display = 'block';
    setTimeout(() => lightbox.classList.add('activo'), 10);
  });

  // Cerrar lightbox
  const cerrarLightbox = () => {
    lightbox.classList.remove('activo');
    setTimeout(() => (lightbox.style.display = 'none'), 0);
  };

  btnCerrar.addEventListener('click', cerrarLightbox);
  overlay.addEventListener('click', cerrarLightbox);

  // Prevenir cierre al hacer click en la imagen
  document.querySelector('.menuFoto-imagen').addEventListener('click', (e) => {
    e.stopPropagation();
  });
});





// --------------- confirmacion --------------------------------------



document.addEventListener('DOMContentLoaded', function () {

  function sendMessage() {
    const userName = document.getElementById('userFullName').value.trim();
    const userMessage = document.getElementById('customMessage').value.trim();
    const attendanceStatus = document.querySelector('input[name="attendanceOption"]:checked');
    const selectedPhone = document.querySelector('input[name="whatsappNumber"]:checked');

    if (!attendanceStatus) {
      alert('Por favor, selecciona si asistirás o no.');
      return;
    }

    if (!selectedPhone) {
      alert('Por favor, selecciona a qué número enviar.');
      return;
    }

    if (userName === '') {
      alert('Por favor, completa todos los datos');
      return;
    }

    const finalMessage =
      `*Presencia:* ${attendanceStatus.value}\n` +
      `*Nombre y Apellido:* ${userName}\n` +
      `*Mensaje:* ${userMessage ? userMessage : 'N/A'}`;

    const whatsappLink =
      `https://wa.me/${selectedPhone.value}?text=${encodeURIComponent(finalMessage)}`;

    window.open(whatsappLink, '_blank');
    alert('Mensaje enviado');

    document.getElementById('userFullName').value = '';
    document.getElementById('customMessage').value = '';
    document.querySelectorAll('input[name="attendanceOption"]').forEach(r => r.checked = false);
    document.querySelectorAll('input[name="whatsappNumber"]').forEach(r => r.checked = false);

    document.getElementById('correo').scrollIntoView({ behavior: 'smooth' });
  }

  document.getElementById('botoncito1').addEventListener('click', sendMessage);
  document.getElementById('botoncito2').addEventListener('click', sendMessage);
});







function descargarArchivo() {
  // Mostrar la alerta "Descargado" durante 1 segundo
  setTimeout(function () {
    alert('Descargado');
  }, 1000);
}
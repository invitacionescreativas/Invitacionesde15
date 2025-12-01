


// -------------------- TEMPORIZADOR ---------------------



// ---------------------- temporizador -------------------------
function updateTimer() {
  const targetDate = new Date("december 13, 2025 21:00:00").getTime();
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





// ---------------------- LIGHTBOX CONFIRMACION ----------------



// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init();
    
    // Obtener referencias a los elementos
    const openButton = document.getElementById('openLightboxBtn');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    
    // Función para abrir el lightbox
    function openLightbox() {
        if (lightboxOverlay) {
            lightboxOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Función para cerrar el lightbox
    function closeLightbox() {
        if (lightboxOverlay) {
            lightboxOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
    
    // Asignar evento al botón para abrir el lightbox
    if (openButton) {
        openButton.addEventListener('click', function(e) {
            e.preventDefault();
            openLightbox();
        });
    }
    
    // Asignar evento para cerrar el lightbox cuando se hace clic en la X
    document.addEventListener('click', function(e) {
        // Si el elemento clickeado tiene la clase lightbox__close o es un hijo de este
        if (e.target.classList.contains('lightbox__close') || e.target.closest('.lightbox__close')) {
            closeLightbox();
        }
        // Si se hace clic directamente en el overlay (fondo oscuro)
        else if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });
    
    // Cerrar con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});

// --------------  CONFIRMACION ---------------
(function() {
    const siBtn = document.getElementById('siAsistire');
    const noBtn = document.getElementById('noAsistire');
    const confirmBtn = document.querySelector('.lightbox__confirm');
    const nombreInput = document.querySelector('#confirmationLightbox .lightbox__input');
    const mensajeInput = document.querySelector('#confirmationLightbox .lightbox__textarea');
    let asistenciaSeleccionada = null;

    if (siBtn && noBtn) {
        siBtn.addEventListener('click', function() {
            siBtn.classList.add('selected');
            noBtn.classList.remove('selected');
            asistenciaSeleccionada = 'SI';
        });
        noBtn.addEventListener('click', function() {
            noBtn.classList.add('selected');
            siBtn.classList.remove('selected');
            asistenciaSeleccionada = 'NO';
        });
    }

    if (confirmBtn && nombreInput && mensajeInput) {
        confirmBtn.addEventListener('click', function() {
            const nombre = nombreInput.value.trim();
            const mensaje = mensajeInput.value.trim();
            if (!nombre) {
                alert('Por favor, ingresa tu nombre');
                return;
            }
            if (!asistenciaSeleccionada) {
                alert('Por favor, selecciona si asistirás o no');
                return;
            }
            let mensajeWhatsapp = `Hola, mi nombre es: *${nombre}* y quiero confirmar que *${asistenciaSeleccionada} asistiré*`;
            if (mensaje) {
                mensajeWhatsapp += `, Mi mensaje es  ${mensaje}`;
            }
            const mensajeCodificado = encodeURIComponent(mensajeWhatsapp);
            const numeroWhatsapp = '543816591298';
            const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${mensajeCodificado}`;
            window.open(urlWhatsapp, '_blank');
            // Limpiar campos y selección
            nombreInput.value = '';
            mensajeInput.value = '';
            siBtn.classList.remove('selected');
            noBtn.classList.remove('selected');
            asistenciaSeleccionada = null;
        });
    }
})();

// ----------------- fotos -----------------------

var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0,
        stretch: 4,
        depth: 3,
        modifier: 50,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
    autoplay: {
        delay: 2000, // Time between slides in milliseconds (e.g., 3 seconds)
        disableOnInteraction: false, // Set to true to stop autoplay on user interaction (e.g., dragging)
    },
    loop: true, // Enable infinite loop
});

// Lightbox Playlist
const playlistBtn = document.getElementById('playlist');
const lightboxPlaylist = document.getElementById('lightboxPlaylist');
if (playlistBtn && lightboxPlaylist) {
    playlistBtn.addEventListener('click', () => {
        lightboxPlaylist.classList.add('active');
    });
    lightboxPlaylist.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox-custom-overlay') || e.target.classList.contains('lightbox__close')) {
            lightboxPlaylist.classList.remove('active');
        }
    });
    // --- Enviar sugerencia por WhatsApp ---
    const whatsappNumber = '543884561511'; // Cambia aquí el número si lo necesitas
    const inputs = lightboxPlaylist.querySelectorAll('.lightbox__input');
    const suggestBtn = lightboxPlaylist.querySelector('.lightbox__button');
    if (inputs.length >= 2 && suggestBtn) {
        suggestBtn.addEventListener('click', () => {
            const nombre = inputs[0].value.trim();
            const cancion = inputs[1].value.trim();
            if (!nombre) {
                alert('Por favor, ingresa tu nombre');
                return;
            }
            if (!cancion) {
                alert('Por favor, ingresa el nombre de la canción o el link');
                return;
            }
            const mensaje = `Hola, mi nombre es *${nombre}* y mi tema recomendado es *${cancion}*`;
            const mensajeCodificado = encodeURIComponent(mensaje);
            const urlWhatsapp = `https://wa.me/${whatsappNumber}?text=${mensajeCodificado}`;
            window.open(urlWhatsapp, '_blank');
            // Opcional: limpiar los campos
            inputs[0].value = '';
            inputs[1].value = '';
            lightboxPlaylist.classList.remove('active');
        });
    }
}
// Lightbox Dresscode
const dresscodeBtn = document.getElementById('dresscode');
const lightboxDresscode = document.getElementById('lightboxDresscode');
if (dresscodeBtn && lightboxDresscode) {
    dresscodeBtn.addEventListener('click', () => {
        lightboxDresscode.classList.add('active');
    });
    lightboxDresscode.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox-custom-overlay') || e.target.classList.contains('lightbox__close')) {
            lightboxDresscode.classList.remove('active');
        }
    });
}
// Lightbox Tips
const tipsBtn = document.getElementById('tips');
const lightboxTips = document.getElementById('lightboxTips');
if (tipsBtn && lightboxTips) {
    tipsBtn.addEventListener('click', () => {
        lightboxTips.classList.add('active');
    });
    lightboxTips.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox-custom-overlay') || e.target.classList.contains('lightbox__close')) {
            lightboxTips.classList.remove('active');
        }
    });
}
// Lightbox Regalos
const regalosBtn = document.getElementById('regalos');
const lightboxRegalos = document.getElementById('lightboxRegalos');
if (regalosBtn && lightboxRegalos) {
    regalosBtn.addEventListener('click', () => {
        lightboxRegalos.classList.add('active');
    });
    lightboxRegalos.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox-custom-overlay') || e.target.classList.contains('lightbox__close')) {
            lightboxRegalos.classList.remove('active');
        }
    });
}
// Copiar CBU
const copyCbuBtn = document.getElementById('copyCbu');
const cbuText = document.getElementById('cbuText');
if (copyCbuBtn && cbuText) {
    copyCbuBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(cbuText.textContent.trim());
        copyCbuBtn.textContent = '¡Copiado!';
        setTimeout(() => { copyCbuBtn.textContent = 'Copiar CBU'; }, 1500);
    });
}
// Copiar Alias
const copyAliasBtn = document.getElementById('copyAlias');
const aliasText = document.getElementById('aliasText');
if (copyAliasBtn && aliasText) {
    copyAliasBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(aliasText.textContent.trim());
        copyAliasBtn.textContent = '¡Copiado!';
        setTimeout(() => { copyAliasBtn.textContent = 'Copiar Alias'; }, 1500);
    });
}

// --------- Modal de Bienvenida ---------
window.addEventListener('DOMContentLoaded', function() {
    const welcomeModal = document.getElementById('welcomeModal');
    const btnConMusica = document.getElementById('btnConMusica');
    const btnSinMusica = document.getElementById('btnSinMusica');
    let audio;
    if (welcomeModal && btnConMusica && btnSinMusica) {
        // Bloquear scroll y mostrar modal
        document.body.style.overflow = 'hidden';
        welcomeModal.style.display = 'flex';
        // Acción: ingresar con música
        btnConMusica.addEventListener('click', function() {
            if (!audio) {
                audio = new Audio('musica.mp3');
                audio.loop = true;
            }
            audio.play();
            welcomeModal.style.display = 'none';
            document.body.style.overflow = '';
        });
        // Acción: ingresar sin música
        btnSinMusica.addEventListener('click', function() {
            welcomeModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
});



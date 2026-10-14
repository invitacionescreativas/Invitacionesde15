/* whatsapp-forms.js
 * Envía RSVP, restricciones alimentarias y canciones por WhatsApp,
 * con un listbox para elegir destinatario (Nati / Ger).
 * Uso: <script src="whatsapp-forms.js"></script> justo antes de </body>
 */
(function () {
  'use strict';

  const RECIPIENTS = {
    nati: { label: 'Nati', phone: '543515194010' },
    ger:  { label: 'Ger',  phone: '543517162947' }
  };

  // Cada formulario: id, prefijo de ids y armado del mensaje
  const FORMS = {
    'rsvp-form': {
      prefix: 'rsvp',
      build: (d) => [
        '💌 *Confirmación de asistencia*',
        `👤 Nombre: ${d.nombre}`,
        `✅ ¿Asistirá?: ${d.asistencia === 'si' ? 'Sí, asistiré con alegría' : 'No podré asistir'}`,
        `👥 Acompañantes: ${d.acompanantes || 0}`
      ],
      ok: '¡Gracias por confirmar tu asistencia!'
    },
    'dietary-form': {
      prefix: 'dietary',
      build: (d) => [
        '🍽️ *Restricción alimentaria*',
        `👤 Nombre: ${d.nombre}`,
        `📝 Restricción: ${d.restriccion}`
      ],
      ok: '¡Gracias! Tomaremos en cuenta tu restricción alimentaria'
    },
    'songs-form': {
      prefix: 'song',
      build: (d) => [
        '🎵 *Sugerencia de canción*',
        `👤 Nombre: ${d.nombre}`,
        `🎶 Canción: ${d.cancion}`
      ],
      ok: '¡Excelente sugerencia! La agregaremos a la playlist'
    }
  };

  function toast(message, type) {
    if (typeof window.showToast === 'function') return window.showToast(message, type);
    alert(message);
  }

  // 1) Inyectar el listbox "Enviar a" antes del botón de cada formulario
  function injectSelects() {
    Object.keys(FORMS).forEach((formId) => {
      const form = document.getElementById(formId);
      if (!form || form.querySelector('select[name="destinatario"]')) return;

      const id = FORMS[formId].prefix + '-destinatario';
      const wrap = document.createElement('div');
      wrap.className = 'mb-8';
      wrap.innerHTML =
        '<label for="' + id + '" class="block font-sans-clean text-sm text-primary mb-2">Enviar respuesta a</label>' +
        '<select id="' + id + '" name="destinatario" required class="w-full input-elegant rounded-lg px-4 py-3 font-sans-clean">' +
        '<option value="">Selecciona a quién enviar</option>' +
        Object.keys(RECIPIENTS).map((k) => '<option value="' + k + '">' + RECIPIENTS[k].label + '</option>').join('') +
        '</select>';

      const btn = form.querySelector('button[type="submit"]');
      form.insertBefore(wrap, btn);
      btn.textContent = btn.textContent.trim() + ' por WhatsApp';
    });
  }

  // 2) Interceptar el submit (fase de captura) para reemplazar el envío anterior
  function onSubmit(e) {
    const form = e.target;
    const cfg = form && FORMS[form.id];
    if (!cfg) return;

    e.preventDefault();
    e.stopImmediatePropagation(); // evita el submitForm() original (Apps Script)

    const data = Object.fromEntries(new FormData(form).entries());
    const dest = RECIPIENTS[data.destinatario];
    if (!dest) return toast('Elige a quién enviar la respuesta', 'error');

    const text = cfg.build(data).join('\n');
    const url = 'https://wa.me/' + dest.phone + '?text=' + encodeURIComponent(text);

    // window.open dentro del gesto del usuario; si el navegador lo bloquea, navega en la misma pestaña
    const win = window.open(url, '_blank', 'noopener');
    if (!win) window.location.href = url;

    toast(cfg.ok, 'success');
    form.reset();
  }

  document.addEventListener('submit', onSubmit, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSelects);
  } else {
    injectSelects();
  }
})();

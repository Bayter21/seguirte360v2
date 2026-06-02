╔══════════════════════════════════════════════════════════════╗
║         SEGUIRTE360 — REDISEÑO COMPLETO v2.0                 ║
║         Estilo Duolingo · Panel Docente · Misiones           ║
╚══════════════════════════════════════════════════════════════╝

📁 ESTRUCTURA
─────────────
src/main/resources/
  static/
    css/seguirte.css     ← Estilos globales (variables, sidebar, cards...)
    js/seguirte.js       ← Animaciones, sonidos, misiones, partículas
  templates/
    login.html           ← Pantalla de login con selector de rol
    register.html        ← Registro en 3 pasos (rol → contraseña → avatar)
    dashboard.html       ← Dashboard alumno (misiones, XP, emociones, ranking)
    teacher.html         ← Panel docente con estadísticas completas
    guest.html           ← Modo invitado / preview

✨ CARACTERÍSTICAS NUEVAS
─────────────────────────
✅ Animaciones tipo Duolingo:
   - XP flotante animado (+25 XP ⚡) con estrellas dispersas
   - Barra de progreso con efecto shine
   - Anillo de nivel con transición fluida
   - Cards con hover y entrance animations
   - Mascota flotante (🦉)
   - Partículas de fondo animadas

✅ Sonidos al hacer click:
   - playClick()     → click en botones/nav
   - playSuccess()   → completar misión (melodía ascendente)
   - playError()     → error de login/formulario
   - playLevelUp()   → subir de nivel (fanfare)
   - playXP()        → ganar XP (pitido suave)
   Implementados con Web Audio API (sin archivos externos)

✅ Misiones diarias aleatorias:
   - Pool de 12 misiones: caminar pasos, leer minutos, agua,
     respiración, diario, estirar, sonreír, naturaleza,
     gratitud, socializar, sin pantallas, bondad
   - 4 misiones random por día (seed = fecha)
   - Persistencia en localStorage por fecha
   - Barra de progreso individual
   - Click para avanzar progreso → al 100% → XP + notificación

✅ Avatares:
   - 10 opciones: 🦊🐺🐯🦁🐸🐧🦜🐦🦋🐬
   - Selector visual en paso 3 del registro
   - Guardado en localStorage
   - Aparece en sidebar y leaderboard

✅ Sidebar profesional:
   - Logo animado
   - Secciones con labels
   - Indicador activo con borde izquierdo verde
   - Badges de notificación (conteo de misiones pendientes)
   - User chip con avatar, nombre y rol
   - Responsive: colapsa en mobile con hamburger

✅ Panel Docente completo:
   - Header con resumen y botón de reporte
   - 4 estadísticas: alumnos activos, XP promedio, streak, bienestar
   - 5 tabs: Resumen | Alumnos | Emociones | Progreso | Alertas
   - Gráfica de barras XP por día
   - Distribución de emociones con barras animadas
   - Tabla de alumnos con búsqueda y filtro por estado
   - Badges de riesgo: ✅ Bien / ⚠️ Atención / 🚨 Alerta
   - Lista de alertas con botón "Contactar"
   - Gráfica de niveles por alumno
   - Distribución de ligas

✅ Todas las pantallas:
   - Login con selector Estudiante/Docente
   - Registro 3 pasos: Rol → Contraseña (con indicador de fuerza) → Avatar
   - Dashboard alumno con todo el gamification
   - Panel docente con estadísticas reales
   - Modo invitado con preview de misiones

🚀 CÓMO EJECUTAR
─────────────────
1. Copia los archivos a tu proyecto Spring Boot existente
   (reemplaza los templates y añade static/css y static/js)

2. mvn spring-boot:run

3. Abre http://localhost:8080

4. El backend Java no se modificó — solo los templates y assets

💡 NOTAS TÉCNICAS
─────────────────
- Las misiones se generan en el frontend (localStorage) por fecha
- Los gráficos del panel docente combinan datos Thymeleaf (reales)
  con datos mock para demostración
- Los sonidos usan Web Audio API (sin archivos .mp3 externos)
- Las animaciones usan CSS puro + JS vanilla (sin librerías)
- Compatible con todos los navegadores modernos

Desarrollado para Seguirte360 · 2025

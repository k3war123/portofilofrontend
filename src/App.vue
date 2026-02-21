<template>
  <router-view />
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap");

/* ================================================================
   🎨 CSS VARIABLE THEMING
   - Define all colors once in :root (light) and .dark (dark)
   - Every component reads from these variables — no ternaries needed
   ================================================================ */
:root {
  --bg-surface:    #f4f4f3;
  --bg-card:       #ffffff;
  --bg-card-hover: #f9f9f9;
  --text-base:     #1f2937; /* gray-800 */
  --text-muted:    #6b7280; /* gray-500 */
  --border:        rgba(229, 231, 235, 1);   /* gray-200 */
  --border-card:   rgba(229, 231, 235, 1);
  --nav-bg:        rgba(244, 244, 243, 0.9);
  --icon-face-bg:  #ffffff;
  --icon-face-border: #e5e7eb;
}

.dark {
  --bg-surface:    #030712; /* gray-950 */
  --bg-card:       #111827; /* gray-900 */
  --bg-card-hover: #1a2234;
  --text-base:     #f3f4f6; /* gray-100 */
  --text-muted:    #6b7280;
  --border:        rgba(55, 65, 81, 0.6);    /* gray-800/60 */
  --border-card:   #1f2937;                  /* gray-800 */
  --nav-bg:        rgba(3, 7, 18, 0.9);
  --icon-face-bg:  #111827;
  --icon-face-border: #374151;
}

/* ================================================================
   BASE STYLES — consume variables, never hardcode theme colors
   ================================================================ */
*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: "DM Sans", sans-serif;
}
h1, h2, h3, h4 { font-family: "Syne", sans-serif; }
html { scroll-behavior: smooth; }

.app-root {
  background-color: var(--bg-surface);
  color: var(--text-base);
}

.text-muted {
  color: var(--text-muted);
}

/* ================================================================
   NAVBAR
   ================================================================ */
.nav-bar {
  background-color: var(--nav-bg);
  border-color: var(--border);
}

.nav-link--active {
  color: #818cf8; /* indigo-400 */
  background-color: rgba(99, 102, 241, 0.1);
}
.nav-link--idle {
  color: var(--text-muted);
}
.nav-link--idle:hover {
  color: var(--text-base);
  background-color: rgba(128, 128, 128, 0.08);
}

.theme-toggle {
  border-color: var(--border-card);
}
.theme-toggle:hover {
  border-color: #818cf8;
}

/* ================================================================
   MOBILE MENU
   ================================================================ */
.mobile-menu {
  background-color: var(--bg-surface);
  border-color: var(--border);
}
.mobile-menu__link {
  color: var(--text-muted);
}
.mobile-menu__link:hover {
  background-color: rgba(128, 128, 128, 0.07);
  color: var(--text-base);
}

/* ================================================================
   ORBIT SYSTEM
   ================================================================ */
.orbit-stage {
  position: relative;
  width: 340px;
  height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.orbit-guide-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px dashed rgba(99, 102, 241, 0.2);
}

.avatar {
  width: 210px;
  height: 210px;
  border-radius: 50%;
  border: 5px solid #6366f1;
  object-fit: cover;
  position: absolute;
  z-index: 10;
  /* Avatar glow responds to theme via the variable */
  box-shadow: 0 0 40px rgba(99, 102, 241, 0.25);
}

.orbit-spinner {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  animation: orbitSpin 100s linear infinite;
}

.icon-arm {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  transform: rotate(calc(360deg / var(--total, 8) * var(--slot, 0)));
}

.icon-face {
  position: absolute;
  top: -170px;
  left: -22px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--icon-face-border);
  background-color: var(--icon-face-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  animation: counterSpin 100s linear infinite;
  z-index: 20;
}

@keyframes orbitSpin  { from { transform: rotate(0deg);    } to { transform: rotate(360deg);  } }
@keyframes counterSpin{ from { transform: rotate(0deg);    } to { transform: rotate(-360deg); } }

/* ================================================================
   SCROLL REVEAL
   ================================================================ */
.reveal {
  opacity: 0;
  transition: opacity 0.7s ease, transform 0.7s ease;
  transition-delay: var(--delay, 0s);
}
.reveal.fade-up   { transform: translateY(32px); }
.reveal.fade-left { transform: translateX(-32px); }
.reveal.fade-right{ transform: translateX(32px); }
.reveal.revealed  { opacity: 1; transform: translate(0, 0); }

/* ================================================================
   MOBILE MENU TRANSITION
   ================================================================ */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.slide-down-enter-from,
.slide-down-leave-to  { opacity: 0; max-height: 0; }
.slide-down-enter-to,
.slide-down-leave-from{ opacity: 1; max-height: 400px; }

/* ================================================================
   COMPONENTS — all use CSS variables
   ================================================================ */
.skill-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18px 10px 14px;
  border-radius: 16px;
  border: 1px solid var(--border-card);
  background-color: var(--bg-card);
  cursor: default;
  transition: all 0.3s ease;
}
.skill-logo:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 28px rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 241, 123, 0.5);
}

.about-card {
  padding: 16px;
  border-radius: 14px;
  border: 1px solid var(--border-card);
  background-color: var(--bg-card);
  transition: all 0.3s ease;
}
.about-card:hover {
  transform: translateX(6px);
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.14);
}

.contact-info-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid var(--border-card);
  background-color: var(--bg-card);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}
.contact-info-card:hover {
  transform: translateX(5px);
}

.project-card {
  padding: 24px;
  border-radius: 16px;
  border: 1px solid var(--border-card);
  background-color: var(--bg-card);
  transition: all 0.3s ease;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.input-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.form-input {
  width: 100%;
  padding: 11px 14px;
  border-radius: 10px;
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.18);
  color: var(--text-base);
  outline: none;
  transition: all 0.25s;
  font-family: "DM Sans", sans-serif;
  font-size: 0.9rem;
}
.form-input:focus {
  border-color: rgba(99, 241, 123, 0.5);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);
}
.form-input::placeholder {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.icon-link {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: inherit;
  text-decoration: none;
  transition: all 0.3s ease;
}
.icon-link:hover {
  background: rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.6);
  transform: translateY(-3px);
}

.nav-link {
  letter-spacing: 0.02em;
}

.project-card {
  border-radius: 18px;
  border: 1px solid var(--border-card);
  background-color: var(--bg-card);
  transition: all 0.35s ease;
  position: relative;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 40px rgba(99, 102, 241, 0.18);
  border-color: rgba(99, 102, 241, 0.4);
}

.project-tag {
  font-size: 0.7rem;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(99, 102, 241, 0.25);
  color: var(--text-base);
  font-weight: 500;
  transition: 0.3s ease;
}

.project-tag:hover {
  background: rgba(99, 102, 241, 0.18);
}

/* ================================================================
   MINI CODE CARD (HERO)
   ================================================================ */
.mini-code-card {
  width: 280px;
  border-radius: 18px;
  border: 1px solid var(--border-card);
  background: var(--bg-card);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: 0.4s ease;
}

.mini-code-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 30px 60px rgba(99, 102, 241, 0.25);
}

.mini-code-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
  font-size: 0.75rem;
}

.file-name {
  margin-left: auto;
  color: var(--text-muted);
  font-family: "DM Sans", sans-serif;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.mini-code-body {
  padding: 16px;
  font-family: "DM Sans", monospace;
  font-size: 0.8rem;
  line-height: 1.6;
}

.code-key {
  color: #818cf8;
  font-weight: 600;
}

.code-string {
  color: #34d399;
}

.code-accent {
  color: #22c55e;
  font-weight: 600;
}

</style>
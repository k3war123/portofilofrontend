i filled all but  "// src/stores/contact.js
import { defineStore } from "pinia";
import api from "@/plugins/axios";
import { ref } from "vue";

export const useContactStore = defineStore("contact", () => {
  // ========================================================
  // Form state
  // ========================================================
  const form = ref({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // ========================================================
  // Loading state
  // ========================================================
  const loading = ref(false);

  // ========================================================
  // Send message function
  // ========================================================
  const sendMessage = async () => {
    // ===================== FRONTEND VALIDATION =====================
    // Ensure required fields are filled before sending
    if (
      !form.value.full_name ||
      !form.value.email ||
      !form.value.phone ||
      !form.value.message
    ) {
      alert("Please fill in all required fields: Name, Email, Phone, Message.");
      return; // Stop function if validation fails
    }

    loading.value = true;

    try {
      // ===================== SEND REQUEST =====================
      const response = await api.post("/contact", {
        full_name: form.value.full_name,
        email: form.value.email,
        phone: form.value.phone,
        subject: form.value.subject,
        message: form.value.message,
      });

      // ===================== SUCCESS =====================
      alert(response.data.message || "Message sent successfully");

      // Reset form after successful submission
      form.value = {
        full_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      };
    } catch (error) {
      // ===================== ERROR HANDLING =====================
      // Log full backend error for debugging
      console.error("Contact API Error:", error.response?.data);

      // Show validation errors from Laravel if available
      if (error.response?.data?.errors) {
        const messages = Object.values(error.response.data.errors)
          .flat()
          .join("\n");
        alert("Validation errors:\n" + messages);
      } else {
        alert(
          error.response?.data?.message ||
            "Failed to send message. Please try again."
        );
      }
    } finally {
      loading.value = false;
    }
  };

  // ========================================================
  // Return state and actions
  // ========================================================
  return { form, loading, sendMessage }; 
"<script setup>
/* =========================================================
   IMPORTS
   ========================================================= */
import { ref, onMounted, watch, nextTick } from "vue";
import { useContactStore } from "@/stores/contact";


const contactStore = useContactStore();




/* =========================================================
   🌙 DARK MODE (PERSISTENT VERSION)
   ---------------------------------------------------------
   - Reads saved theme from localStorage
   - Defaults to DARK if nothing saved
   - Stays after refresh / hosting
   ========================================================= */
const darkMode = ref(
  localStorage.getItem("theme")
    ? localStorage.getItem("theme") === "dark"
    : false
);

/* Toggle function
   - Switches theme
   - Saves choice in localStorage
*/
const toggleDark = () => {
  darkMode.value = !darkMode.value;

  // Save theme so it persists after refresh
  localStorage.setItem(
    "theme",
    darkMode.value ? "dark" : "light"
  );
};


/* =========================================================
   📱 MOBILE MENU
   ========================================================= */
const menuOpen = ref(false);


/* =========================================================
   🔎 ACTIVE SECTION (NAV HIGHLIGHT)
   ========================================================= */
const activeSection = ref("home");

const navLinks = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Work", href: "work" },
  { label: "Contact", href: "contact" },
];


/* Smooth scroll */
const scrollTo = (id) => {
  menuOpen.value = false;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};


/* =========================================================
   🌀 ORBIT ICONS
   ========================================================= */
const orbitIcons = [
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", name: "Java" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", name: "HTML" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", name: "JS" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg", name: "Vue" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", name: "Tailwind" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg", name: "Laravel" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", name: "Postgres" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg", name: "Flutter" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", name: "Git" },
];


/* =========================================================
   💻 SKILLS
   ========================================================= */
const skills = [
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
  { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
  { name: "Axios", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
];


/* =========================================================
   📊 STATS
   ========================================================= */
// const stats = [
//   { value: "2+", label: "Years Experience" },
//   { value: "10+", label: "Projects Built" },
//   { value: "100%", label: "Responsive Design" },
// ];


/* =========================================================
   🧠 ABOUT CARDS
   ========================================================= */
const aboutCards = [
  { icon: "bi-laptop", label: "Frontend", desc: "Vue.js · Tailwind CSS · Responsive Design · Animations" },
  { icon: "bi-server", label: "Backend", desc: "Laravel · REST APIs · PostgreSQL · MySQL · Auth systems" },
  { icon: "bi-phone", label: "Mobile", desc: "Flutter · Cross-platform iOS & Android apps" },
  { icon: "bi-git", label: "DevOps & Tools", desc: "Git · GitHub · VS Code · Postman" },
];


/* =========================================================
   📞 CONTACT INFO
   ========================================================= */
const contactInfo = [
  { icon: "bi-instagram", label: "Instagram", value: "@kewar", href: "https://www.instagram.com/kewar" },
  { icon: "bi-whatsapp", label: "WhatsApp", value: "+964 7XX XXX XXXX", href: "https://wa.me/9647706038376" },
  { icon: "bi-github", label: "GitHub", value: "github.com/k3war123", href: "https://github.com/k3war123" },
];


/* =========================================================
   ✨ SCROLL REVEAL SYSTEM (FIXED VERSION)
   ---------------------------------------------------------
   WHY:
   When theme changes, Vue re-renders DOM.
   Some elements lost 'revealed' class.
   So we re-initialize observer every time theme changes.
   ========================================================= */
const initReveal = () => {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.remove("revealed"); // Reset before observing
    io.observe(el);
  });
};


/* =========================================================
   🚀 ON MOUNT
   ========================================================= */
onMounted(() => {

  // Initialize reveal animations
  initReveal();

  // Section observer for navbar highlight
  const sectionObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) activeSection.value = e.target.id;
      });
    },
    { threshold: 0.35 }
  );

  document
    .querySelectorAll("section[id]")
    .forEach((el) => sectionObs.observe(el));
});


/* =========================================================
   🔁 RE-INIT REVEAL WHEN THEME CHANGES (BUG FIX)
   ========================================================= */
watch(darkMode, async () => {
  await nextTick();
  initReveal();
});
</script>


<template>
  <div
    :class="
      darkMode ? 'bg-gray-950 text-gray-100' : 'bg-[#f4f4f3] text-gray-800'
    "
    class="min-h-screen transition-colors duration-500"
  >
    <!-- ===== NAVBAR ===== -->
    <nav
      :class="
        darkMode
          ? 'bg-gray-950/90 border-gray-800/60'
          : 'bg-[#f4f4f3]/90 border-gray-200'
      "
      class="flex justify-between items-center px-10 py-4 backdrop-blur-md sticky top-0 z-50 border-b transition-colors duration-500"
    >
      <h1
        class="text-xl font-bold tracking-widest uppercase cursor-pointer"
        @click="scrollTo('home')"
      >
        Kewar
      </h1>

      <ul class="hidden md:flex items-center gap-1">
        <li v-for="link in navLinks" :key="link.label">
          <button
            @click="scrollTo(link.href)"
            class="nav-link text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300"
            :class="
              activeSection === link.href
                ? 'text-indigo-400 bg-indigo-500/10'
                : darkMode
                  ? 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
            "
          >
            {{ link.label }}
          </button>
        </li>
      </ul>

      <div class="flex items-center gap-3">
        <button
          @click="scrollTo('contact')"
          class="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-600/30"
        >
          Hire Me
        </button>
        <button
          @click="toggleDark"
          class="w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 hover:scale-110"
          :class="
            darkMode
              ? 'border-gray-700 hover:border-indigo-500'
              : 'border-gray-300 hover:border-indigo-400'
          "
        >
          <i v-if="darkMode" class="bi bi-sun text-sm"></i>
          <i v-else class="bi bi-moon text-sm"></i>
        </button>
        <button
          @click="menuOpen = !menuOpen"
          class="md:hidden w-9 h-9 flex items-center justify-center transition-transform duration-300"
          :class="menuOpen ? 'rotate-90' : ''"
        >
          <i
            :class="menuOpen ? 'bi bi-x-lg' : 'bi bi-list'"
            class="text-lg"
          ></i>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <transition name="slide-down">
      <div
        v-if="menuOpen"
        class="md:hidden border-b px-6 py-4 flex flex-col gap-1 z-40"
        :class="
          darkMode
            ? 'bg-gray-950 border-gray-800'
            : 'bg-[#f4f4f3] border-gray-200'
        "
      >
        <button
          v-for="link in navLinks"
          :key="link.label"
          @click="scrollTo(link.href)"
          class="text-sm font-medium py-2 px-3 rounded-lg transition-all duration-200 text-left"
          :class="
            darkMode
              ? 'hover:bg-white/5 text-gray-300'
              : 'hover:bg-black/5 text-gray-600'
          "
        >
          {{ link.label }}
        </button>
        <button
          @click="scrollTo('contact')"
          class="mt-2 text-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all"
        >
          Hire Me
        </button>
      </div>
    </transition>

    <!-- ===== HERO ===== -->
    <section
      id="home"
      class="flex flex-col items-center justify-center text-center py-28 px-6 relative overflow-hidden"
    >
      <!-- bg glow -->
      <div class="absolute inset-0 pointer-events-none">
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-135 h-135 rounded-full opacity-[0.06] blur-3xl bg-indigo-500"
        ></div>
      </div>

      <!-- ── ORBIT SYSTEM ──
           One container (orbit-spinner) rotates.
           Each icon-arm is pre-rotated to its slot (360/8 * i = 45° apart).
           Each icon counter-rotates so it stays upright.
      -->
      <div class="orbit-stage mb-16">
        <!-- Dashed guide ring (visual only, doesn't spin) -->
        <div
          class="orbit-guide-ring"
          :class="darkMode ? 'border-indigo-500/15' : 'border-indigo-400/15'"
        ></div>

        <!-- Avatar -->
        <img
          src="@/assets/me.jpg"
          alt="Kewar"
          class="avatar"
          :class="
            darkMode
              ? 'shadow-[0_0_50px_rgba(99,102,241,0.3)]'
              : 'shadow-[0_0_30px_rgba(99,102,241,0.18)]'
          "
        />

        <!-- The single spinning container — all icons ride on it -->
        <div class="orbit-spinner">
          <div
            v-for="(item, i) in orbitIcons"
            :key="item.name"
            class="icon-arm"
            :style="`--slot: ${i}; --total: ${orbitIcons.length};`"
          >
            <!-- counter-rotate wrapper keeps icon upright -->
            <div
              class="icon-face"
              :class="
                darkMode
                  ? 'bg-gray-900 border-gray-700'
                  : 'bg-white border-gray-200'
              "
            >
              <img
                :src="item.icon"
                :alt="item.name"
                class="w-6 h-6 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Hero text -->
      <div class="reveal fade-up">
        <h4 class="text-5xl md:text-6xl font-bold mb-3 leading-tight">
          Hello, This is <span class="text-indigo-400">Kewar</span>
        </h4>
        <p
          class="text-indigo-400 font-semibold tracking-widest uppercase text-sm mb-5 font-mono"
        >
          Full-Stack Developer
        </p>
        <p
          class="max-w-xl leading-relaxed text-base mb-10 mx-auto"
          :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
        >
          He is build fast, responsive, and beautiful web applications from front to
          back. Every project he is deliver works seamlessly across all screen sizes
          and devices.
        </p>
        <div class="flex gap-4 justify-center mb-14">
          <a href="#" class="icon-link"><i class="bi bi-github text-xl"></i></a>
        </div>
        <div class="flex flex-wrap justify-center gap-12">
          <div v-for="s in stats" :key="s.label" class="text-center">
            <div class="text-3xl font-bold text-indigo-400">{{ s.value }}</div>
            <div
              class="text-xs tracking-widest uppercase mt-1"
              :class="darkMode ? 'text-gray-500' : 'text-gray-400'"
            >
              {{ s.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== ABOUT ===== -->
    <section id="about" class="py-24 px-8 max-w-5xl mx-auto">
      <h3
        class="text-2xl font-bold mb-14 text-center tracking-wide reveal fade-up"
      >
        About Me
      </h3>
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div
          class="reveal fade-left"
          style="--delay: 0.1s"
          :class="darkMode ? 'text-gray-300' : 'text-gray-600'"
        >
          <div class="space-y-5 leading-relaxed text-[0.95rem]">
            <p>
              I'm a
              <strong class="text-indigo-400">Full-Stack Developer</strong> with
              a passion for crafting clean, high-performing digital experiences.
            </p>
            <p>
              On the <strong class="text-indigo-400">frontend</strong>, I
              specialize in building
              <strong class="text-indigo-400">fully responsive websites</strong>
              using Vue.js and Tailwind CSS — interfaces that look great on any
              screen.
            </p>
            <p>
              On the <strong class="text-indigo-400">backend</strong>, I design
              robust APIs with Laravel, PostgreSQL, and MySQL — handling
              authentication, business logic, and data at scale.
            </p>
            <p>
              I also build cross-platform mobile apps with
              <strong class="text-indigo-400">Flutter</strong>, delivering
              native-quality experiences on both iOS and Android.
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div
            v-for="(item, i) in aboutCards"
            :key="item.label"
            class="about-card reveal fade-right"
            :style="`--delay:${i * 0.1}s`"
            :class="
              darkMode
                ? 'bg-gray-900 border-gray-800'
                : 'bg-white border-gray-200'
            "
          >
            <div class="flex items-start gap-4">
              <div
                class="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0"
              >
                <i :class="['bi', item.icon, 'text-indigo-400 text-lg']"></i>
              </div>
              <div>
                <div class="font-semibold text-sm mb-1">{{ item.label }}</div>
                <div
                  class="text-xs leading-relaxed"
                  :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
                >
                  {{ item.desc }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== TECH STACK ===== -->
    <section id="skills" class="py-24 px-8 max-w-5xl mx-auto">
      <h3
        class="text-2xl font-bold mb-14 text-center tracking-wide reveal fade-up"
      >
        Tech Stack
      </h3>
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5">
        <div
          v-for="(s, i) in skills"
          :key="s.name"
          class="skill-logo reveal fade-up"
          :style="`--delay:${i * 0.05}s`"
          :class="
            darkMode
              ? 'bg-gray-900 border-gray-800 hover:border-indigo-500/60'
              : 'bg-white border-gray-200 hover:border-indigo-400/60'
          "
        >
          <img
            :src="s.icon"
            :alt="s.name"
            class="w-10 h-10 object-contain"
            :class="s.name === 'GitHub' && darkMode ? 'invert' : ''"
          />
          <span
            class="text-xs font-medium mt-2"
            :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
            >{{ s.name }}</span
          >
        </div>
      </div>
    </section>

    <!-- ===== PROJECTS ===== -->
    <section id="work" class="py-24 px-8 max-w-6xl mx-auto">
      <h3
        class="text-2xl font-bold mb-10 text-center tracking-wide reveal fade-up"
      >
        My Work
      </h3>
      <div class="grid md:grid-cols-3 gap-8">
        <div
          class="project-card col-span-full flex items-center justify-center h-40 opacity-40 border-dashed reveal fade-up"
          :class="
            darkMode
              ? 'bg-gray-900/40 border-gray-700'
              : 'bg-gray-100 border-gray-300'
          "
        >
          <p
            class="text-sm"
            :class="darkMode ? 'text-gray-500' : 'text-gray-400'"
          >
            Projects coming soon...
          </p>
        </div>
      </div>
    </section>

    <!-- ===== CONTACT ===== -->
    <section id="contact" class="py-24 px-8 max-w-6xl mx-auto">
      <h3
        class="text-2xl font-bold mb-3 text-center tracking-wide reveal fade-up"
      >
        Contact Me
      </h3>
      <p
        class="text-center text-sm mb-14 reveal fade-up"
        style="--delay: 0.1s"
        :class="darkMode ? 'text-gray-500' : 'text-gray-400'"
      >
        Have a project in mind? Let's build something great together.
      </p>
      <div class="grid md:grid-cols-2 gap-10 items-start">
        <div class="flex flex-col gap-4 reveal fade-left" style="--delay: 0.1s">
          <h4
            class="text-base font-semibold mb-1"
            :class="darkMode ? 'text-gray-300' : 'text-gray-600'"
          >
            Reach me via
          </h4>
          <a
            v-for="c in contactInfo"
            :key="c.label"
            :href="c.href"
            target="_blank"
            class="contact-info-card group"
            :class="
              darkMode
                ? 'bg-gray-900 border-gray-800 hover:border-indigo-500/50'
                : 'bg-white border-gray-200 hover:border-indigo-400/50'
            "
          >
            <div
              class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
              :class="
                darkMode
                  ? 'bg-indigo-500/10 group-hover:bg-indigo-500/20'
                  : 'bg-indigo-50 group-hover:bg-indigo-100'
              "
            >
              <i :class="['bi', c.icon, 'text-indigo-400 text-lg']"></i>
            </div>
            <div>
              <div
                class="text-xs uppercase tracking-widest mb-0.5"
                :class="darkMode ? 'text-gray-500' : 'text-gray-400'"
              >
                {{ c.label }}
              </div>
              <div class="text-sm font-medium">{{ c.value }}</div>
            </div>
            <i
              class="bi bi-arrow-right ml-auto text-indigo-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-sm"
            ></i>
          </a>
          <div
            class="mt-1 flex items-center gap-3 px-4 py-3 rounded-xl border"
            :class="
              darkMode
                ? 'border-emerald-800/40 bg-emerald-950/30'
                : 'border-emerald-200 bg-emerald-50'
            "
          >
            <span
              class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"
            ></span>
            <span
              class="text-xs"
              :class="darkMode ? 'text-emerald-400' : 'text-emerald-600'"
              >Currently available for freelance work</span
            >
          </div>
        </div>

        <div
          class="rounded-2xl border p-8 reveal fade-right"
          style="--delay: 0.2s"
          :class="
            darkMode
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          "
        >
          <h4
            class="text-base font-semibold mb-6"
            :class="darkMode ? 'text-gray-300' : 'text-gray-600'"
          >
            Send a message
          </h4>
          <form @submit.prevent="contactStore.sendMessage" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="input-group">
                <label class="input-label">Full Name</label>
                <input type="text" placeholder="John Doe" class="form-input" />
              </div>
              <div class="input-group">
                <label class="input-label">Phone</label>
                <input
                  type="text"
                  placeholder="+964 7XX..."
                  class="form-input"
                />
              </div>
            </div>
                        <div class="input-group">
              <label class="input-label">Email</label>
              <input
                type="text"
                placeholder="john.doe@example.com"
                class="form-input"
              />
            </div>
            <div class="input-group">
              <label class="input-label">Subject</label>
              <input
                type="text"
                placeholder="Project idea, collaboration..."
                class="form-input"
              />
            </div>
            <div class="input-group">
              <label class="input-label">Message</label>
              <textarea
                rows="4"
                placeholder="Tell me about your project..."
                class="form-input resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 py-3 rounded-xl font-semibold text-sm tracking-wide shadow-lg hover:shadow-indigo-600/30 hover:-translate-y-0.5 text-white mt-2"
            >
              <i class="bi bi-send"></i> Send Message
            </button>
          </form>
        </div>
      </div>
    </section>

    <footer
      class="text-center py-8 text-xs tracking-widest uppercase reveal fade-up"
      :class="darkMode ? 'text-gray-700' : 'text-gray-400'"
    >
      © 2026 Kewar · All rights reserved
    </footer>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: "DM Sans", sans-serif;
}
h1,
h2,
h3,
h4 {
  font-family: "Syne", sans-serif;
}
html {
  scroll-behavior: smooth;
}

/* ================================================================
   ORBIT SYSTEM
   - .orbit-stage     : 340×340 fixed stage
   - .orbit-guide-ring: visual dashed circle (not animated)
   - .avatar          : centered profile pic
   - .orbit-spinner   : ONE div that rotates — carries all icons
   - .icon-arm        : positioned at slot angle, extends to radius
   - .icon-face       : counter-rotates so icon stays upright
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
  border: 1.5px dashed;
}

.avatar {
  width: 210px;
  height: 210px;
  border-radius: 50%;
  border: 5px solid #6366f1;
  object-fit: cover;
  position: absolute;
  z-index: 10;
}

/* The single rotating wrapper */
.orbit-spinner {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  animation: orbitSpin 100s linear infinite; /* slow & steady */
}

/* Each arm: centered at stage center, rotated to its slot */
.icon-arm {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  /* rotate to slot angle, then push the chip outward */
  transform: rotate(calc(360deg / var(--total, 8) * var(--slot, 0)));
}

/* The actual chip — offset upward (= outward along the arm) by orbit radius */
.icon-face {
  position: absolute;
  top: -170px; /* orbit radius = half stage - half chip - small gap */
  left: -22px; /* center horizontally (-half chip width) */
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  /* counter-rotate at same speed — icon stays upright */
  animation: counterSpin 100s linear infinite;
  z-index: 20;
}

@keyframes orbitSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes counterSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

/* ================================================================
   SCROLL REVEAL
   ================================================================ */
.reveal {
  opacity: 0;
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
  transition-delay: var(--delay, 0s);
}
.reveal.fade-up {
  transform: translateY(32px);
}
.reveal.fade-left {
  transform: translateX(-32px);
}
.reveal.fade-right {
  transform: translateX(32px);
}
.reveal.revealed {
  opacity: 1;
  transform: translate(0, 0);
}

/* ================================================================
   MOBILE MENU
   ================================================================ */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
}
.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  max-height: 400px;
}

/* ================================================================
   COMPONENTS
   ================================================================ */
.skill-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18px 10px 14px;
  border-radius: 16px;
  border: 1px solid;
  cursor: default;
  transition: all 0.3s ease;
}
.skill-logo:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 28px rgba(99, 102, 241, 0.2);
}

.about-card {
  padding: 16px;
  border-radius: 14px;
  border: 1px solid;
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
  border: 1px solid;
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
  border: 1px solid;
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
  color: #6b7280;
}

.form-input {
  width: 100%;
  padding: 11px 14px;
  border-radius: 10px;
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.18);
  color: inherit;
  outline: none;
  transition: all 0.25s;
  font-family: "DM Sans", sans-serif;
  font-size: 0.9rem;
}
.form-input:focus {
  border-color: rgba(99, 102, 241, 0.55);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);
}
.form-input::placeholder {
  color: #6b7280;
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
</style>
" 
}); "
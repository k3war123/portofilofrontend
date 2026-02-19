<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { useContactStore } from "@/stores/contact";

const contactStore = useContactStore();

//DARK MODE One class on root → all theming via CSS variables
const darkMode = ref(
  localStorage.getItem("theme")
    ? localStorage.getItem("theme") === "dark"
    : false,
);

const toggleDark = () => {
  darkMode.value = !darkMode.value;
  localStorage.setItem("theme", darkMode.value ? "dark" : "light");
};

//MOBILE MENU
const menuOpen = ref(false);

//ACTIVE SECTION (NAV HIGHLIGHT)

const activeSection = ref("home");

const navLinks = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Work", href: "work" },
  { label: "Contact", href: "contact" },
];

const scrollTo = (id) => {
  menuOpen.value = false;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

//ORBIT ICONS
const orbitIcons = [
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    name: "Java",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    name: "HTML",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    name: "JS",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
    name: "Vue",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    name: "Tailwind",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
    name: "Laravel",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    name: "Postgres",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    name: "Flutter",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    name: "Git",
  },
];

//SKILLS
const skills = [
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  },
  {
    name: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    name: "PHP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  },
  {
    name: "Laravel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  },
  {
    name: "Vue.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
    name: "Tailwind",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Bootstrap",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
  },
  {
    name: "Axios",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  },
  {
    name: "Flutter",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  },
];

//ABOUT CARDS
const aboutCards = [
  {
    icon: "bi-laptop",
    label: "Frontend",
    desc: "Vue.js · Tailwind CSS · Responsive Design · Animations",
  },
  {
    icon: "bi-server",
    label: "Backend",
    desc: "Laravel · REST APIs · PostgreSQL · MySQL · Auth systems",
  },
  {
    icon: "bi-phone",
    label: "Mobile",
    desc: "Flutter · Cross-platform iOS & Android apps",
  },
  {
    icon: "bi-git",
    label: "DevOps & Tools",
    desc: "Git · GitHub · VS Code · Postman",
  },
];



//SCROLL REVEAL SYSTEM
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
    { threshold: 0.12 },
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.remove("revealed");
    io.observe(el);
  });
};

// ON MOUNT
onMounted(() => {
  initReveal();

  const sectionObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) activeSection.value = e.target.id;
      });
    },
    { threshold: 0.35 },
  );

  document
    .querySelectorAll("section[id]")
    .forEach((el) => sectionObs.observe(el));
});

//RE-INIT REVEAL WHEN THEME CHANGES

watch(darkMode, async () => {
  await nextTick();
  initReveal();
});
</script>

<template>
  <!--
    🎨 SINGLE DARK-MODE BINDING — the only place darkMode is checked in the template.
       All colors, backgrounds, and borders are driven by CSS variables
       that switch when the .dark class is present on this root element.
  -->
  <div
    :class="darkMode && 'dark'"
    class="app-root min-h-screen transition-colors duration-500"
  >
    <!-- ===== NAVBAR ===== -->
    <nav
      class="nav-bar flex justify-between items-center px-10 py-4 backdrop-blur-md sticky top-0 z-50 border-b transition-colors duration-500"
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
                ? 'nav-link--active'
                : 'nav-link--idle'
            "
          >
            {{ link.label }}
          </button>
        </li>
      </ul>

      <div class="flex items-center gap-3">
        <button
          @click="scrollTo('contact')"
          class="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-600/30"
        >
          Hire Me
        </button>

        <!-- ✅ darkMode still used here: icon swap is a UI state, not a color -->
        <button
          @click="toggleDark"
          class="theme-toggle w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 hover:scale-110"
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
        class="mobile-menu md:hidden border-b px-6 py-4 flex flex-col gap-1 z-40"
      >
        <button
          v-for="link in navLinks"
          :key="link.label"
          @click="scrollTo(link.href)"
          class="mobile-menu__link text-sm font-medium py-2 px-3 rounded-lg transition-all duration-200 text-left"
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

      <!-- ORBIT SYSTEM -->
      <div class="orbit-stage mb-16">
        <div class="orbit-guide-ring"></div>
        <img src="@/assets/me3.jpg" alt="Kewar" class="avatar" />
        <div class="orbit-spinner">
          <div
            v-for="(item, i) in orbitIcons"
            :key="item.name"
            class="icon-arm"
            :style="`--slot: ${i}; --total: ${orbitIcons.length};`"
          >
            <div class="icon-face">
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
        <p class="text-muted max-w-xl leading-relaxed text-base mb-10 mx-auto">
          He builds fast, responsive, and beautiful web applications from front
          to back. Every project he delivers works seamlessly across all screen
          sizes and devices.
        </p>
        <div class="flex gap-4 justify-center mb-14">
          <a href="#" class="icon-link"><i class="bi bi-github text-xl"></i></a>
        </div>
        <div class="flex flex-wrap justify-center gap-12">
          <div v-for="s in stats" :key="s.label" class="text-center">
            <div class="text-3xl font-bold text-indigo-400">{{ s.value }}</div>
            <div class="text-muted text-xs tracking-widest uppercase mt-1">
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
        About Him
      </h3>
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="text-muted reveal fade-left" style="--delay: 0.1s">
          <div class="space-y-5 leading-relaxed text-[0.95rem]">
            <p>
             He is a
              <strong class="text-indigo-400">Full-Stack Developer</strong> with
              a passion for crafting clean, high-performing digital experiences.
            </p>
            <p>
              On the <strong class="text-indigo-400">frontend</strong>, He
              specialize in building
              <strong class="text-indigo-400">fully responsive websites</strong>
              using Vue.js and Tailwind CSS — interfaces that look great on any
              screen.
            </p>
            <p>
              On the <strong class="text-indigo-400">backend</strong>, He design
              robust APIs with Laravel, PostgreSQL, and MySQL — handling
              authentication, business logic, and data at scale.
            </p>
            <p>
              He is also build cross-platform mobile apps with
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
          >
            <div class="flex items-start gap-4">
              <div
                class="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0"
              >
                <i :class="['bi', item.icon, 'text-indigo-400 text-lg']"></i>
              </div>
              <div>
                <div class="font-semibold text-sm mb-1">{{ item.label }}</div>
                <div class="text-muted text-xs leading-relaxed">
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
        >
          <!--
            ✅ darkMode used here: purely a visual filter tweak, not a theme color.
               GitHub's icon is black; we invert it in dark mode so it's visible.
          -->
          <img
            :src="s.icon"
            :alt="s.name"
            class="w-10 h-10 object-contain"
            :class="s.name === 'GitHub' && darkMode ? 'invert' : ''"
          />
          <span class="text-muted text-xs font-medium mt-2">{{ s.name }}</span>
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
        >
          <p class="text-muted text-sm">Projects coming soon...</p>
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
        Have a project in mind? Let's build something great together. <br />
        Reach me via any of the platforms below or just fill the form
      </p>

      <form
        @submit.prevent="contactStore.sendMessage"
        class="space-y-4 reveal fade-up"
      >
        <div class="grid grid-cols-2 gap-4">
          <div class="input-group">
            <!-- <label class="input-label">Full Name</label> -->
            <input
              v-model="contactStore.form.full_name"
              type="text"
              placeholder="Full Name"
              class="form-input"
            />
          </div>
          <div class="input-group">
            <!-- <label class="input-label">Phone</label> -->
            <input
              v-model="contactStore.form.phone"
              type="text"
              placeholder="Phone Number"
              class="form-input"
            />
          </div>
        </div>

        <div class="input-group">
          <!-- <label class="input-label">Email</label> -->
          <input
            v-model="contactStore.form.email"
            type="email"
            placeholder="Enter your email address"
            class="form-input"
          />
        </div>

        <div class="input-group">
          <!-- <label class="input-label">Subject</label> -->
          <input
            v-model="contactStore.form.subject"
            type="text"
            placeholder="Project idea, collaboration..."
            class="form-input"
          />
        </div>

        <div class="input-group">
          <!-- <label class="input-label">Message</label> -->
          <textarea
            v-model="contactStore.form.message"
            rows="4"
            placeholder="Tell me about your project..."
            class="form-input resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          :disabled="contactStore.loading"
          class="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 py-3 rounded-xl font-semibold text-sm tracking-wide shadow-lg hover:shadow-indigo-600/30 hover:-translate-y-0.5 text-white mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i class="bi bi-send"></i>
          {{ contactStore.loading ? "Sending..." : "Send Message" }}
        </button>
      </form>
      <!-- ======= SOCIAL LINKS ======= -->
      <div class="flex justify-center gap-6 mt-10 reveal fade-up">
        <a
          href="https://wa.me/9647706038376"
          target="_blank"
          class="flex items-center gap-2 text-green-500 hover:text-green-400 transition font-semibold"
        >
          <i class="bi bi-whatsapp text-lg"></i> WhatsApp
        </a>

        <a
          href="https://www.instagram.com/kewar_tech_hub_?igsh=NDZndGlydzBwZTVs"
          target="_blank"
          class="flex items-center gap-2 text-pink-500 hover:text-pink-400 transition font-semibold"
        >
          <i class="bi bi-instagram text-lg"></i> Instagram
        </a>

        <a
          href="https://github.com/k3war123"
          target="_blank"
          class="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition font-semibold"
        >
          <i class="bi bi-github text-lg"></i> GitHub
        </a>
      </div>
    </section>

<footer class="relative bg-gray-950 text-gray-400 overflow-hidden">

  <!-- Subtle top border glow -->
  <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"></div>

  <!-- Background texture pattern -->
  <div class="absolute inset-0 opacity-[0.03]"
    style="background-image: radial-gradient(circle, #ffffff 1px, transparent 1px); background-size: 24px 24px;">
  </div>

  <div class="relative max-w-6xl mx-auto px-6 py-10">

    <!-- Main footer row -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-6">

      <!-- Left: Brand + Copyright -->
      <div class="flex flex-col items-center md:items-start gap-1">
        <span class="text-white text-base font-semibold tracking-widest uppercase"
          style="font-family: 'Georgia', serif; letter-spacing: 0.2em;">
          Kewar
        </span>
        <p class="text-xs text-gray-600 tracking-wide flex items-center gap-1.5">
          <i class="bi bi-c-circle text-gray-700"></i>
          2026 · All rights reserved
        </p>
      </div>

      <!-- Center: University Badge -->
      <div class="flex flex-col items-center gap-2">
        <div class="flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-800 bg-gray-900/60 backdrop-blur-sm">
          <i class="bi bi-mortarboard-fill text-yellow-400 text-sm"></i>
          <a href="https://komar.edu.iq/" target="_blank"
            class="text-xs text-gray-300 hover:text-yellow-400 transition-colors duration-300 tracking-widest uppercase"
            style="letter-spacing: 0.12em;">
            Komar University Graduate
          </a>
          <i class="bi bi-patch-check-fill text-yellow-500 text-sm"></i>
        </div>
      </div>



    </div>




  </div>
</footer>




  </div>
</template>

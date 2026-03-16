<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";
import Logo from "../assets/Logo.svg";

const isVisible = ref(true);
const isMobileMenuOpen = ref(false);
const lastScrollPosition = ref(0);

const handleScroll = () => {
  const currentScrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;
  if (isMobileMenuOpen.value) return;

  const scrollDistance = Math.abs(
    currentScrollPosition - lastScrollPosition.value,
  );
  if (scrollDistance < 40) return;

  if (
    currentScrollPosition < lastScrollPosition.value ||
    currentScrollPosition < 100
  ) {
    isVisible.value = true;
  } else {
    isVisible.value = false;
  }
  lastScrollPosition.value = currentScrollPosition;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleResize = () => {
  if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
};

onMounted(() => {
  AOS.init({ once: true, duration: 600 });
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <header class="relative">
    <nav
      :class="[
        'fixed top-0 left-0 right-0 z-[100] flex items-stretch justify-between h-20 text-accent',
        'border-[4px] border-accent bg-primary transition-all duration-500 ease-in-out',
        isVisible ? 'translate-y-0' : '-translate-y-full',
      ]"
    >
      <div class="flex items-center px-6 md:px-8 h-full">
        <router-link
          to="/"
          class="flex items-center gap-3 hover:skew-x-[-10deg] transition-transform duration-200 h-full cursor-pointer"
        >
          <img
            :src="Logo"
            alt="Fundivest Logo"
            class="h-10 md:h-12 w-auto object-contain"
          />
          <span
            class="font-pixel text-xl md:text-1xl tracking-tighter uppercase whitespace-nowrap"
          >
            FUNDIVEST
          </span>
        </router-link>
      </div>

      <div
        class="hidden md:flex items-center h-full border-l-[4px] border-accent font-main text-xl font-black uppercase tracking-tight"
      >
        <router-link
          to="/"
          class="relative overflow-hidden h-full flex items-center pl-8 pr-12 hover:bg-accent hover:text-primary transition-colors border-r-[4px] border-accent group"
        >
          <span class="relative z-10">Beranda</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="absolute -right-4 top-1/2 -translate-y-1/2 w-28 h-28 opacity-10 group-hover:text-primary group-hover:opacity-30 transition-all rotate-[5deg]"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </router-link>

        <router-link
          to="/carabermain"
          class="relative overflow-hidden h-full flex items-center pl-8 pr-12 hover:bg-accent hover:text-primary transition-colors border-r-[4px] border-accent group"
        >
          <span class="relative z-10">Cara Bermain</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="absolute -right-4 top-1/2 -translate-y-1/2 w-28 h-28 opacity-10 group-hover:text-primary group-hover:opacity-30 transition-all rotate-[-10deg]"
          >
            <path
              d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
            />
          </svg>
        </router-link>

        <router-link
          to="/catalog"
          class="relative overflow-hidden h-full flex items-center pl-8 pr-12 hover:bg-accent hover:text-primary transition-colors border-r-[4px] border-accent group"
        >
          <span class="relative z-10">Catalog</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="absolute -right-4 top-1/2 -translate-y-1/2 w-32 h-32 opacity-10 group-hover:text-primary group-hover:opacity-30 transition-all rotate-[15deg]"
          >
            <path
              d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"
            />
          </svg>
        </router-link>

        <router-link
          to="/profile"
          class="relative overflow-hidden h-full flex items-center pl-8 pr-12 hover:bg-accent hover:text-primary transition-colors border-accent group"
        >
          <span class="relative z-10">Tentang Kami</span>
          <div
            class="absolute -right-2 top-1/2 -translate-y-1/2 text-[90px] font-pixel opacity-10 group-hover:text-primary group-hover:opacity-30 transition-all leading-none"
          >
            ?
          </div>
        </router-link>
      </div>

      <div
        class="md:hidden flex items-center border-l-[4px] border-accent h-full aspect-square"
      >
        <button
          @click="toggleMobileMenu"
          class="w-full h-full flex items-center justify-center bg-accent text-primary transition-colors active:bg-primary active:text-accent border-none outline-none"
        >
          <svg
            v-if="!isMobileMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="square"
              stroke-linejoin="round"
              stroke-width="3"
              d="M4 6h16M4 12h16m-16 6h16"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="square"
              stroke-linejoin="round"
              stroke-width="3"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </nav>

    <transition name="menu-slide">
      <div
        v-if="isMobileMenuOpen"
        class="fixed top-20 left-0 right-0 z-[90] bg-primary flex flex-col font-main font-black uppercase text-lg text-accent border-b-[4px] border-accent shadow-[0_10px_0_0_rgba(0,0,0,0.2)]"
      >
        <div
          class="absolute inset-0 border-x-[4px] border-accent pointer-events-none"
        ></div>

        <router-link
          to="/"
          @click="toggleMobileMenu"
          class="relative overflow-hidden flex items-center px-6 py-6 border-b-[4px] border-accent hover:bg-accent hover:text-primary transition-colors tracking-tight group"
        >
          <span class="relative z-10">Beranda</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="absolute right-[-10px] top-1/2 -translate-y-1/2 w-24 h-24 text-accent group-hover:text-primary transition-all rotate-[5deg]"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </router-link>

        <router-link
          to="/carabermain"
          @click="toggleMobileMenu"
          class="relative overflow-hidden flex items-center px-6 py-6 border-b-[4px] border-accent hover:bg-accent hover:text-primary transition-colors tracking-tight group"
        >
          <span class="relative z-10">How To Play</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="absolute right-[-10px] top-1/2 -translate-y-1/2 w-24 h-24 text-accent group-hover:text-primary transition-all rotate-[-10deg]"
          >
            <path
              d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
            />
          </svg>
        </router-link>

        <router-link
          to="/catalog"
          @click="toggleMobileMenu"
          class="relative overflow-hidden flex items-center px-6 py-6 border-b-[4px] border-accent hover:bg-accent hover:text-primary transition-colors tracking-tight group"
        >
          <span class="relative z-10">Catalog</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="absolute right-[-10px] top-1/2 -translate-y-1/2 w-24 h-24 text-accent group-hover:text-primary transition-all rotate-[15deg]"
          >
            <path
              d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"
            />
          </svg>
        </router-link>

        <router-link
          to="/profile"
          @click="toggleMobileMenu"
          class="relative overflow-hidden flex items-center px-6 py-6 border-b-[4px] border-accent hover:bg-accent hover:text-primary transition-colors tracking-tight group"
        >
          <span class="relative z-10">Tentang Kami</span>
          <div
            class="absolute right-0 top-1/2 -translate-y-1/2 text-[60px] font-pixel text-accent group-hover:text-primary transition-all leading-none pt-4"
          >
            ?
          </div>
        </router-link>

        <div
          class="w-full py-4 text-[10px] text-center font-pixel tracking-widest opacity-80 bg-primary z-10"
        >
          © 2026 FUNDIVEST - PROTECT YOUR ASSETS
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
  transform: translateY(-10%);
}
</style>

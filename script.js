// Inisialisasi Lucide Icons
lucide.createIcons();

// Logika Dark/Light Mode
const themeToggle = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');
const htmlElement = document.documentElement;

// Cek tema saat halaman dimuat
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
    darkIcon.classList.remove('hidden');
    lightIcon.classList.add('hidden');
} else {
    htmlElement.classList.remove('dark');
    lightIcon.classList.remove('hidden');
    darkIcon.classList.add('hidden');
}

themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    const isDarkMode = htmlElement.classList.contains('dark');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    darkIcon.classList.toggle('hidden', !isDarkMode);
    lightIcon.classList.toggle('hidden', isDarkMode);
});
        
// Header menjadi solid saat di-scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('bg-white/80', 'dark:bg-[#0F172A]/80', 'backdrop-blur-sm', 'shadow-md');
    } else {
        header.classList.remove('bg-white/80', 'dark:bg-[#0F172A]/80', 'backdrop-blur-sm', 'shadow-md');
    }
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Animasi saat elemen masuk viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

const elementsToAnimate = document.querySelectorAll('.scroll-animate');
elementsToAnimate.forEach(el => observer.observe(el));
        
// Efek Parallax sederhana di Hero Section
const parallaxBg = document.getElementById('parallax-bg');
window.addEventListener('scroll', () => {
    const offset = window.pageYOffset;
    if (parallaxBg) {
       parallaxBg.style.transform = `translateY(${offset * 0.3}px)`;
    }
});

// Smooth scroll untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
             targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
       
        // Tutup menu mobile jika terbuka
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});
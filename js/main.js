const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("open")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* DARK MODE */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.querySelector("i").className = "fa-solid fa-sun";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-theme");

    const isDark = document.body.classList.contains("dark-theme");

    localStorage.setItem(
        "portfolio-theme",
        isDark ? "dark" : "light"
    );

    themeToggle.querySelector("i").className =
        isDark
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";

});


/* ACTIVE NAVIGATION */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {
            link.classList.add("active");
        }

    });

});


/* SCROLL TOP */

const scrollTopButton =
    document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        scrollTopButton.classList.add("show");
    } else {
        scrollTopButton.classList.remove("show");
    }

});

scrollTopButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* CURRENT YEAR */

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


/* INTERACTIVE SKILL CARDS */

const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach(card => {

    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-pressed", "false");

    function toggleSkillCard() {

        const wasActive =
            card.classList.contains("skill-active");

        // Reset other cards
        skillCards.forEach(otherCard => {
            otherCard.classList.remove("skill-active");
            otherCard.setAttribute("aria-pressed", "false");
        });

        // Toggle selected card
        if (!wasActive) {
            card.classList.add("skill-active");
            card.setAttribute("aria-pressed", "true");
        }
    }

    card.addEventListener("click", toggleSkillCard);

    card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleSkillCard();
        }
    });

});


/* ===================================
   INTERACTIVE INDIVIDUAL SKILLS
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    const badges = document.querySelectorAll(
        "#skills .skill-tags span, #skills .skill-tags button"
    );

    badges.forEach(badge => {

        // Make each badge accessible by keyboard
        if (badge.tagName !== "BUTTON") {
            badge.setAttribute("role", "button");
            badge.setAttribute("tabindex", "0");
        }

        badge.setAttribute("aria-pressed", "false");

        function toggleBadge(event) {

            // Prevent the parent skill card from
            // toggling when a badge is clicked
            event.stopPropagation();

            const isActive =
                badge.classList.contains("badge-active");

            badge.classList.toggle("badge-active", !isActive);

            badge.setAttribute(
                "aria-pressed",
                String(!isActive)
            );
        }

        badge.addEventListener("click", toggleBadge);

        badge.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleBadge(event);
            }
        });

    });

});


/* ==========================================
   INTERACTIVE PROJECT TECHNOLOGY BADGES
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const techBadges = document.querySelectorAll(
        ".project-card .tech-stack span"
    );

    techBadges.forEach(badge => {

        // Make badges accessible
        badge.setAttribute("role", "button");
        badge.setAttribute("tabindex", "0");
        badge.setAttribute("aria-pressed", "false");

        function toggleTechBadge(event) {

            // Prevent project card click events
            event.stopPropagation();

            const isActive =
                badge.classList.contains("tech-active");

            // Toggle selected state
            badge.classList.toggle("tech-active", !isActive);

            badge.setAttribute(
                "aria-pressed",
                String(!isActive)
            );
        }

        // Mouse click
        badge.addEventListener("click", toggleTechBadge);

        // Keyboard support
        badge.addEventListener("keydown", event => {

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleTechBadge(event);
            }

        });

    });

});


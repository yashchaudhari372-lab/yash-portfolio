/**
 * YASH CHAUDHARI - PORTFOLIO INTERACTIVITY SCRIPT
 * Handles Theme Toggles, Multi-Color Palette, Typist, Filters, Lightbox Modal & Animations
 */

document.addEventListener("DOMContentLoaded", () => {
    // =========================================================================
    // 1. MOBILE NAVIGATION MENU
    // =========================================================================
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            const icon = menuToggle.querySelector("i");
            if (navMenu.classList.contains("open")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                const icon = menuToggle.querySelector("i");
                if (icon) icon.className = "fa-solid fa-bars";
            });
        });
    }

    // =========================================================================
    // 2. LIGHT / DARK THEME TOGGLE
    // =========================================================================
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        document.documentElement.classList.add("dark-theme");
        if (themeToggle) {
            themeToggle.querySelector("i").className = "fa-solid fa-sun";
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            document.documentElement.classList.toggle("dark-theme");
            const isDark = document.body.classList.contains("dark-theme");
            localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");

            const icon = themeToggle.querySelector("i");
            icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
        });
    }

    // =========================================================================
    // 3. MULTI-COLOR ACCENT PALETTE SWITCHER
    // =========================================================================
    const paletteToggle = document.getElementById("paletteToggle");
    const paletteDropdown = document.getElementById("paletteDropdown");
    const colorButtons = document.querySelectorAll(".palette-color-btn");

    // Initialize saved color theme
    const savedColor = localStorage.getItem("portfolio-accent-color") || "blue";
    applyColorTheme(savedColor);

    if (paletteToggle && paletteDropdown) {
        paletteToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            paletteDropdown.classList.toggle("show");
        });

        document.addEventListener("click", (e) => {
            if (!paletteDropdown.contains(e.target) && e.target !== paletteToggle) {
                paletteDropdown.classList.remove("show");
            }
        });
    }

    colorButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const color = btn.getAttribute("data-color");
            applyColorTheme(color);
            localStorage.setItem("portfolio-accent-color", color);
            showToast(`Theme changed to ${btn.getAttribute("title")}!`);
            if (paletteDropdown) {
                paletteDropdown.classList.remove("show");
            }
        });
    });

    function applyColorTheme(colorName) {
        document.documentElement.setAttribute("data-color", colorName);
        document.body.setAttribute("data-color", colorName);

        colorButtons.forEach(b => {
            if (b.getAttribute("data-color") === colorName) {
                b.classList.add("active");
            } else {
                b.classList.remove("active");
            }
        });
    }

    // =========================================================================
    // 4. ACTIVE NAVIGATION LINK ON SCROLL
    // =========================================================================
    const sections = document.querySelectorAll("section[id]");

    function updateActiveNav() {
        const scrollY = window.scrollY;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });

    // =========================================================================
    // 5. SCROLL TO TOP BUTTON
    // =========================================================================
    const scrollTopButton = document.getElementById("scrollTop");

    if (scrollTopButton) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                scrollTopButton.classList.add("show");
            } else {
                scrollTopButton.classList.remove("show");
            }
        }, { passive: true });

        scrollTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // =========================================================================
    // 6. CURRENT YEAR FOOTER
    // =========================================================================
    const yearElem = document.getElementById("currentYear");
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }

    // =========================================================================
    // 7. HERO ROLE TYPING ANIMATION
    // =========================================================================
    const typedTextElem = document.getElementById("roleTypedText");
    if (typedTextElem) {
        const roles = [
            "Data Scientist & Machine Learning Engineer",
            "Generative AI & LLM Practitioner",
            "Deep Learning & Predictive Modeler",
            "Business Intelligence & Data Analyst"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 55;
        const deleteSpeed = 30;
        const delayBetweenRoles = 2200;

        function typeEffect() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typedTextElem.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextElem.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeEffect, delayBetweenRoles);
                return;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeEffect, 400);
                return;
            }

            const currentSpeed = isDeleting ? deleteSpeed : typeSpeed;
            setTimeout(typeEffect, currentSpeed);
        }

        setTimeout(typeEffect, 500);
    }

    // =========================================================================
    // 8. COPY EMAIL BUTTON & TOAST NOTIFICATION
    // =========================================================================
    const copyEmailBtn = document.getElementById("copyEmailBtn");
    const copyToast = document.getElementById("copyToast");
    const toastMsg = document.getElementById("toastMsg");

    function showToast(message) {
        if (!copyToast) return;
        if (toastMsg) toastMsg.textContent = message;
        copyToast.classList.add("show");
        setTimeout(() => {
            copyToast.classList.remove("show");
        }, 2800);
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener("click", () => {
            const email = "yashchaudhari372@gmail.com";
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(() => {
                    showToast("Email copied: yashchaudhari372@gmail.com");
                }).catch(() => {
                    fallbackCopy(email);
                });
            } else {
                fallbackCopy(email);
            }
        });
    }

    function fallbackCopy(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand("copy");
            showToast("Email copied: " + text);
        } catch (err) {
            showToast("Email: " + text);
        }
        document.body.removeChild(textArea);
    }

    // =========================================================================
    // 9. PROJECTS FILTERING
    // =========================================================================
    const projectFilterBtns = document.querySelectorAll("[data-project-filter]");
    const projectCards = document.querySelectorAll(".projects-grid .project-card");

    projectFilterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            projectFilterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-project-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-project-category") || "";
                if (filterValue === "all" || category.includes(filterValue)) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 50);
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // =========================================================================
    // 10. CERTIFICATIONS FILTERING
    // =========================================================================
    const certFilterBtns = document.querySelectorAll("[data-cert-filter]");
    const certCards = document.querySelectorAll(".cert-grid .certificate-card");

    certFilterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            certFilterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-cert-filter");

            certCards.forEach(card => {
                const category = card.getAttribute("data-cert-category") || "";
                if (filterValue === "all" || category.includes(filterValue)) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 50);
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // =========================================================================
    // 11. CERTIFICATE LIGHTBOX MODAL
    // =========================================================================
    const certModal = document.getElementById("certModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalIssuer = document.getElementById("modalIssuer");
    const modalImg = document.getElementById("modalImg");
    const modalMeta = document.getElementById("modalMeta");
    const modalVerifyLink = document.getElementById("modalVerifyLink");
    const modalDownloadBtn = document.getElementById("modalDownloadBtn");
    const modalCloseBtn = document.getElementById("modalCloseBtn");

    window.openCertificateModal = function(title, issuer, imgSrc, metaText = "", verifyUrl = "", credId = "") {
        if (!certModal) return;

        if (modalTitle) modalTitle.textContent = title;
        if (modalIssuer) modalIssuer.textContent = issuer;
        if (modalImg) {
            modalImg.src = imgSrc;
            modalImg.alt = title;
        }

        let fullMeta = metaText;
        if (credId) {
            fullMeta += (fullMeta ? " • " : "") + `Credential ID: ${credId}`;
        }
        if (modalMeta) modalMeta.textContent = fullMeta || "Verified Professional Credential";

        if (modalVerifyLink) {
            if (verifyUrl && verifyUrl.trim() !== "") {
                modalVerifyLink.href = verifyUrl;
                modalVerifyLink.style.display = "inline-flex";
            } else {
                modalVerifyLink.style.display = "none";
            }
        }

        if (modalDownloadBtn) {
            modalDownloadBtn.onclick = () => {
                window.open(imgSrc, "_blank");
            };
        }

        certModal.classList.add("active");
        certModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    function closeCertificateModal() {
        if (!certModal) return;
        certModal.classList.remove("active");
        certModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", closeCertificateModal);
    }

    if (certModal) {
        certModal.addEventListener("click", (e) => {
            if (e.target === certModal) {
                closeCertificateModal();
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && certModal && certModal.classList.contains("active")) {
            closeCertificateModal();
        }
    });
});

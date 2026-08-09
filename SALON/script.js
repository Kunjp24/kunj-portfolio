/* =========================================
   LUXE BEAUTY STUDIO
   JAVASCRIPT
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


/* Close mobile menu after clicking a link */

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.style.background = "rgba(20, 17, 15, 0.92)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";

    } else {

        header.style.background = "rgba(20, 17, 15, 0.35)";
        header.style.boxShadow = "none";

    }

});


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .service-card, .about-content, .about-image, .review-card, .gallery-item, .contact-item"
);


const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("reveal-visible");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================
   GALLERY HOVER EFFECT
========================================= */

const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach(item => {

    item.addEventListener("mouseenter", () => {

        item.style.zIndex = "5";

    });

    item.addEventListener("mouseleave", () => {

        item.style.zIndex = "1";

    });

});


/* =========================================
   BOOKING BUTTONS
========================================= */

const bookingButtons = document.querySelectorAll(
    'a[href="#booking"], a[href="#contact"]'
);

bookingButtons.forEach(button => {

    button.addEventListener("click", () => {

        console.log("Booking section selected.");

    });

});


/* =========================================
   CURRENT YEAR
========================================= */

const footerText = document.querySelector(".footer p");

if (footerText) {

    const currentYear = new Date().getFullYear();

    footerText.innerHTML =
        `© ${currentYear} Luxe Beauty Studio. All rights reserved.`;

}


/* =========================================
   PARALLAX HERO EFFECT
========================================= */

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    if (window.innerWidth > 750) {

        const scrollPosition = window.scrollY;

        if (scrollPosition < window.innerHeight) {

            hero.style.backgroundPosition =
                `center ${scrollPosition * 0.35}px`;

        }

    }

});


/* =========================================
   BUTTON RIPPLE EFFECT
========================================= */

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("click", function (event) {

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const rect = this.getBoundingClientRect();

        ripple.style.left =
            `${event.clientX - rect.left}px`;

        ripple.style.top =
            `${event.clientY - rect.top}px`;

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "%cLUXE BEAUTY STUDIO",
    "font-size: 24px; font-weight: bold;"
);

console.log(
    "Website successfully loaded."
);
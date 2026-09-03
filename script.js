// =========================================================
// TYPING EFFECT
// =========================================================

const roles = [
    "Software Developer",
    "Java Developer",
    "Web Developer",
    "Java Fullstack Developer",
    "Computer Science Student"
];

const roleElement = document.querySelector(".hero h2");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        roleElement.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1800);

            return;
        }

    } else {

        roleElement.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(
        typeEffect,
        deleting ? 50 : 100
    );
}

if (roleElement) {
    typeEffect();
}



// =========================================================
// MOBILE MENU
// =========================================================

const menuBtn =
    document.querySelector(".menu-btn");

const nav =
    document.querySelector(".navbar nav");


if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("show");

        // Change menu icon

        const icon =
            menuBtn.querySelector("i");

        if (nav.classList.contains("show")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");
        }

    });


    // Close menu after clicking a link

    document
        .querySelectorAll(".navbar nav a")
        .forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("show");

                const icon =
                    menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            });

        });

}



// =========================================================
// SCROLL REVEAL
// =========================================================

const revealElements =
    document.querySelectorAll(
        ".section, .project-card, .skill-card, .timeline-item, .stats"
    );


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "reveal-active"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});



// =========================================================
// ACTIVE NAVIGATION
// =========================================================

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".navbar nav a"
    );


function updateActiveNavigation() {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);



// =========================================================
// NAVBAR SCROLL EFFECT
// =========================================================

const navbar =
    document.querySelector(".navbar");


function navbarScrollEffect() {

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(5, 5, 5, 0.92)";

        navbar.style.boxShadow =
            "0 8px 35px rgba(0, 0, 0, 0.45)";

    } else {

        navbar.style.background =
            "rgba(5, 5, 5, 0.72)";

        navbar.style.boxShadow =
            "none";

    }

}


window.addEventListener(
    "scroll",
    navbarScrollEffect
);



// =========================================================
// HERO MOUSE MOVEMENT
// =========================================================

const hero =
    document.querySelector(".hero");

const heroImage =
    document.querySelector(".hero-image");


if (hero && heroImage) {

    hero.addEventListener(
        "mousemove",
        (event) => {

            // Disable effect on small screens

            if (window.innerWidth <= 900) {
                return;
            }

            const rect =
                hero.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const moveX =
                (x - centerX) / 35;

            const moveY =
                (y - centerY) / 35;


            heroImage.style.transform =
                `translate(${moveX}px, ${moveY}px)`;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            heroImage.style.transform =
                "translate(0, 0)";

        }
    );

}



// =========================================================
// SMOOTH PROJECT BUTTONS
// =========================================================

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    targetId === "#" ||
                    targetId === ""
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });



// =========================================================
// PAGE LOAD
// =========================================================

window.addEventListener(
    "load",
    () => {

        updateActiveNavigation();

        navbarScrollEffect();

    }
);
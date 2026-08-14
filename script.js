// ROK W STOPCE

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


// MENU MOBILNE

const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.getElementById("navLinks");


function closeMenu() {

    if (!menuButton || !navLinks) {
        return;
    }


    navLinks.classList.remove("open");

    menuButton.classList.remove("open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

}


if (menuButton && navLinks) {

    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                navLinks.classList.toggle(
                    "open"
                );


            menuButton.classList.toggle(
                "open",
                isOpen
            );


            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );

}


// ZAMYKANIE MENU PO KLIKNIĘCIU LINKU

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


// ZAMKNIĘCIE MENU KLAWISZEM ESC

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeMenu();

        }

    }
);


// ZAMKNIĘCIE MENU PO POWROCIE NA DESKTOP

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 700
        ) {

            closeMenu();

        }

    }
);


// ANIMACJE PRZY SCROLLOWANIU

const animatedElements =
    document.querySelectorAll(
        `
        .section-heading,
        .about-text,
        .about-card,
        .experience-item,
        .project-card,
        .skill-group,
        .contact-box
        `
    );


const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (!reducedMotion) {

    animatedElements.forEach(
        element => {

            element.classList.add(
                "fade-in"
            );

        }
    );


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.1
            }

        );


    animatedElements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


// EFEKT 3D KARTY PROFILOWEJ

const profileCard =
    document.querySelector(
        ".profile-card"
    );


if (
    profileCard &&
    !reducedMotion
) {

    profileCard.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth <= 900
            ) {

                return;

            }


            const rect =
                profileCard
                    .getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                (
                    y -
                    centerY
                ) / 38;


            const rotateY =
                (
                    centerX -
                    x
                ) / 38;


            profileCard.style.transform =
                `
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-5px)
                `;

        }
    );


    profileCard.addEventListener(
        "mouseleave",
        () => {

            profileCard.style.transform =
                "";

        }
    );

}


// KOPIOWANIE E-MAILA

const copyEmailButton =
    document.getElementById(
        "copyEmailButton"
    );

const copyStatus =
    document.getElementById(
        "copyStatus"
    );

const emailAddress =
    "egrochocka98@gmail.com";


function showCopySuccess() {

    if (
        !copyEmailButton ||
        !copyStatus
    ) {

        return;

    }


    copyEmailButton.textContent =
        "Skopiowano ✓";


    copyEmailButton.classList.add(
        "copied"
    );


    copyStatus.textContent =
        "Adres e-mail został skopiowany.";


    setTimeout(
        () => {

            copyEmailButton.textContent =
                "Kopiuj e-mail";


            copyEmailButton.classList.remove(
                "copied"
            );


            copyStatus.textContent =
                "";

        },
        2500
    );

}


if (
    copyEmailButton &&
    copyStatus
) {

    copyEmailButton.addEventListener(
        "click",
        async () => {

            try {

                await navigator
                    .clipboard
                    .writeText(
                        emailAddress
                    );


                showCopySuccess();

            }

            catch (error) {

                const temporaryInput =
                    document.createElement(
                        "textarea"
                    );


                temporaryInput.value =
                    emailAddress;


                temporaryInput.style.position =
                    "fixed";


                temporaryInput.style.opacity =
                    "0";


                temporaryInput.setAttribute(
                    "readonly",
                    ""
                );


                document.body.appendChild(
                    temporaryInput
                );


                temporaryInput.select();


                const copied =
                    document.execCommand(
                        "copy"
                    );


                temporaryInput.remove();


                if (copied) {

                    showCopySuccess();

                }

                else {

                    copyStatus.textContent =
                        "Nie udało się skopiować. Zaznacz adres ręcznie.";

                }

            }

        }
    );

}


// AKTYWNA SEKCJA W MENU

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navigationLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


function updateActiveNavigation() {

    let currentSection =
        "home";


    const scrollPosition =
        window.scrollY + 180;


    sections.forEach(
        section => {

            const sectionTop =
                section.offsetTop;


            if (
                scrollPosition >=
                sectionTop
            ) {

                currentSection =
                    section.id;

            }

        }
    );


    navigationLinks.forEach(
        link => {

            const target =
                link
                    .getAttribute("href")
                    ?.replace("#", "");


            link.classList.toggle(
                "active",
                target === currentSection
            );

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


window.addEventListener(
    "load",
    updateActiveNavigation
);
// ROK W STOPCE

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


// MENU MOBILNE

const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.getElementById("navLinks");


if (menuButton && navLinks) {

    menuButton.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle("open");

        }
    );

}


// ZAMYKANIE MENU PO KLIKNIĘCIU LINKU

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navLinks.classList.remove("open");

            }
        );

    });


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


animatedElements.forEach(
    element => {

        element.classList.add("fade-in");

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

        observer.observe(element);

    }
);


// DELIKATNY EFEKT KARTY PROFILOWEJ

const profileCard =
    document.querySelector(
        ".profile-card"
    );


if (profileCard) {

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
                ) / 35;


            const rotateY =
                (
                    centerX -
                    x
                ) / 35;


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
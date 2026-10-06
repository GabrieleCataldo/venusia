/*
    Segnala al CSS che JavaScript è attivo.
    Ci serve per le animazioni allo scroll.
*/

/*
    Evitiamo che il browser mantenga
    la posizione precedente dopo un refresh.
*/

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}


/*
    Se nell'URL è rimasto un #qualcosa,
    lo rimuoviamo senza ricaricare la pagina.
*/

if (window.location.hash) {
    history.replaceState(
        null,
        "",
        window.location.pathname
    );
}


/*
    All'apertura partiamo sempre dall'alto.
*/

window.scrollTo(0, 0);

document.documentElement.classList.add("js");


/*
    Recuperiamo gli elementi principali.
*/

const menuButton =
    document.getElementById("menu-button");

const mobileMenu =
    document.getElementById("mobile-menu");

const mobileLinks =
    mobileMenu.querySelectorAll("a");

const currentYear =
    document.getElementById("current-year");

const siteHeader =
    document.querySelector(".site-header");

    /*
    NAVIGAZIONE INTERNA

    Facciamo scorrere la pagina alle sezioni
    senza aggiungere #servizi, #quartiere, ecc.
    all'URL.
*/

const internalLinks =
    document.querySelectorAll('a[href^="#"]');


internalLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                /*
                    Ignoriamo eventuali link
                    che hanno solamente href="#"
                */

                if (targetId === "#") {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                /*
                    Manteniamo l'URL pulito.
                */

                history.replaceState(
                    null,
                    "",
                    window.location.pathname
                );

            }
        );

    }
);


/*
    MENU MOBILE
*/

function closeMobileMenu() {

    mobileMenu.classList.remove("open");

    document.body.classList.remove("menu-open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

}


function openMobileMenu() {

    mobileMenu.classList.add("open");

    document.body.classList.add("menu-open");

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

}


menuButton.setAttribute(
    "aria-expanded",
    "false"
);


menuButton.addEventListener(
    "click",
    () => {

        const menuIsOpen =
            mobileMenu.classList.contains("open");


        if (menuIsOpen) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }

    }
);


/*
    Quando scegliamo una voce del menu,
    il menu mobile viene chiuso.
*/

mobileLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    }
);


/*
    Possiamo chiudere il menu anche
    premendo ESC sulla tastiera.
*/

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            mobileMenu.classList.contains("open")
        ) {

            closeMobileMenu();

        }

    }
);


/*
    HEADER DURANTE LO SCROLL
*/

function updateHeader() {

    if (window.scrollY > 40) {

        siteHeader.classList.add(
            "scrolled"
        );

    } else {

        siteHeader.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


updateHeader();


/*
    ANIMAZIONI ALLO SCROLL
*/

const revealElements =
    document.querySelectorAll(
        `
        .section-heading,
        .intro-text,
        .gallery-main,
        .gallery-small,
        .advantage,
        .service-item,
        .neighbourhood-content,
        .nearby-card,
        .guest-info-grid article,
        .reviews-section > *,
        .faq-list,
        .contact-section > *
        `
    );


revealElements.forEach(
    element => {

        element.classList.add(
            "reveal"
        );

    }
);


/*
    IntersectionObserver controlla quando
    un elemento entra nello schermo.
*/

if (
    "IntersectionObserver" in window
) {

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
                threshold: 0.12
            }

        );


    revealElements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

} else {

    /*
        Se il browser fosse molto vecchio,
        mostriamo comunque tutto.
    */

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/*
    ANNO AUTOMATICO NEL FOOTER
*/

currentYear.textContent =
    new Date().getFullYear();
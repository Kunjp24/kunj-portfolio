/* =========================================
   KUNJ PATEL PORTFOLIO
   FINAL JAVASCRIPT
========================================= */


/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    if (!loader) return;

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 650);

    }, 900);

});


/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.querySelector(".menu-button");

const mobileMenu =
    document.querySelector(".mobile-menu");

const mobileClose =
    document.querySelector(".mobile-close");


if (menuButton && mobileMenu) {

    menuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.add("open");

            document.body.style.overflow =
                "hidden";

        }
    );

}


if (mobileClose && mobileMenu) {

    mobileClose.addEventListener(
        "click",
        () => {

            mobileMenu.classList.remove("open");

            document.body.style.overflow =
                "";

        }
    );

}


document.querySelectorAll(
    ".mobile-menu a"
).forEach(link => {

    link.addEventListener(
        "click",
        () => {

            mobileMenu.classList.remove(
                "open"
            );

            document.body.style.overflow =
                "";

        }
    );

});


/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(
                    targetId
                );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if (
    revealElements.length &&
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => {
            revealObserver.observe(element);
        }
    );

} else {

    revealElements.forEach(
        element => {
            element.classList.add("visible");
        }
    );

}


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorRing =
    document.querySelector(".cursor-ring");


const desktopPointer =
    window.matchMedia(
        "(pointer: fine)"
    ).matches;


let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


if (
    desktopPointer &&
    cursorDot &&
    cursorRing
) {

    window.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;

        }
    );


    function animateCursor() {

        ringX +=
            (mouseX - ringX) *
            0.14;

        ringY +=
            (mouseY - ringY) *
            0.14;


        cursorRing.style.left =
            `${ringX}px`;

        cursorRing.style.top =
            `${ringY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    document.querySelectorAll(
        "a, button, .project-card"
    ).forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {
                cursorRing.classList.add(
                    "active"
                );
            }
        );


        element.addEventListener(
            "mouseleave",
            () => {
                cursorRing.classList.remove(
                    "active"
                );
            }
        );

    });

}


/* =========================================
   PROJECT CARD 3D TILT
========================================= */

if (desktopPointer) {

    document.querySelectorAll(
        ".project-card"
    ).forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

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
                    ((y - centerY) /
                        centerY) * -2.5;

                const rotateY =
                    ((x - centerX) /
                        centerX) * 2.5;

                card.style.transform =
                    `
                    perspective(1200px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-4px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });

}


/* =========================================
   THREE.JS HERO
========================================= */

function initThree() {

    if (
        typeof THREE === "undefined"
    ) {
        console.warn(
            "Three.js could not be loaded."
        );

        return;
    }


    const canvas =
        document.getElementById(
            "threeCanvas"
        );


    if (!canvas) return;


    const scene =
        new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            45,
            window.innerWidth /
            window.innerHeight,
            .1,
            100
        );


    camera.position.z = 5;


    const renderer =
        new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    /* MAIN WIREFRAME */

    const geometry =
        new THREE.IcosahedronGeometry(
            1.25,
            3
        );


    const material =
        new THREE.MeshBasicMaterial({
            color: 0xc8ff00,
            wireframe: true,
            transparent: true,
            opacity: .8
        });


    const object =
        new THREE.Mesh(
            geometry,
            material
        );


    scene.add(object);


    /* INNER CORE */

    const coreGeometry =
        new THREE.IcosahedronGeometry(
            .72,
            2
        );


    const coreMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: .12
        });


    const core =
        new THREE.Mesh(
            coreGeometry,
            coreMaterial
        );


    scene.add(core);


    /* RINGS */

    function createRing(
        radius,
        opacity,
        rotation
    ) {

        const ringGeometry =
            new THREE.TorusGeometry(
                radius,
                .008,
                12,
                100
            );


        const ringMaterial =
            new THREE.MeshBasicMaterial({
                color: 0xc8ff00,
                transparent: true,
                opacity: opacity
            });


        const ring =
            new THREE.Mesh(
                ringGeometry,
                ringMaterial
            );


        ring.rotation.set(
            rotation.x,
            rotation.y,
            rotation.z
        );


        scene.add(ring);

        return ring;

    }


    const ring1 =
        createRing(
            1.65,
            .55,
            {
                x: Math.PI / 2,
                y: 0,
                z: 0
            }
        );


    const ring2 =
        createRing(
            1.9,
            .3,
            {
                x: 0,
                y: Math.PI / 2,
                z: 0
            }
        );


    const ring3 =
        createRing(
            2.1,
            .18,
            {
                x: Math.PI / 3,
                y: 0,
                z: Math.PI / 5
            }
        );


    /* PARTICLES */

    const particleCount = 550;

    const particlePositions =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const radius =
            2.3 +
            Math.random() * 2.5;

        const theta =
            Math.random() *
            Math.PI *
            2;

        const phi =
            Math.acos(
                2 *
                Math.random() -
                1
            );


        particlePositions[
            i * 3
        ] =
            radius *
            Math.sin(phi) *
            Math.cos(theta);


        particlePositions[
            i * 3 + 1
        ] =
            radius *
            Math.sin(phi) *
            Math.sin(theta);


        particlePositions[
            i * 3 + 2
        ] =
            radius *
            Math.cos(phi);

    }


    const particleGeometry =
        new THREE.BufferGeometry();


    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            particlePositions,
            3
        )
    );


    const particleMaterial =
        new THREE.PointsMaterial({
            color: 0xc8ff00,
            size: .018,
            transparent: true,
            opacity: .65
        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );


    scene.add(particles);


    /* MOUSE MOVEMENT */

    let targetRotationX = 0;
    let targetRotationY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            targetRotationY =
                (
                    event.clientX /
                    window.innerWidth -
                    .5
                ) * .8;


            targetRotationX =
                (
                    event.clientY /
                    window.innerHeight -
                    .5
                ) * .5;

        }
    );


    /* ANIMATION */

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const time =
            clock.getElapsedTime();


        object.rotation.x +=
            (
                targetRotationX -
                object.rotation.x
            ) * .02;


        object.rotation.y +=
            (
                targetRotationY -
                object.rotation.y
            ) * .02;


        object.rotation.z +=
            .0015;


        core.rotation.x -=
            .001;


        core.rotation.y +=
            .002;


        ring1.rotation.z +=
            .003;


        ring2.rotation.x +=
            .002;


        ring3.rotation.y -=
            .0015;


        particles.rotation.y +=
            .0003;


        const floating =
            Math.sin(
                time * .8
            ) * .08;


        object.position.y =
            floating;

        core.position.y =
            floating;

        ring1.position.y =
            floating;

        ring2.position.y =
            floating;

        ring3.position.y =
            floating;


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* RESIZE */

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;

            camera.updateProjectionMatrix();


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );


            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio,
                    2
                )
            );

        }
    );

}


initThree();

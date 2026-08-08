// =========================================
// KUNJ PATEL — PORTFOLIO JAVASCRIPT
// =========================================


// =========================================
// 01. PAGE LOADER
// =========================================

window.addEventListener("load", function () {

    const loader = document.querySelector(".loader");

    if (loader) {

        setTimeout(function () {

            loader.style.opacity = "0";
            loader.style.pointerEvents = "none";

            setTimeout(function () {

                loader.style.display = "none";

            }, 600);

        }, 800);

    }

});


// =========================================
// 02. MOBILE / FULLSCREEN MENU
// =========================================

const menuButton =
    document.querySelector(".menu-button");

const menuClose =
    document.querySelector(".menu-close");

const fullscreenMenu =
    document.querySelector(".fullscreen-menu");


if (menuButton && fullscreenMenu) {

    menuButton.addEventListener(
        "click",
        function () {

            fullscreenMenu.classList.add("open");

            document.body.style.overflow =
                "hidden";

        }
    );

}


if (menuClose && fullscreenMenu) {

    menuClose.addEventListener(
        "click",
        function () {

            fullscreenMenu.classList.remove("open");

            document.body.style.overflow =
                "";

        }
    );

}


// Close menu when clicking a menu link

const menuLinks =
    document.querySelectorAll(
        ".menu-links a"
    );


menuLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function () {

            if (fullscreenMenu) {

                fullscreenMenu.classList.remove(
                    "open"
                );

            }

            document.body.style.overflow =
                "";

        }
    );

});


// =========================================
// 03. SMOOTH ANCHOR NAVIGATION
// =========================================

const anchorLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


anchorLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            const targetID =
                this.getAttribute("href");

            if (
                !targetID ||
                targetID === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetID
                );


            if (target) {

                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }

        }
    );

});


// =========================================
// 04. SCROLL REVEAL
// =========================================

const revealSections =
    document.querySelectorAll(
        ".reveal"
    );


if (
    revealSections.length &&
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

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

                    }
                );

            },

            {
                threshold: 0.15
            }

        );


    revealSections.forEach(
        function (section) {

            revealObserver.observe(
                section
            );

        }
    );

}


// =========================================
// 05. CUSTOM CURSOR
// =========================================

const cursorDot =
    document.querySelector(
        ".cursor-dot"
    );

const cursorRing =
    document.querySelector(
        ".cursor-ring"
    );


let cursorX = 0;
let cursorY = 0;

let ringX = 0;
let ringY = 0;


if (
    cursorDot &&
    cursorRing &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    window.addEventListener(
        "mousemove",
        function (event) {

            cursorX =
                event.clientX;

            cursorY =
                event.clientY;


            cursorDot.style.left =
                cursorX + "px";

            cursorDot.style.top =
                cursorY + "px";

        }
    );


    function animateCursor() {

        ringX +=
            (cursorX - ringX) *
            0.15;


        ringY +=
            (cursorY - ringY) *
            0.15;


        cursorRing.style.left =
            ringX + "px";

        cursorRing.style.top =
            ringY + "px";


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    const interactiveElements =
        document.querySelectorAll(
            "a, button, .project-card"
        );


    interactiveElements.forEach(
        function (element) {

            element.addEventListener(
                "mouseenter",
                function () {

                    cursorRing.classList.add(
                        "active"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                function () {

                    cursorRing.classList.remove(
                        "active"
                    );

                }
            );

        }
    );

}


// =========================================
// 06. PROJECT CARD 3D TILT
// =========================================

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(
    function (card) {

        card.addEventListener(
            "mousemove",
            function (event) {

                if (
                    !window.matchMedia(
                        "(pointer: fine)"
                    ).matches
                ) {

                    return;

                }


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
                        centerY) *
                    -5;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    5;


                card.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale3d(1.015,1.015,1.015)
                    `;


                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );


                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform =
                    "";

            }
        );

    }
);


// =========================================
// 07. THREE.JS CONNECTION CHECK
// =========================================

if (
    typeof THREE !==
    "undefined"
) {

    console.log(
        "THREE.JS LOADED SUCCESSFULLY"
    );

} else {

    console.warn(
        "THREE.JS IS NOT LOADED. 3D EFFECT DISABLED."
    );

}


// =========================================
// 08. PREMIUM 3D HERO
// =========================================

if (
    typeof THREE !==
    "undefined"
) {

    const canvas =
        document.getElementById(
            "threeCanvas"
        );


    if (canvas) {

        // =====================================
        // SCENE
        // =====================================

        const scene =
            new THREE.Scene();


        // =====================================
        // CAMERA
        // =====================================

        const camera =
            new THREE.PerspectiveCamera(

                45,

                window.innerWidth /
                window.innerHeight,

                0.1,

                100

            );


        camera.position.z = 5;


        // =====================================
        // RENDERER
        // =====================================

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


        // =====================================
        // MAIN WIREFRAME OBJECT
        // =====================================

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

                opacity: 0.9

            });


        const mainObject =
            new THREE.Mesh(

                geometry,

                material

            );


        scene.add(
            mainObject
        );


        // =====================================
        // INNER CORE
        // =====================================

        const coreGeometry =
            new THREE.IcosahedronGeometry(

                0.82,

                2

            );


        const coreMaterial =
            new THREE.MeshBasicMaterial({

                color: 0xffffff,

                wireframe: true,

                transparent: true,

                opacity: 0.13

            });


        const core =
            new THREE.Mesh(

                coreGeometry,

                coreMaterial

            );


        scene.add(
            core
        );


        // =====================================
        // ORBIT RING 1
        // =====================================

        const ringGeometry =
            new THREE.TorusGeometry(

                1.7,

                0.012,

                16,

                100

            );


        const ringMaterial =
            new THREE.MeshBasicMaterial({

                color: 0xc8ff00,

                transparent: true,

                opacity: 0.55

            });


        const ring =
            new THREE.Mesh(

                ringGeometry,

                ringMaterial

            );


        ring.rotation.x =
            Math.PI / 2;


        scene.add(
            ring
        );


        // =====================================
        // ORBIT RING 2
        // =====================================

        const ring2Geometry =
            new THREE.TorusGeometry(

                1.95,

                0.008,

                16,

                100

            );


        const ring2Material =
            new THREE.MeshBasicMaterial({

                color: 0xffffff,

                transparent: true,

                opacity: 0.2

            });


        const ring2 =
            new THREE.Mesh(

                ring2Geometry,

                ring2Material

            );


        ring2.rotation.y =
            Math.PI / 2;


        scene.add(
            ring2
        );


        // =====================================
        // ORBIT RING 3
        // =====================================

        const ring3Geometry =
            new THREE.TorusGeometry(

                2.15,

                0.006,

                12,

                100

            );


        const ring3Material =
            new THREE.MeshBasicMaterial({

                color: 0xc8ff00,

                transparent: true,

                opacity: 0.18

            });


        const ring3 =
            new THREE.Mesh(

                ring3Geometry,

                ring3Material

            );


        ring3.rotation.z =
            Math.PI / 3;


        scene.add(
            ring3
        );


        // =====================================
        // PARTICLES
        // =====================================

        const particleCount =
            700;


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
                2.5 +
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

                size: 0.018,

                transparent: true,

                opacity: 0.7

            });


        const particles =
            new THREE.Points(

                particleGeometry,

                particleMaterial

            );


        scene.add(
            particles
        );


        // =====================================
        // MOUSE INTERACTION
        // =====================================

        let targetRotationX = 0;

        let targetRotationY = 0;


        window.addEventListener(

            "mousemove",

            function (event) {

                const normalizedX =

                    event.clientX /
                    window.innerWidth -
                    0.5;


                const normalizedY =

                    event.clientY /
                    window.innerHeight -
                    0.5;


                targetRotationY =
                    normalizedX * 1.4;


                targetRotationX =
                    normalizedY * 0.9;

            }

        );


        // =====================================
        // CLOCK
        // =====================================

        const clock =
            new THREE.Clock();


        // =====================================
        // ANIMATION
        // =====================================

        function animate3D() {

            requestAnimationFrame(
                animate3D
            );


            const time =
                clock.getElapsedTime();


            // Main object

            mainObject.rotation.x +=

                (
                    targetRotationX -
                    mainObject.rotation.x

                ) * 0.025;


            mainObject.rotation.y +=

                (
                    targetRotationY -
                    mainObject.rotation.y

                ) * 0.025;


            mainObject.rotation.z +=
                0.002;


            // Core

            core.rotation.x +=
                0.0015;


            core.rotation.y -=
                0.002;


            core.rotation.z -=
                0.001;


            // Rings

            ring.rotation.z +=
                0.004;


            ring.rotation.y +=
                0.001;


            ring2.rotation.x +=
                0.003;


            ring2.rotation.z -=
                0.002;


            ring3.rotation.y -=
                0.002;


            ring3.rotation.z +=
                0.001;


            // Particles

            particles.rotation.y +=
                0.0005;


            particles.rotation.x =
                Math.sin(
                    time * 0.15
                ) * 0.05;


            // Floating motion

            const floatingY =

                Math.sin(
                    time * 0.8
                ) * 0.08;


            mainObject.position.y =
                floatingY;


            core.position.y =
                floatingY;


            ring.position.y =
                floatingY;


            ring2.position.y =
                floatingY;


            ring3.position.y =
                floatingY;


            // Breathing scale

            const scale =

                1 +

                Math.sin(
                    time * 1.2
                ) * 0.025;


            mainObject.scale.set(

                scale,

                scale,

                scale

            );


            // Render

            renderer.render(

                scene,

                camera

            );

        }


        animate3D();


        // =====================================
        // WINDOW RESIZE
        // =====================================

        window.addEventListener(

            "resize",

            function () {

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

}


// =========================================
// 09. PAGE VISIBILITY
// =========================================

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.hidden
        ) {

            document.body.classList.add(
                "page-hidden"
            );

        } else {

            document.body.classList.remove(
                "page-hidden"
            );

        }

    }
);
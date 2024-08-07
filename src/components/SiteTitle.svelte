<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 50"
    style="padding-top: 1.5rem; padding-bottom: 1rem"
>
    <defs>
        <linearGradient
            id="myGradient"
            gradientTransform="rotate(60)"
            x2="450%"
        >
            <stop stop-color="#7c3aed" />
            <stop offset=".3" stop-color="#da62c4" />
            <stop offset=".6" stop-color="#fff" />
        </linearGradient>
    </defs>
    <style>
        .idle-nashville {
            font-weight: 900;
            font-size: 40px;
        }
        --accent: 124, 58, 237;
        --accent-gradient: linear-gradient(
            45deg,
            rgb(var(--accent)),
            #da62c4 30%,
            white 60%
        );
        .text-gradient {
            /* background-image: var(--accent-gradient); */
            background: linear-gradient(
                45deg,
                rgb(124, 58, 237),
                #da62c4 30%,
                white 60%
            );
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 100%;
            background-position: 0%;
        }
    </style>
    <text
        x="10"
        y="40"
        class="idle-nashville text-gradient"
        fill="url('#myGradient')">Idle Nashville</text
    >
</svg>

<!-- <h1 class="font-bold text-4xl pt-5">
        <span class="text-gradient">Idle Nashville</span>
    </h1> -->

<style>
    svg {
        display: block;
        max-width: 100%;
        height: auto;
    }
    .text-gradient {
        background-image: linear-gradient(
            160deg,
            rgb(var(--accent)),
            #da62c4 90%,
            white 90%
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 400%;
        background-position: 0%;
    }
</style>

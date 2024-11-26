<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import Age from "./Age.svelte";
    import PinnedProjects from "./PinnedProjects.svelte";
    import { isHeroIntersecting } from "$lib/shared/isHeroIntersecting.svelte";

    let heroDiv: HTMLDivElement;
    let observer: IntersectionObserver;

    onMount(() => {
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isHeroIntersecting.value = entry.isIntersecting
            });
        }, {
            threshold: 0.2
        });

        if (heroDiv) {
            observer.observe(heroDiv);
        }

        return () => {
            isHeroIntersecting.value = false;
            observer.disconnect();
        }
    });
</script>

<div bind:this={heroDiv} class={`relative h-full w-full flex md:flex-row flex-col md:justify-normal justify-center items-center md:px-14`}>
    <section class={`md:w-1/2 w-full flex flex-col justify-center`}>
        <div class={`font-clashgrotesk font-semibold md:text-8xl text-6xl`}>
            <p>Hello! I'm</p>
            <h1 class={`md:h-[100px] h-[65px] bg-clip-text text-transparent bg-gradient-to-r from-[var(--g2)] via-[var(--g1)] to-[var(--g2)]`}>Lalit Maurya</h1>
        </div>

        <p class={`md:w-[80%] w-full md:text-base text-sm`}>
            A <Age /> year old developer with a love for exploring different fields of computer science, everything from
            web dev and ML to building a computer in minecraft! I am currently looking into reinforcement learning and its
            applications in finding optimal strategies for turn based games.
        </p>

        <div class={`flex flex-row md:gap-4 gap-2 mt-2`}>
            <!-- resume -->
            <a
                class={`apply-card rounded-lg group w-fit md:px-6 px-4 py-2 flex justify-center items-center gap-1 dark:hover:bg-neutral-800 hover:bg-neutral-300 transition-all duration-300`}
                href="https://drive.google.com/file/d/18Ck9p_FALOWsnijrS6Ae137R2BcP6EwS/view?usp=sharing"
                target="_blank"
            >
                <svg class={`md:h-[25px] h-[20px] aspect-square dark:group-hover:stroke-[2.5] group-hover:stroke-[2.8] stroke-2 md:dark:group-hover:stroke-neutral-50 md:dark:stroke-neutral-400 md:stroke-neutral-800 stroke-current transition-all duration-300 lucide lucide-file-user`} viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                    <path d="M15 18a3 3 0 1 0-6 0"/>
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/>
                    <circle cx="12" cy="13" r="2"/>
                </svg>
                <p class={`md:text-lg text-sm`}>Resume</p>
            </a>

            <!-- github -->
            <a
                class={`apply-card rounded-lg group w-fit md:px-6 px-4 py-2 flex justify-center items-center gap-1 dark:hover:bg-neutral-800 hover:bg-neutral-300 transition-all duration-300`}
                href="https://github.com/lalitm1004"
                target="_blank"
            >
                <svg class={`md:h-[25px] h-[20px] aspect-square dark:group-hover:stroke-[2.5] group-hover:stroke-[2.8] stroke-2 md:dark:group-hover:stroke-neutral-50 md:dark:stroke-neutral-400 md:stroke-neutral-800 stroke-current transition-all duration-300 tabler-icon tabler-icon-brand-github`} viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"/>
                </svg>
                <p class={`md:text-lg text-sm`}>Github</p>
            </a>

            <!-- linkedin -->
            <a
                class={`apply-card rounded-lg group w-fit md:px-6 px-4 py-2 flex justify-center items-center gap-1 dark:hover:bg-neutral-800 hover:bg-neutral-300 transition-all duration-300`}
                href="https://linkedin.com/in/lalitm1004"
                target="_blank"
            >
                <svg class={`md:h-[25px] h-[20px] aspect-square dark:group-hover:stroke-[2.5] group-hover:stroke-[2.8] stroke-2 md:group-hover:stroke-sky-600 md:dark:stroke-neutral-400 md:stroke-neutral-800 stroke-current transition-all duration-300 tabler-icon tabler-icon-brand-linkedin`} viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M8 11v5"/>
                    <path d="M8 8v.01"/>
                    <path d="M12 16v-5"/>
                    <path d="M16 16v-3a2 2 0 1 0 -4 0"/>
                    <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"/>
                </svg>
                <p class={`md:text-lg text-sm`}>LinkedIn</p>
            </a>
        </div>
    </section>
    <section class={`md:h-full h-full md:w-1/2 w-full`}>
        <PinnedProjects />
    </section>
</div>

<style>
    :root {
        --g1: #ED2788;
        --g2: #0F479F;
    }

    h1 {
        animation: bg-pan 20s linear infinite;
        background-size: 200%;
    }

    @keyframes bg-pan {
        0% {
            background-position: 0% center;
        }
        100% {
            background-position: -200% center;
        }
    }
</style>
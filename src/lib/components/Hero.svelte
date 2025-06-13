<script lang="ts">
    import { heroIntersecting } from "$lib/stores/VisualStores";
    import { onMount } from "svelte";
    import Age from "./Age.svelte";

    let heroDiv: HTMLDivElement;
    let observer: IntersectionObserver;

    onMount(() => {
        observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                heroIntersecting.set(e.isIntersecting);
            });
        }, {
            threshold: 0.2,
        });

        if (heroDiv) observer.observe(heroDiv);

        return () => {
            heroIntersecting.set(false);
            observer.disconnect();
        }
    })
</script>

<div
    class={`bg-red-100/10`}
    bind:this={heroDiv}
>
    <hgroup
        class={`md:w-[80%]`}
    >
        <p class={`font-grotesk font-semibold md:text-8xl text-6xl`}>Hello! I'm</p>

        <h1
            class={`font-grotesk font-semibold md:text-8xl text-6xl bg-clip-text text-transparent bg-gradient-to-r from-tv-girl-pink via-tv-girl-blue to-tv-girl-pink animate-bg-pan bg-size-[200%]`}
        >
            Lalit Maurya
        </h1>

        <p class={``}>
            A <Age /> year old developer with a love for exploring different fields of computer science, everything from
            web dev and ML to building a computer in minecraft! I am currently looking into reinforcement learning and its
            applications in finding optimal strategies for turn based games.
        </p>
    </hgroup>
</div>
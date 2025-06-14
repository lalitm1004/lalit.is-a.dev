<script lang="ts">
    import { heroIntersecting } from "$lib/stores/VisualStores";
    import { onMount, tick } from "svelte";
    import Age from "$lib/components/Age.svelte";
    import { fade, fly } from "svelte/transition";

    let isMounted: boolean = $state(false);
    $effect(() => {
        isMounted = true;
    });

    let heroDiv: HTMLDivElement | undefined = $state();
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

    const externalAnchors = [
        {
            id: 0,
            display: 'Github',
            href: 'https://github.com/lalitm1004',
            icon: githubSvg,
        },
        {
            id: 1,
            display: 'LinkedIn',
            href: 'https://linkedin.com/in/lalitm1004',
            icon: linkedinSvg,
        },
        {
            id: 2,
            display: 'Resume',
            href: 'https://drive.google.com/file/d/1ZeBwazCJXPVmxgWvtlnH9WE8CviwA14Q/view?usp=sharing',
            icon: resumeSvg,
        },
    ];
</script>

<div
    out:fade={{ duration: 100 }}
    bind:this={heroDiv}
>
    {#if isMounted}
        <hgroup transition:fly={{ x: '-100%' }} class={`md:w-[80%]`}>
            <div class={`font-grotesk font-semibold md:text-8xl text-6xl`}>
                <p>Hello! I'm</p>
                <h1 class={`bg-clip-text text-transparent bg-gradient-to-r from-tv-girl-pink via-tv-girl-blue to-tv-girl-pink animate-bg-pan bg-size-[200%]`}>
                    Lalit Maurya
                </h1>
            </div>

            <div class={`flex md:text-xl`}>
                <span class={`h-full flex items-center`}>
                    <p>Software Engineer</p>
                    {@render dotSvg()}
                </span>

                <a
                    href="https://en.wikipedia.org/wiki/Bengaluru"
                    target="_blank"
                    rel="noopener noreferrer"
                    class={`group flex items-center`}
                >
                    {@render mapPinSvg()}
                    <p class={`ml-1 dark:group-hover:text-white group-hover:scale-[1.05] group-hover:translate-x-1 transition-all duration-300`}>Bengaluru, India</p>
                </a>
            </div>

            <hr class={`my-2 dark:border-neutral-600 border-neutral-400`}/>

            <p class={`text-sm`}>A <Age /> year-old developer with a love for computer science, cooking, and music.</p>
        </hgroup>

        <ul transition:fly={{ x: '-100%' }} class={`flex md:justify-start justify-between md:gap-3 mt-3`}>
            {#each externalAnchors as anchor (anchor.id)}
                <a
                    class={`apply-card group flex items-center gap-2 px-3 py-2 rounded-lg md:text-base text-sm hover:scale-[1.03] active:scale-[0.99    ] transition-all duration-300`}
                    href={anchor.href}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {@render anchor.icon()}
                    <p>{anchor.display}</p>
                </a>
            {/each}
        </ul>
    {/if}
</div>

{#snippet mapPinSvg()}
    <svg class={`h-[24px] aspect-square stroke-2 dark:group-hover:stroke-white group-hover:stroke-[3] stroke-current fill-none transition-all duration-300 lucide lucide-map-pin-icon lucide-map-pin`} viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
        <circle cx="12" cy="10" r="3"/>
    </svg>
{/snippet}

{#snippet dotSvg()}
    <svg class={`h-[24px] aspect-square fill-none stroke-2 stroke-current lucide lucide-dot-icon lucide-dot`} viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12.1" cy="12.1" r="1"/>
    </svg>
{/snippet}

{#snippet linkedinSvg()}
    <svg class={`h-[24px] aspect-square dark:group-hover:stroke-[2.5] group-hover:stroke-[2.8] stroke-2 group-hover:stroke-sky-600 dark:stroke-neutral-400 stroke-neutral-800 transition-all duration-300 tabler-icon tabler-icon-brand-linkedin`} viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 11v5"/>
        <path d="M8 8v.01"/>
        <path d="M12 16v-5"/>
        <path d="M16 16v-3a2 2 0 1 0 -4 0"/>
        <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"/>
    </svg>
{/snippet}

{#snippet githubSvg()}
    <svg class={`h-[24px] aspect-square dark:group-hover:stroke-[2.5] group-hover:stroke-[2.8] stroke-2 dark:group-hover:stroke-neutral-50 dark:stroke-neutral-400 stroke-neutral-800 transition-all duration-300 tabler-icon tabler-icon-brand-github`} viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"/>
    </svg>
{/snippet}

{#snippet resumeSvg()}
    <svg class={`h-[24px] aspect-square dark:group-hover:stroke-[2.5] group-hover:stroke-[2.8] stroke-2 dark:group-hover:stroke-neutral-50 dark:stroke-neutral-400 stroke-neutral-800 fill-none transition-all duration-300 lucide lucide-file-user-icon lucide-file-user`} viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
        <path d="M15 18a3 3 0 1 0-6 0"/>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/>
        <circle cx="12" cy="13" r="2"/>
    </svg>
{/snippet}
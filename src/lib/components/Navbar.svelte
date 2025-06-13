<script lang="ts">
    import { page } from "$app/state";
    import toggleTheme from "$lib/directives/toggleTheme.svelte";
    import { DeviceStore, heroIntersecting, ThemeStore } from "$lib/stores/VisualStores";
    import { fly, slide } from "svelte/transition";

    let isMounted: boolean = $state(false);
    $effect(() => {
        isMounted = true;
    });

    const internalAnchors = [
        { id: 0, href: '/', display: 'Home'},
        { id: 1, href: '/projects', display: 'Projects'},
    ];

    const externalAnchors = [
        { id: 0, href: 'https://github.com/lalitm1004', ariaLabel: 'Github href', icon: githubSvg, },
        { id: 1, href: 'https://linkedin.com/in/lalitm1004', ariaLabel: 'LinkedIn href', icon: linkedinSvg, },
    ];

    let showScrollTop: boolean = $state(false);
    const scrollToTop = () => {
        window.scroll({ top: 0, behavior: 'smooth' });
    }

    let isMenuOpen: boolean = $state(false);
    const toggleMenu = () => isMenuOpen = !isMenuOpen;
</script>

<svelte:window onscroll={() => showScrollTop = window.scrollY > 100}/>

{#if $DeviceStore === 'desktop'}
    {#if isMounted}
        <nav
            transition:fly={{ y: '-100%', duration: 500 }}
            class={`fixed top-4 right-0 h-[40px] w-dvw flex justify-end items-center gap-3 px-4`}
        >
            {#if !$heroIntersecting}
                <ul
                    transition:slide={{ duration: 1000, axis: 'x' }}
                    class={`apply-card h-full flex items-center px-4 gap-3 rounded-full`}
                >
                    {#each externalAnchors as anchor (anchor.id)}
                        <a
                            href={anchor.href}
                            aria-label={anchor.ariaLabel}
                            target="_blank"
                            rel="noopener noreferrer"
                        >{@render anchor.icon()}</a>
                    {/each}
                </ul>
            {/if}

            <ul class={`apply-card h-full flex items-center px-5 gap-3 rounded-full`}>
                {#each internalAnchors as anchor (anchor.id)}
                    <a
                        data-currentpage={page.url.pathname === anchor.href}
                        class={`data-[currentpage="true"]:scale-[1.1] hover:scale-[1.0] scale-[0.9] data-[currentpage="true"]:font-bold data-[currentpage="true"]:cursor-default dark:data-[currentpage="true"]:text-neutral-50 dark:hover:text-neutral-50 dark:text-neutral-400 transition-all duration-200`}
                        href={anchor.href}
                    >{anchor.display}</a>
                {/each}
            </ul>

            <button
                use:toggleTheme
                class={`apply-card group cursor-pointer h-full aspect-square rounded-full grid place-items-center`}
                aria-label={`Toggle theme`}
            >
                {#if $ThemeStore === 'light'}
                    {@render moonSvg()}
                {:else}
                    {@render sunSvg()}
                {/if}
            </button>
        </nav>
    {/if}
{:else}
    {#if isMounted}
        <nav
            transition:fly={{ y: '-100%', duration: 500 }}
            class={`fixed top-4 right-4 h-[40px] w-dvw flex justify-end`}
        >
            <button
                onclick={() => toggleMenu()}
                class={`apply-card z-50 h-full px-4 rounded-lg`}
            >Menu</button>

            {#if isMenuOpen}
                <button
                    aria-label="Close menu"
                    onclick={() => toggleMenu()}
                    class={`z-40 fixed top-0 left-0 h-dvh w-dvw dark:bg-neutral-950/30 bg-neutral-400/30 backdrop-blur-sm`}
                ></button>

                <div
                    transition:slide
                    class={`apply-card z-50 fixed top-16 right-4 w-[180px] flex flex-col items-center py-4 rounded-lg`}
                >
                    <ul class={`w-full flex flex-col px-4 items-end gap-3 text-lg`}>
                        {#each internalAnchors as anchor (anchor.id)}
                            <a
                                data-currentpage={page.url.pathname === anchor.href}
                                class={`w-full text-right data-[currentpage="true"]:scale-[1.1] data-[currentpage="true"]:-translate-x-3 hover:scale-[1.0] scale-[0.9] data-[currentpage="true"]:font-bold data-[currentpage="true"]:cursor-default dark:data-[currentpage="true"]:text-neutral-50 dark:hover:text-neutral-50 dark:text-neutral-400 transition-all duration-200`}
                                aria-label={`${anchor.display.toLowerCase()}-href`}
                                href={anchor.href}
                            >{anchor.display}</a>
                        {/each}
                    </ul>

                    <hr class={`w-[90%] mt-4 border-neutral-400/40`}/>

                    <ul class={`w-full flex justify-around mt-4`}>
                        {#each externalAnchors as anchor (anchor.id)}
                            <a
                                href={anchor.href}
                                aria-label={anchor.ariaLabel}
                                target="_blank"
                                rel="noopener noreferrer"
                            >{@render anchor.icon(24)}</a>
                        {/each}

                        <button use:toggleTheme>
                            {#if $ThemeStore === 'light'}
                                {@render moonSvg(24)}
                            {:else}
                                {@render sunSvg(24)}
                            {/if}
                        </button>
                    </ul>
                </div>
            {/if}
        </nav>
    {/if}
{/if}

{#if showScrollTop}
    <button
        transition:fly={{ y: '100%' }}
        class={`apply-card group fixed bottom-4 right-4 h-[40px] aspect-square grid place-items-center rounded-full cursor-pointer`}
        onclick={() => scrollToTop()}
        aria-label={`Scroll to top`}
    >
        {@render arrowUpSvg()}
    </button>
{/if}

{#snippet moonSvg(size: number = 20)}
    <svg class={`h-[${size}px] aspect-square group-hover:stroke-[2.8] stroke-2 stroke-neutral-800 transition-all duration-300 lucide lucide-moon`} viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
{/snippet}

{#snippet sunSvg(size: number = 20)}
    <svg class={`h-[${size}px] aspect-square group-hover:stroke-[2.5] stroke-2 group-hover:stroke-neutral-50 stroke-neutral-400 transition-all duration-300 lucide lucide-sun`} viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" >
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2"/>
        <path d="M12 20v2"/>
        <path d="m4.93 4.93 1.41 1.41"/>
        <path d="m17.66 17.66 1.41 1.41"/>
        <path d="M2 12h2"/>
        <path d="M20 12h2"/>
        <path d="m6.34 17.66-1.41 1.41"/>
        <path d="m19.07 4.93-1.41 1.41"/>
    </svg>
{/snippet}

{#snippet arrowUpSvg(size: number = 20)}
    <svg class={`h-[${size}px] aspect-square fill-none group-hover:stroke-[3] stroke-neutral-800 dark:group-hover:stroke-[2.5] stroke-2 dark:group-hover:stroke-neutral-50 dark:stroke-neutral-400 transition-all duration-300 lucide lucide-arrow-up-icon lucide-arrow-up`} viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>
    </svg>
{/snippet}

{#snippet linkedinSvg(size: number = 20)}
    <svg class={`h-[${size}px] aspect-square dark:hover:stroke-[2.5] hover:stroke-[2.8] stroke-2 hover:stroke-sky-600 dark:stroke-neutral-400 stroke-neutral-800 transition-all duration-300 tabler-icon tabler-icon-brand-linkedin`} viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" >
        <path d="M8 11v5"/>
        <path d="M8 8v.01"/>
        <path d="M12 16v-5"/>
        <path d="M16 16v-3a2 2 0 1 0 -4 0"/>
        <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"/>
    </svg>
{/snippet}

{#snippet githubSvg(size: number = 20)}
    <svg class={`h-[${size}px] aspect-square dark:hover:stroke-[2.5] hover:stroke-[2.8] stroke-2 dark:hover:stroke-neutral-50 dark:stroke-neutral-400 stroke-neutral-800 transition-all duration-300 tabler-icon tabler-icon-brand-github`} viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"/>
    </svg>
{/snippet}
<script lang="ts">
    import { onNavigate } from "$app/navigation";
    import { page } from "$app/stores";
    import { isHeroIntersecting } from "$lib/shared/isHeroIntersecting.svelte";
    import { setTheme, theme } from "$lib/stores/themeStore";
    import { fade, slide } from "svelte/transition";

    let toggleThemeButtonDesktop: HTMLButtonElement;
    let toggleThemeButtonMobile: HTMLButtonElement | null = $state(null);

    const internalAnchors = [
        { id: 0, href: '/', display: 'Home'},
        { id: 1, href: '/projects', display: 'Projects'},
    ]

    const toggleTheme = () => {
        if (
            !(toggleThemeButtonDesktop || toggleThemeButtonMobile) ||
            !document.startViewTransition ||
            window.matchMedia('(prefers-reduced-motin: reduce)').matches
        ) {
            setTheme($theme === 'dark' ? 'light' : 'dark');
            return;
        }

        document.startViewTransition(async() => {
            setTheme($theme === 'dark' ? 'light' : 'dark');
        }).ready.then(() => {
            const currentButton = document.documentElement.dataset.device === 'desktop' ? toggleThemeButtonDesktop : toggleThemeButtonMobile!;
            const { top, left, width, height } = currentButton.getBoundingClientRect();
            const x = left + width / 2;
            const y = top + height / 2;
            const right = window.innerWidth - left;
            const bottom = window.innerHeight - top;
            const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${maxRadius}px at ${x}px ${y}px)`,
            ]

            document.documentElement.animate(
                {
                    clipPath
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    pseudoElement: '::view-transition-new(root)'
                }
            )
        })
    }

    let isMenuOpen: boolean = $state(false);
    const toggleMenuDisplay = () => {
        isMenuOpen = !isMenuOpen;
    }

    onNavigate(() => {
        isMenuOpen = false;
    })

    $effect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    })
</script>

<nav class={`fixed top-0 left-0 h-[40px] w-full z-30`}>
    <!-- desktop navbar -->
    <div class={`mobile:hidden h-full mt-4 px-4 flex flex-row justify-end items-center gap-3`}>
        <!-- external anchors -->
        {#if (!isHeroIntersecting.value || $page.url.pathname !== '/')}
            <div
                transition:slide={{ duration: 1000, axis: 'x'}}
                class={`apply-card h-full rounded-full flex items-center px-4 gap-4`}
            >
                <!-- linkedin -->
                <a

                    aria-label={`linkedin-href`}
                    href={`https://linkedin.com/in/lalitm1004`}
                    target="_blank"
                >
                    <svg class={`h-[20px] aspect-square dark:hover:stroke-[2.5] hover:stroke-[2.8] stroke-2 hover:stroke-sky-600 dark:stroke-neutral-400 stroke-neutral-800 transition-all duration-300 tabler-icon tabler-icon-brand-linkedin`} viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M8 11v5"/>
                        <path d="M8 8v.01"/>
                        <path d="M12 16v-5"/>
                        <path d="M16 16v-3a2 2 0 1 0 -4 0"/>
                        <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"/>
                    </svg>
                </a>

                <!-- github -->
                <a
                    aria-label={`github-href`}
                    href={`https://github.com/lalitm1004`}
                    target="_blank"
                >
                    <svg class={`h-[20px] aspect-square dark:hover:stroke-[2.5] hover:stroke-[2.8] stroke-2 dark:hover:stroke-neutral-50 dark:stroke-neutral-400 stroke-neutral-800 transition-all duration-300 tabler-icon tabler-icon-brand-github`} viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"/>
                    </svg>
                </a>
            </div>
        {/if}

        <!-- internal anchors -->
        <div
            class={`apply-card h-full rounded-full flex items-center px-5 gap-4`}
        >
            {#each internalAnchors as item (item.id)}
                <a
                    data-currentpage={$page.url.pathname === item.href}
                    class={`data-[currentpage="true"]:scale-[1.1] hover:scale-[1.0] scale-[0.9] data-[currentpage="true"]:font-bold data-[currentpage="true"]:cursor-default dark:data-[currentpage="true"]:text-neutral-50 dark:hover:text-neutral-50 dark:text-neutral-400 transition-all duration-200`}
                    aria-label={`${item.display.toLowerCase()}-href`}
                    href={item.href}
                >{item.display}</a>
            {/each}
        </div>

        <!-- theme toggle -->
        <button
            bind:this={toggleThemeButtonDesktop}
            class={`apply-card group h-full aspect-square rounded-full grid place-items-center`}
            aria-label="toggle-theme"
            onclick={() => toggleTheme()}
        >
            {#if $theme === 'light'}
                <svg class="h-[20px] aspect-square group-hover:stroke-[2.8] stroke-2 stroke-neutral-800 transition-all duration-300 lucide lucide-moon" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
            {:else}
                <svg class="h-[20px] aspect-square group-hover:stroke-[2.5] stroke-2 group-hover:stroke-neutral-50 stroke-neutral-400 transition-all duration-300 lucide lucide-sun" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" >
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
            {/if}
        </button>
    </div>

    <!-- mobile navbar -->
    <div class={`desktop:hidden mt-4 px-4 h-full flex justify-end`}>
        {#if isMenuOpen}
            <!-- screen effect -->
            <button transition:fade={{ duration: 100 }} aria-label={`exit-menu`} onclick={() => toggleMenuDisplay()} class={`absolute top-0 left-0 h-dvh w-dvw bg-neutral-950/70`}></button>
        {/if}

        <button
            data-menuopen={isMenuOpen}
            onclick={() => toggleMenuDisplay()} class={`apply-card rounded-xl grid place-items-center px-4 dark:data-[menuopen="true"]:bg-neutral-800/40 data-[menuopen="true"]:bg-neutral-50/80`}
        >
            Menu
        </button>

        {#if isMenuOpen}
            <div
                transition:slide
                data-menuopen={isMenuOpen}
                class={`absolute right-4 top-16 apply-card w-[180px] flex flex-col items-center rounded-xl py-3 dark:data-[menuopen="true"]:bg-neutral-800/40 data-[menuopen="true"]:bg-neutral-50/80`}
            >
                <!-- internal anchors -->
                <div
                    class={`w-[90%] flex flex-col items-center gap-4 px-2 text-lg`}
                >
                    {#each internalAnchors as item (item.id)}
                        <a
                            data-currentpage={$page.url.pathname === item.href}
                            class={`w-full text-right data-[currentpage="true"]:scale-[1.1] data-[currentpage="true"]:-translate-x-2 hover:scale-[1.0] scale-[0.9] data-[currentpage="true"]:font-bold data-[currentpage="true"]:cursor-default dark:data-[currentpage="true"]:text-neutral-50 dark:hover:text-neutral-50 dark:text-neutral-400 transition-all duration-200`}
                            aria-label={`${item.display.toLowerCase()}-href`}
                            href={item.href}
                        >{item.display}</a>
                    {/each}
                </div>

                <hr class={`w-[80%] mt-2 border-neutral-400/40`}/>

                <!-- external achors + theme toggle -->
                <div class={`w-[90%] mt-3 flex items-center justify-around`}>
                    <!-- linkedin -->
                    <a

                        aria-label={`linkedin-href`}
                        href={`https://linkedin.com/in/lalitm1004`}
                        target="_blank"
                    >
                        <svg class={`h-[25px] aspect-square dark:hover:stroke-[2.5] hover:stroke-[2.8] stroke-2 hover:stroke-sky-600 dark:stroke-neutral-400 stroke-neutral-800 transition-all duration-300 tabler-icon tabler-icon-brand-linkedin`} viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" >
                            <path d="M8 11v5"/>
                            <path d="M8 8v.01"/>
                            <path d="M12 16v-5"/>
                            <path d="M16 16v-3a2 2 0 1 0 -4 0"/>
                            <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"/>
                        </svg>
                    </a>

                    <!-- github -->
                    <a
                        aria-label={`github-href`}
                        href={`https://github.com/lalitm1004`}
                        target="_blank"
                    >
                        <svg class={`h-[25px] aspect-square dark:hover:stroke-[2.5] hover:stroke-[2.8] stroke-2 dark:hover:stroke-neutral-50 dark:stroke-neutral-400 stroke-neutral-800 transition-all duration-300 tabler-icon tabler-icon-brand-github`} viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"/>
                        </svg>
                    </a>

                    <!-- theme toggle -->
                    <button
                        bind:this={toggleThemeButtonMobile}
                        class={`group h-[25px] aspect-square rounded-full grid place-items-center`}
                        aria-label="toggle-theme"
                        onclick={() => toggleTheme()}
                    >
                        {#if $theme === 'light'}
                            <svg class="h-[25px] aspect-square group-hover:stroke-[2.8] stroke-2 stroke-neutral-800 transition-all duration-300 lucide lucide-moon" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" >
                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                            </svg>
                        {:else}
                            <svg class="h-[25px] aspect-square group-hover:stroke-[2.5] stroke-2 group-hover:stroke-neutral-50 stroke-neutral-400 transition-all duration-300 lucide lucide-sun" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" >
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
                        {/if}
                    </button>
                </div>
            </div>
        {/if}
    </div>
</nav>

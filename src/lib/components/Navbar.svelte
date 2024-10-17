<script lang="ts">
    import '$lib/styles/themeTransition.css';
    import { setTheme, theme } from "$lib/stores/themeStore";
    import { page } from '$app/stores';

    let themeToggle: HTMLButtonElement;
    const handleThemeClick = async () => {
        if (
            !themeToggle ||
            !document.startViewTransition ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            setTheme($theme === 'dark' ? 'light' : 'dark');
            return;
        }

        document.startViewTransition(async () => {
            setTheme($theme === 'dark' ? 'light' : 'dark');
        }).ready.then(() => {
            const { top, left, width, height } = themeToggle.getBoundingClientRect();
            const x = left + width / 2;
            const y = top + height / 2;
            const right = window.innerWidth - left;
            const bottom = window.innerHeight - top;
            const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${maxRadius}px at ${x}px ${y}px)`,
                    ]
                },
                {
                    duration: 400,
                    easing: 'ease-in-out',
                    pseudoElement: '::view-transition-new(root)',
                }
            );
        });
    }
</script>

<nav class={`z-50 fixed top-4 left-0 h-[45px] w-screen px-4 flex flex-row justify-end`}>
    <div class={`mobile:hidden flex flex-row gap-3 items-center`}>
        <div class={`h-full w-fit flex flex-row justify-center items-center px-4 gap-2 rounded-full border-2 border-neutral-700 bg-neutral-700/10 backdrop-blur-sm`}>
            {#each [
                { url: '/', display: 'Home'},
                { url: '/projects', display: 'Projects'},
            ] as item, index (index)}
                <a class={`${$page.url.pathname === item.url ? 'font-bold cursor-default' : 'hover:font-bold'}`} href={item.url}>{item.display}</a>
            {/each}
        </div>

        <div class={`h-full w-fit flex flex-row justify-center px-4 gap-2 rounded-full border-2 border-neutral-700 bg-neutral-700/10 backdrop-blur-sm`}>
            <!-- github -->
            <a class={`h-full aspect-square rounded-full grid place-items-center`} href="https://github.com/lalitm1004" target="_blank">
                <svg class={`h-[25px] aspect-square dark:stroke-neutral-600 dark:hover:stroke-neutral-300 stroke-neutral-950 stroke-[1.5] hover:stroke-[2.5] dark:hover:stroke-[1.5] transition-all duration-300`} viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 22.0268V19.1568C16.0375 18.68 15.9731 18.2006 15.811 17.7506C15.6489 17.3006 15.3929 16.8902 15.06 16.5468C18.2 16.1968 21.5 15.0068 21.5 9.54679C21.4997 8.15062 20.9627 6.80799 20 5.79679C20.4558 4.5753 20.4236 3.22514 19.91 2.02679C19.91 2.02679 18.73 1.67679 16 3.50679C13.708 2.88561 11.292 2.88561 8.99999 3.50679C6.26999 1.67679 5.08999 2.02679 5.08999 2.02679C4.57636 3.22514 4.54413 4.5753 4.99999 5.79679C4.03011 6.81549 3.49251 8.17026 3.49999 9.57679C3.49999 14.9968 6.79998 16.1868 9.93998 16.5768C9.61098 16.9168 9.35725 17.3222 9.19529 17.7667C9.03334 18.2112 8.96679 18.6849 8.99999 19.1568V22.0268"/>
                    <path d="M9 20.0267C6 20.9999 3.5 20.0267 2 17.0267"/>
                </svg>
            </a>

            <!-- linkedin -->
            <a class={`h-full aspect-square rounded-full grid place-items-center`} href="https://www.linkedin.com/in/lalitm1004/" target="_blank">
                <svg class={`h-[25px] aspect-square hover:stroke-sky-600 dark:stroke-neutral-600 stroke-neutral-950 dark:stroke-[1.5] stroke-[2] transition-all duration-200 tabler-icon tabler-icon-brand-linkedin`} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                    <path d="M8 11l0 5"/>
                    <path d="M8 8l0 .01"/>
                    <path d="M12 16l0 -5"/>
                    <path d="M16 16v-3a2 2 0 0 0 -4 0"/>
                </svg>
            </a>
        </div>

        <button bind:this={themeToggle} on:click={handleThemeClick} class={`group h-full aspect-square rounded-full grid place-items-center border-2 border-neutral-700 bg-neutral-700/10 backdrop-blur-sm`}>
            {#if ($theme === 'dark')}
                <svg class="lucide lucide-sun stroke-neutral-400 group-hover:stroke-neutral-200 transition-all duration-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v2"/><path d="M12 20v2"/>
                    <path d="m4.93 4.93 1.41 1.41"/>
                    <path d="m17.66 17.66 1.41 1.41"/>
                    <path d="M2 12h2"/>
                    <path d="M20 12h2"/>
                    <path d="m6.34 17.66-1.41 1.41"/>
                    <path d="m19.07 4.93-1.41 1.41"/>
                </svg>
            {:else}
                <svg class="lucide lucide-moon stroke-neutral-950 stroke-2 group-hover:stroke-[2.75] transition-all duration-100" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
            {/if}
        </button>
    </div>

    <!-- <div class={`desktop:hidden`}>

    </div> -->
</nav>
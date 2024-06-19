<script lang="ts">
    import { theme, setTheme } from "$lib/stores/themeStore";
    import { page } from "$app/stores";

    let switchThemeButton: HTMLButtonElement;

    const transitionTheme = async () => {
        if (
            !switchThemeButton ||
            !document.startViewTransition ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            setTheme($theme === 'dark' ? 'light' : 'dark');
            return;
        }

        document.startViewTransition(async () => {
            setTheme($theme === 'dark' ? 'light' : 'dark');
        }).ready.then(() => {
            const { top, left, width, height } = switchThemeButton.getBoundingClientRect();
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
                    duration: 1000,
                    easing: 'ease-in-out',
                    pseudoElement: '::view-transition-new(root)',
                }
            );
        });
    }
</script>

<nav class={`fixed top-4 right-2 flex gap-2 z-50`}>

    {#if ($page.status !== 404)}
        <div class={`backdrop-blur-sm bg-neutral-200/50 dark:bg-neutral-800/50 flex gap-2 md:gap-6 justify-center items-center border border-stone-800 dark:border-neutral-700 rounded-full px-4 md:px-8 py-2`}>        
            <a href="/" class={`nav-a-${$theme} ${$page.url.pathname === '/' && 'active'}`}>Home</a>
            <a href="/projects" class={`nav-a-${$theme} ${$page.url.pathname === '/projects' && 'active'}`}>Projects</a>
        </div>

        <div class={`backdrop-blur-sm bg-neutral-200/50 dark:bg-neutral-800/50 flex gap-2 md:gap-4 justify-center items-center border border-stone-800 dark:border-neutral-700 rounded-full px-4 md:px-4 py-2`}>
            <a href="https://github.com/lalitm1004" target="_blank">
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class={`github-${$theme}`}>
                    <path d="M16 22.0268V19.1568C16.0375 18.68 15.9731 18.2006 15.811 17.7506C15.6489 17.3006 15.3929 16.8902 15.06 16.5468C18.2 16.1968 21.5 15.0068 21.5 9.54679C21.4997 8.15062 20.9627 6.80799 20 5.79679C20.4558 4.5753 20.4236 3.22514 19.91 2.02679C19.91 2.02679 18.73 1.67679 16 3.50679C13.708 2.88561 11.292 2.88561 8.99999 3.50679C6.26999 1.67679 5.08999 2.02679 5.08999 2.02679C4.57636 3.22514 4.54413 4.5753 4.99999 5.79679C4.03011 6.81549 3.49251 8.17026 3.49999 9.57679C3.49999 14.9968 6.79998 16.1868 9.93998 16.5768C9.61098 16.9168 9.35725 17.3222 9.19529 17.7667C9.03334 18.2112 8.96679 18.6849 8.99999 19.1568V22.0268"/>
                    <path d="M9 20.0267C6 20.9999 3.5 20.0267 2 17.0267"/>
                </svg>
            </a>
            <a href="https://www.linkedin.com/in/lalitm1004/" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="linkedin">
                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                    <path d="M8 11l0 5"></path>
                    <path d="M8 8l0 .01"></path>
                    <path d="M12 16l0 -5"></path>
                    <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
                </svg>
            </a>
        </div>
    {/if}

    <div class={`backdrop-blur-sm bg-neutral-200/50 dark:bg-neutral-800/50 flex justify-center items-center border border-stone-900 dark:border-neutral-700 rounded-full overflow-hidden`}>
        <button bind:this={switchThemeButton} on:click={async () => await transitionTheme()} class={`grid place-items-center w-[40px] h-[40px]`}>
            {#if ($theme === "dark")}
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun">
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
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
            {/if}
        </button>
    </div>
</nav>

<style>
    svg {
        transition: all 200ms ease;
    }

    .lucide-sun:hover {
        stroke: white;
    }

    .lucide-moon:hover {
        stroke: black;
    }

    .github-dark:hover{
        stroke: white;
    }

    .github-light:hover {
        stroke-width: 2.5;
        stroke: black;
    }

    .linkedin:hover {
        stroke: #0072b1;
    }

    a {
        transition: all 200ms ease;
    }
    
    .active {
        font-weight: 600;
    }

    .active.nav-a-dark {
        color: white;
    }

    .active.nav-a-light {
        color: black;
    }

    .nav-a-light:hover {
        font-weight: 700;
        color: black;
    }

    .nav-a-dark:hover {
        color: white;
    }
</style>
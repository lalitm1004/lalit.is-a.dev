<script lang="ts">
    import '$lib/styles/transition.css';
    import { setTheme, theme } from "$lib/stores/themeStore";

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

<nav class={`z-50 fixed top-4 left-0 h-[40px] w-screen px-4 flex flex-row justify-end`}>
    <div class={`mobile:hidden`}>

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
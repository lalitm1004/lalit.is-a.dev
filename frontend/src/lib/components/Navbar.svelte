<script lang="ts">
    import { setTheme, theme } from "$lib/stores/themeStore";

    const toggleTheme = () => {
        setTheme($theme === 'light' ? 'dark' : 'light')
    }
</script>

<nav class={`fixed top-4 left-0 h-[40px] w-full px-4`}>
    <div class={`mobile:hidden h-full flex flex-row justify-end items-center`}>
        <button
            class={`apply-card group h-full aspect-square rounded-full grid place-items-center`}
            aria-label="toggle-theme"
            onclick={() => toggleTheme()}
        >   
            {#if $theme === 'light'}
                <svg class="h-[20px] aspect-square group-hover:stroke-[3] stroke-2 stroke-neutral-800 transition-all duration-300 lucide lucide-moon" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
            {:else}
                <svg class="h-[20px] aspect-square stroke-2 group-hover:stroke-neutral-50 stroke-neutral-400 transition-colors duration-300 lucide lucide-sun" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" >
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

</nav>

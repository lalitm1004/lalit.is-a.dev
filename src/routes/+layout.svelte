<script lang="ts">
    import "../app.css";
    import { onMount } from "svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import { setTheme } from "$lib/stores/themeStore";
    import Spotify from "$lib/components/Spotify.svelte";

    onMount(() => {
        // Setting color theme on load
        const themeCookie = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('theme='));
        if (!themeCookie) {
            if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                setTheme('light');
            } else {
                setTheme('dark');
            }
        } else {
            setTheme(themeCookie.split('=')[1] as Theme);
        }
    });
</script>

<svelte:head>
    <title>lalit</title>
    <meta name="description" content="The developer">
</svelte:head>

<div class={`relative dark:bg-neutral-900 bg-neutral-100 dark:text-zinc-400 text-zinc-800 tracking-tighter`}>
    <!-- <Spotify /> -->
    <Navbar />
    <slot/>
</div>
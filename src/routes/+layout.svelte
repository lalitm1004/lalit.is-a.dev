<script lang="ts">
    import '$lib/styles/tailwind.css';

    import Navbar from '$lib/components/Navbar.svelte';
    import { setTheme } from '$lib/stores/themeStore';
    import { onMount } from 'svelte';

    onMount(() => {
        // handle theme
        const cookie = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('theme='));
        if (!cookie) {
            if (window.matchMedia('(prefers-color-scheme: light)').matches) setTheme('light');
            else setTheme('dark');
        } else {
            const theme = cookie.split('=')[1];
            setTheme(theme as Theme)
        }

        // handle device
        const handleResize = () => {
            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            document.documentElement.dataset.isMobile = String(isMobile);
        }
        handleResize();
        window.onresize = handleResize;
    })
</script>

<Navbar />
<slot />

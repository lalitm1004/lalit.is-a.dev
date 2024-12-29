<script lang="ts">
    import Navbar from '$lib/components/Navbar.svelte';
    import { setDevice } from '$lib/stores/deviceStore';
    import { setTheme, theme } from '$lib/stores/themeStore';
    import { getCookie } from '$lib/utils/cookie';
    import { onMount } from 'svelte';

    import '$lib/styles/global.css';

    let { children } = $props();

    const handleResize = () => {
        setDevice(
            window.matchMedia('(max-width: 767px)').matches ?
            'mobile' : 'desktop'
        );
    }

    onMount(() => {
        // handle theme
        const themeCookie = getCookie(document.cookie, 'ld-theme') as Theme | null;
        if (themeCookie) theme.set(themeCookie);
        else if (window.matchMedia('(prefers-color-scheme: light)').matches) setTheme('light');
        else setTheme('dark');

        // handle device
        if (window.matchMedia('(max-width: 767px)').matches) setDevice('mobile');
        else setDevice('desktop');
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    });
</script>

<Navbar />
{@render children()}

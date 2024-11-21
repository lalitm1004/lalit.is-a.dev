<script lang="ts">
    import { device, setDevice } from '$lib/stores/deviceStore';
    import { setTheme, theme } from '$lib/stores/themeStore';
    import '$lib/styles/global.css';
    import { getCookie } from '$lib/utils/cookie';
    import { onMount } from 'svelte';
    
    let { children } = $props();

    onMount(() => {
        // handle theme
        const themeCookie = getCookie(document.cookie, 'ld-theme') as Theme | null;
        if (themeCookie) theme.set(themeCookie);
        else if (window.matchMedia('(prefers-color-scheme: light)').matches) setTheme('light');
        else setTheme('dark');

        // handle device
        const deviceCookie = getCookie(document.cookie, 'ld-device') as Device | null;
        if (deviceCookie) device.set(deviceCookie);
        else if (window.matchMedia('(max-width: 767px)').matches) setDevice('mobile');
        else setDevice('desktop');
    })
</script>

{@render children()}

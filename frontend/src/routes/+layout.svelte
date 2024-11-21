<script lang="ts">
    import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
    import '$lib/styles/global.css';
    
    let { children } = $props();
</script>

<ThemeSwitch />
{@render children()}

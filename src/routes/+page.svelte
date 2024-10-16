<script lang="ts">
    import { theme, setTheme } from "$lib/stores/themeStore";
</script>

<!-- <button on:click={() => setTheme($theme === 'light' ? 'dark' : 'light')}>
    Switch
</button> -->

<div class={`mobile:hidden`}>
    Desktop
</div>

<div class={`desktop:hidden`}>
    Mobile
</div>
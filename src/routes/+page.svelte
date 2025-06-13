<script>
    import { setTheme, ThemeStore } from "$lib/stores/VisualStores";
</script>

<button class={`h-[250px] aspect-square rounded-full bg-red-100`} onclick={() => setTheme($ThemeStore === 'dark' ? 'light' : 'dark')}>
    Toggle
</button>
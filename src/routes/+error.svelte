<script lang="ts">
    import { theme } from "$lib/stores/themeStore";
</script>

<div class={`h-screen w-screen flex flex-col justify-center items-center`}>
    <p class={`text-5xl mb-4`}>404</p>
    <a href="/" class={`bg-neutral-200/50 dark:bg-neutral-800/50 flex justify-center items-center border border-stone-900 dark:border-neutral-700 rounded-full px-6 py-2 a-${$theme === 'dark' ? 'dark' : 'light'}`}>
        go home
    </a>
</div>

<style>
    a {
        transition: all 200ms ease;
    }

    .a-dark:hover {
        color: white;
    }

    .a-light:hover {
        font-weight: 700;
        color: black;
    }
</style>
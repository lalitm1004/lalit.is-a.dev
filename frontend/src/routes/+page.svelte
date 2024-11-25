<svelte:head>
    <title>Lalit M</title>
    <meta name="description" content="A software engineer who is a little too obsessed with grids">
</svelte:head>

<script lang="ts">
    import Hero from "$lib/components/home/Hero.svelte";
</script>

<main class={`min-h-dvh w-dvw flex flex-col`}>
    <section class={`hero-page h-dvh w-full px-6 py-16`}>
        <Hero />
    </section>
</main>
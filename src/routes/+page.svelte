<svelte:head>
    <title>lalit</title>
    <meta name="description" content="me">
</svelte:head>

<script>
    import Hero from "$lib/components/Hero.svelte";
</script>

<main class={`min-h-dvh w-full flex flex-col items-center pt-24 px-20`}>
    <div class={`w-full flex flex-row`}>
        <Hero />
    </div>
</main>
<script lang="ts">
    import { setDevice } from '$lib/stores/VisualStores';
	import '$lib/styles/app.css';
    import { onMount } from 'svelte';

	let { children } = $props();

	const handleDevice = () => {
		setDevice(
			window.matchMedia("(max-width: 767px").matches
				? "mobile"
				: "desktop",
		);
	}

	onMount(() => {
		handleDevice();
	})
</script>

<svelte:window
	onresize={() => handleDevice()}
/>

{@render children()}

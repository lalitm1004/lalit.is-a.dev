<script lang="ts">
    import { ThemeStore, toggleTheme } from "$lib/stores/VisualStores";
    import { Button } from "bits-ui";

    let themeButton: HTMLButtonElement;

    const handleClick = async () => {
        alert("sex")
        if (
            !themeButton ||
            !document.startViewTransition ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            toggleTheme();
            return;
        }

        document.startViewTransition(async () => {
            toggleTheme();
        }).ready.then(() => {
            const { top, left, width, height } = themeButton.getBoundingClientRect();
            const x = left + width / 2;
            const y = top + height / 2;
            const right = window.innerWidth - left;
            const bottom = window.innerHeight - top;
            const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${maxRadius}px at ${x}px ${y}px)`,
            ];

            document.documentElement.animate({
                clipPath
            }, {
                duration: 1000,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)'
            });
        });
    }
</script>

<Button.Root onclick={() => handleClick()} bind:ref={themeButton} class={`bg-red-100`}>
    <p>Toggle</p>
</Button.Root>
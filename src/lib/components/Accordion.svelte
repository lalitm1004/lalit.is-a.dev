<script lang="ts">
    export let open:boolean = false;
    import { ChevronDown } from "lucide-svelte";
    import { slide } from "svelte/transition";

    let arrow: HTMLDivElement;

    const handleClick = () => {
        open = !open;
        let currentRotation: any = arrow.style.transform.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
        if (currentRotation === '') currentRotation = '0';
        currentRotation = parseFloat(currentRotation);
        currentRotation = currentRotation % 360;
        arrow.animate([
            { transform: `rotate(${currentRotation}deg)` },
            { transform: `rotate(${currentRotation + 180}deg)` },
        ], {
            duration: 100
        });
        arrow.style.transform = `rotate(${currentRotation + 180}deg)`;
    }


</script>

<div class={`accordion z-10 bg-neutral-200/50 dark:bg-neutral-800/50 border border-zinc-800 dark:border-0 rounded-xl py-2 px-2 my-2`}>
        <button on:click={handleClick} class={`header flex w-full items-center pl-1 justify-between text-xl md:text-2xl md:text-left text-center`}>
            <div>
                <slot name='head'/>
            </div>

            <div bind:this={arrow} class={``}>
                <svg xmlns="http://www.w3.org/2000/svg" width="35px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down">
                    <path d="m6 9 6 6 6-6"/>
                </svg>
            </div>
        </button>
    {#if (open)}
        <div class={`body md:pb-5`} transition:slide>
            <slot name='content'/>
        </div>
    {/if}
</div>
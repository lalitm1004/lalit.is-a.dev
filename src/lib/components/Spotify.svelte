<script lang="ts">
    import { onMount } from "svelte";

    let loading: boolean = true;
    let songName: string;
    let artistName: string;
    let imgUrl: string;
    let previewUrl: string | null = null;
    let playingNow: boolean;

    onMount(() => {
        const updateWidget = async() => {
            const updateResponse = await fetch("/api/getSpotifyDetails");
            const updateJson = await updateResponse.json();

            songName = updateJson.songName;
            artistName = updateJson.artistName;
            imgUrl = updateJson.imgUrl;
            previewUrl = updateJson.previewUrl;
            playingNow = updateJson.playingNow;
            loading = false;
        }
        if (window.matchMedia('(min-width: 768px)').matches) {
            updateWidget();
            const intervalId = setInterval(updateWidget, 5000);
            return () => clearInterval(intervalId);
        }
    });

    let songDetails: HTMLParagraphElement;
    const handleChangeInSongDetails = () => {
        if (songDetails) {
            songDetails.animate([
                { opacity: 1},
                { opacity: 0},
            ], {
                duration: 500,
                easing: 'linear',
                fill: 'forwards',
            })
            songDetails.innerText = `${songName} - ${artistName}`;
            songDetails.animate([
                { opacity: 0},
                { opacity: 1},
            ], {
                duration: 500,
                easing: 'linear',
                fill: 'forwards',
            })
        }
    }
    $: songName, handleChangeInSongDetails();
    $: artistName, handleChangeInSongDetails();
</script>

<div class={`absolute md:top-4 md:left-2 hidden  top-16 right-2 md:flex z-50 overflow-hidden`}>
    <div class={`backdrop-blur-sm bg-neutral-200/50 dark:bg-neutral-800/50 flex gap-x-2 justify-center items-center border border-stone-800 dark:border-neutral-700 rounded-full h-[40px]`}>
        {#if (loading)}
            <div class={`relative h-[40px] w-[40px] flex justify-center items-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-music-2">
                    <circle cx="8" cy="18" r="4"/>
                    <path d="M12 18V2l7 4"/>
                </svg>
                <svg aria-hidden="true" class="absolute h-[35px] animate-spin text-neutral-200/50 fill-neutral-800/50 dark:text-transparent dark:fill-neutral-200/50" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </div>
        {:else}
            <div class={`details flex  flex-row-reverse md:flex-row`}>
                <img src={imgUrl} alt={`${songName} album cover`} class={`ml-[2px] h-[35px] rounded-full border border-zinc-800 dark:border-neutral-700`}/>
                <div class={`song-details flex flex-col justify-center items-begin md:mr-4 md:ml-1 mr-1 ml-2`}>
                    {#if (playingNow)}
                        <p class={`text-[10px] ml-[1px] -mb-1 text-right md:text-left`}>currently playing</p>
                    {:else}
                        <p class={`text-[10px] -mb-1`}>Last played</p>
                    {/if}
                    <p bind:this={songDetails} class={`text-right md:text-left`}>{songName} - {artistName}</p>
                </div>
            </div>
        {/if}

    </div>
</div>

<style>
    @keyframes appear {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 100;
        }
    }

    .song-details {
        animation: appear 1s linear ;
    }
</style>
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
            console.log(songName)
        }
        updateWidget();
        // const intervalId = setInterval(updateWidget, 5000);
        // return () => clearInterval(intervalId);
    });


    // let audioPlayer: HTMLAudioElement;
    // let playingPreview: boolean = false;
    // $: handleClick = () => {
    //     if (previewUrl) {
    //         playingPreview ? audioPlayer.pause() : audioPlayer.play();
    //         playingPreview = !playingPreview;
    //     }
    // }

    // $: if (audioPlayer && previewUrl) {
    //     audioPlayer.volume = 0.3
    //     audioPlayer.src = previewUrl;
    //     audioPlayer.pause();
    //     playingPreview = false;
    //     audioPlayer.onended = () => {
    //         playingPreview = false;
    //     }
    // }
</script>

<div class={`fixed top-4 left-2 flex z-50`}>
    
    <div class={`backdrop-blur-sm bg-neutral-200/50 dark:bg-neutral-800/50 flex gap-2 md:gap-6 justify-center items-center border border-stone-800 dark:border-neutral-700 rounded-full px-2 py-2`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-music-2">
            <circle cx="8" cy="18" r="4"/>
            <path d="M12 18V2l7 4"/>
        </svg>
    </div>


</div>
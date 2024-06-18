<script lang="ts">
    export let src:string;
    export let href:string;
    export let title:string;
</script>

<div class={`h-[100px] w-[100px]  grid place-items-center`}>
    <a class={`relative flex flex-col items-center h-full`} href={href} target="_blank">
        <img class={`md:h-[100px] h-[70px]`} src={src} alt={`${title} icon`}/>
        <p class={`text-sm`}>{title}</p>
    </a>
</div>

<style>
    @keyframes fade-in {
        0% {
            transform: translate(0px, -10px);
            filter: blur(3px);
            opacity: 0;
        }
        100% {
            transform: translate(0px 0px);
            filter: blur(0px);
            opacity: 100;
        }
    }

    a {
        animation: fade-in 500ms linear forwards;
    }

</style>
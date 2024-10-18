<script>
    import Age from "./Age.svelte";
</script>

<div class={`md:w-1/2 w-full flex flex-col items-start`}>
    <div class={`font-lexend font-bold md:text-7xl text-5xl`}>
        <p>Hello! I am</p>
        <h1 id="name" class={`h-[65px] md:h-[85px]`}>Lalit Maurya</h1>
    </div>

    <p class={`w-full md:w-[80%]`}>
        Hi! I am a <Age/> year old developer with a love for exploring different fields of computer science,
        everything from web dev and AI to building a computer in minecraft! I am currently exploring reinforcement
        learning and its applications in optimal strategies for turn based games.
    </p>
</div>

<style>
    #name {
        background: linear-gradient(
            90deg,
            #E01B84,
            #1B3E96,
            #E01B84
        );
        background-size: 200%;
        background-clip: text;
        color: transparent;
        animation: pan-gradient 10s linear infinite;
    }

    @keyframes pan-gradient {
        0% {
            background-position: 0% center;
        }
        100% {
            background-position: -200% center;
        }
    }
</style>
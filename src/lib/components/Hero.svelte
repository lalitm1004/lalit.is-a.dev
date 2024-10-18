<script>
    import Age from "./Age.svelte";
</script>

<div class={`w-1/2 flex flex-col items-start`}>
    <div class={`font-lexend font-bold text-7xl`}>
        <p>Hello! I am</p>
        <h1 id="name">Lalit Maurya</h1>
    </div>

    <div class={`w-[80%]`}>
        <p>
            Hi! I am a <Age/> year old developer with a love for exploring different fields of computer science,
            everything from web deb and AI to building a computer in minecraft! I am currently exploring reinforcement
            learning and its applications in optimal strategies for turn based games.
        </p>
    </div>
</div>

<style>
    #name {
        height: 85px;
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
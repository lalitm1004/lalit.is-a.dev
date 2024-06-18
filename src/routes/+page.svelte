<script lang="ts">
    
    import { theme } from "$lib/stores/themeStore";

    // Age calculation
    const calculateAge = (): number => {
        const birthdate = new Date(2005, 3, 10);

        const today = new Date();
        let age = today.getFullYear() - birthdate.getFullYear();
        
        const monthDifference = today.getMonth() - birthdate.getMonth();
        const dayDifference = today.getDate() - birthdate.getDate();

        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            age--;
        }

        return age;
    }
    const age:number = calculateAge();

    let activeSkill: string = 'languages';


</script>

<div class={`min-h-screen w-full flex flex-col`}>

    <div class={`section-1 flex md:flex-row flex-col mt-20 md:mt-32 px-4`}>
        
        <div class={`intro flex flex-col w-full md:w-1/2`}>
            <p class={`roboto text-5xl md:text-8xl dark:text-white text-black mt-4`}>Hey there! I'm</p>
            <h1 class={`roboto magic text-5xl mt-2 md:text-8xl dark:text-white text-black h-20 md:h-28`}>Lalit Maurya</h1>
            <p class={`w-[90%] md:w-2/3  md:mt-2 -mt-4 mb-4`}>
                I'm a {age}-year-old software developer who loves to cook in his freetime!
                I have been coding since 2022 and have worked with a wide range of technologies!
            </p>
        </div>


        <div class={`skills w-full md:w-1/2 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-3xl flex flex-col py-2 px-4 border border-zinc-800 dark:border-neutral-700 mt-6 md:mt-0`}>
            <h2 class={`text-3xl roboto dark:text-white text-black text-center  md:text-right md:mr-4`}>Tools and Technologies</h2>
            <div class={`w-full bg-neutral-200 dark:bg-neutral-800 flex justify-between mt-2 rounded-full md:text-xl px-4 py-2`}>
                <button on:click={() => activeSkill = 'languages'} class={`skills-b-${$theme} ${activeSkill === 'languages' && 'active'} md:ml-4`}>languages</button>
                <button on:click={() => activeSkill = 'frameworks'} class={`skills-b-${$theme} ${activeSkill === 'frameworks' && 'active'}`}>frameworks</button>
                <button on:click={() => activeSkill = 'tools'} class={`skills-b-${$theme} ${activeSkill === 'tools' && 'active'} md:mr-4`}>tools</button>
            </div>
            <div class={`w-full bg-neutral-200 dark:bg-neutral-800 rounded-xl mt-2 mb-2`}>
                <div class={`languages grid-cols-6 grid-rows-2 grid place-items-center gap-y-8 gap-x-2 py-2`}>
                    <a href="/" target="_blank" class={``}><img class={`h-[80px]`} src="/python.png" alt="Python"/></a>
                    <a href="/" target="_blank" class={``}><img class={`h-[80px]`} src="/c.png" alt="C"/></a>
                    <a href="/" target="_blank" class={``}><img class={`h-[80px]`} src="/typescript.png" alt="Typescript"/></a>
                    <a href="/" target="_blank" class={``}><img class={`h-[80px]`} src="/html.png" alt="HTML"/></a>
                    <a href="/" target="_blank" class={``}><img class={`h-[80px]`} src="/css.png" alt="CSS"/></a>
                    <a href="/" target="_blank" class={``}><img class={`h-[80px]`} src="/js.png" alt="JavaScript"/></a>
                    <a href="/" target="_blank" class={``}><img class={`h-[80px]`} src="/sveltekit.png" alt="Sveltekit"/></a>
                    <a href="/" target="_blank" class={``}><img class={`h-[80px]`} src="/bash.png" alt="Bash"/></a>

                    <!-- tailwindcss react nextjs -->
                    <!-- django express.js node.js -->

                    <!-- git github vscode -->
                    <!-- npm postman vercel -->
                </div>
            </div>
        </div>

    </div>

    <!-- <div class={`section-2 pinned-projects flex-col`}>
        <div>
            intro to projects
        </div>
        <div class={`project-bundle flex md:flex-row flex-col`}>
            <div class={`subsection-2-1 memento-mori`}>project1</div>
            <div class={`subsection-2-1 skarj.pl`}>project2</div>
        </div>
    </div>

    <div class={`section-3 flex md:flex-row flex-col`}>
        <div class={`subsection-3-1 experience`}>experience</div>
        <div class={`subsection-3-2 contact`}>contact</div>
    </div> -->
</div>

<style>
    /* .intro {
        font-family: "Roboto-Bold";
    } */

    .roboto {
        font-family: "Roboto-Bold";
    }

    .magic {
        background: linear-gradient(
            90deg,
            #ED2788,
            #0F479F,
            #ED2788
        );
        background-size: 200%;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        animation: pan-bg 10s linear infinite;
    }
    
    .active {
        font-weight: 600;
    }

    .active.skills-b-dark {
        color: white;
    }

    .active.skills-b-light {
        color: black;
    }

    .skills-b-light:hover {
        font-weight: 700;
        color: black;
    }

    .skills-b-dark:hover {
        color: white;
    }
    
    @keyframes pan-bg {
        0% {
            background-position: 0% center;
        }
        100% {
            background-position: -200% center;
        }
    }
</style>
<script lang="ts">
    import Skills from "$lib/components/Skills.svelte";

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

<div class={`absolute top-0 left-0 h-48 w-full bg-dots fade-b`}></div>
<div class={`absolute bottom-0 left-0 h-48 w-full bg-dots fade-t`}></div>

<div class={`min-h-screen w-full flex flex-col`}>
    
    <div class={`section-1 flex flex-col mt-16 px-4 z-10`}>
        
        <div class={`intro flex flex-col w-full md:w-1/2 ml-4`}>
            <p class={`roboto text-5xl md:text-8xl dark:text-white text-black mt-4`}>Hello! I'm</p>
            <h1 class={`roboto magic text-5xl mt-2 md:text-8xl dark:text-white text-black h-20 md:h-28`}>Lalit Maurya</h1>
            <p class={`w-[90%] md:w-2/3  md:mt-2 -mt-4 mb-4`}>
                I'm a {age}-year-old software developer who loves to cook in his freetime!
                I have been coding since 2022 and have worked with a wide range of technologies!
            </p>
        </div>


        <Skills />

        <div class={`experience`}></div>
        <div class={`contact`}></div>
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
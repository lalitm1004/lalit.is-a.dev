<script>
    import Icon from "./Icon.svelte";

</script>


<div class={`relative skills w-full md:w-1/2 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-3xl flex flex-col justify-center py-4 px-4 border border-zinc-800 dark:border-neutral-700 mt-2 overflow-hidden`}>
    
    <div class={`absolute top-0 left-0 bg-dots h-24 w-full fade-b`}></div>

    <h2 class={`md:text-4xl text-3xl roboto dark:text-white text-black text-center md:text-left md:mr-4 z-10`}>Tools and Technologies</h2>

    <div class={`bg-neutral-200/50 dark:bg-neutral-800/50 border border-zinc-800 dark:border-0 rounded-xl z-10 mt-4 text-md md:text-2xl md:text-left text-center py-2 pl-4`}>
        Web Development
    </div>
    <div class={`grid md:grid-cols-5 grid-cols-3 place-items-center mt-2 md:mt-4 md:gap-y-10 gap-y-2`}>
        <Icon title='HTML' src='techIcons/html.png' href='https://developer.mozilla.org/en-US/docs/Web/HTML'/>
        <Icon title='CSS' src='techIcons/css.png' href='https://developer.mozilla.org/en-US/docs/Web/CSS'/>
        <Icon title='JavaScript' src='techIcons/js.png' href='https://developer.mozilla.org/en-US/docs/Web/JavaScript'/>
        <Icon title='TypeScript' src='techIcons/ts.png' href='https://www.typescriptlang.org/'/>
        <Icon title='SvelteKit' src='techIcons/sveltekit.png' href='https://kit.svelte.dev/'/>
        <Icon title='React' src='techIcons/react.png' href='https://react.dev/'/>
        <Icon title='Next.js' src='techIcons/nextjs.png' href='https://nextjs.org/'/>
        <Icon title='Tailwind CSS' src='techIcons/tailwind.png' href='https://tailwindcss.com/'/>
        <Icon title='Flask' src='techIcons/flask.png' href=''/>
        <Icon title='Django' src='techIcons/django.png' href='https://developer.mozilla.org/en-US/docs/Web/CSS'/>
    </div>
    
    <div class={`bg-neutral-200/50 dark:bg-neutral-800/50 border border-zinc-800 dark:border-0 rounded-xl z-10 md:mt-10 text-md md:text-2xl md:text-left text-center py-2 pl-4`}>
        Database
    </div>
    <div class={`grid md:grid-cols-5 grid-cols-3 md:grid-rows-2 grid-rows-2 place-items-center mt-2 md:mt-4 md:gap-y-10 gap-y-2`}>
        <Icon title='mongoDB' src='techIcons/mongodb.png' href='https://www.mongodb.com/'/>
        <Icon title='PostgreSQL' src='techIcons/postgresql.png' href='https://www.postgresql.org/'/>
    </div>

</div>
import { browser } from "$app/environment";
import { setTheme, ThemeStore } from "$lib/stores/VisualStores";
import type { Action } from "svelte/action";
import { get } from "svelte/store";

interface ToggleThemeConfig {
    durationMs ?: number;
};

const toggleTheme: Action<HTMLButtonElement, ToggleThemeConfig | undefined> = (node, config) => {
    const safeConfig = config ?? {};

    const handleClick = () => {
        if (!browser) return;

        if (
            !node ||
            !document.startViewTransition ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            setTheme(get(ThemeStore) === 'dark' ? 'light' : 'dark');
            return;
        }

        document.startViewTransition(async () => {
            setTheme(get(ThemeStore) === 'dark' ? 'light' : 'dark');
        }).ready.then(() => {
            const { top, left, width, height } = node.getBoundingClientRect();
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
                clipPath: clipPath,
            }, {
                duration: safeConfig.durationMs ?? 500,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)',
            });
        });
    }

    $effect(() => {
        node.addEventListener('click', handleClick);
        return () => node.removeEventListener('click', handleClick);
    });
}

export default toggleTheme;
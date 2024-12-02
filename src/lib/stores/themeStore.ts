import { browser } from "$app/environment";
import { writable } from "svelte/store";

const initialValue = browser ? window.localStorage.getItem('ld-theme') ?? 'dark' : 'dark';
const theme = writable<Theme>(initialValue as Theme);
const setTheme = (value: Theme) => {
    if (!browser) return

    document.documentElement.dataset.theme = value;
    document.cookie = `ld-theme=${value};path=/;max-age=${60 * 60 * 24 * 365}`;
    window.localStorage.setItem('ld-theme', value);
    theme.set(value);
}

export { theme, setTheme }
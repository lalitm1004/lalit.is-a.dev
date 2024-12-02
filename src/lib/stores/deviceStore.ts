import { browser } from "$app/environment";
import { writable } from "svelte/store";

const initialValue = browser ? window.localStorage.getItem('ld-device') ?? 'desktop' : 'desktop';
const device = writable<Device>(initialValue as Device);
const setDevice = (value: Device) => {
    if (!browser) return;

    document.documentElement.dataset.device = value;
    document.cookie = `ld-device=${value};path=/;max-age=${60 * 60 * 24 * 365}`;
    window.localStorage.setItem('ld-device', value);
    device.set(value);
}

export { device, setDevice }
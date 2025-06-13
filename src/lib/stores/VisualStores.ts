import createCookiePersistentStore from "$lib/utils/createCookiePersistentStore";
import { deviceCodec, themeCodec } from "$lib/utils/storeCodecs";
import { get } from "svelte/store";


const THEME_TOKEN_NAME = 'ld-theme';
const {
    store: ThemeStore, set: setTheme
} = createCookiePersistentStore<Theme>({
    tokenName: THEME_TOKEN_NAME,
    initialValue: 'dark',
    ...themeCodec
});

const toggleTheme = () => {
    setTheme(get(ThemeStore) === 'dark' ? 'light' : 'dark');
}

const DEVICE_TOKEN_NAME = 'ld-device';
const {
    store: DeviceStore, set: setDevice
} = createCookiePersistentStore<Device>({
    tokenName: DEVICE_TOKEN_NAME,
    initialValue: 'desktop',
    ...deviceCodec
})

export { THEME_TOKEN_NAME, ThemeStore, setTheme, toggleTheme };
export { DEVICE_TOKEN_NAME, DeviceStore, setDevice };
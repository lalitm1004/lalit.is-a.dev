import createCookiePersistentStore from "$lib/utils/createCookiePersistentStore";
import { deviceCodec, themeCodec } from "$lib/utils/storeCodecs";


const THEME_TOKEN_NAME = 'ld-theme';
const {
    store: ThemeStore, set: setTheme
} = createCookiePersistentStore<Theme>({
    tokenName: THEME_TOKEN_NAME,
    initialValue: 'dark',
    ...themeCodec
});

const DEVICE_TOKEN_NAME = 'ld-device';
const {
    store: DeviceStore, set: setDevice
} = createCookiePersistentStore<Device>({
    tokenName: DEVICE_TOKEN_NAME,
    initialValue: 'desktop',
    ...deviceCodec
})

export { THEME_TOKEN_NAME, ThemeStore, setTheme };
export { DEVICE_TOKEN_NAME, DeviceStore, setDevice };
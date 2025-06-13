export const themeCodec = {
    encode: (t: Theme) => {
        document.documentElement.dataset.theme = t;
        return t as string;
    },
    decode: (s: string) => s as Theme,
}

export const deviceCodec = {
    encode: (d: Device) => {
        document.documentElement.dataset.device = d;
        return d as string;
    },
    decode: (s: string) => s as Device,
}

import { DEVICE_TOKEN_NAME, THEME_TOKEN_NAME } from "$lib/stores/VisualStores";
import type { Handle } from "@sveltejs/kit";

const handleVisuals: Handle = async ({ event, resolve }) => {
    const response = await resolve(event, {
        transformPageChunk: ({ html }) => {
            const maxAge = 60 * 60 * 24 * 365;

            // handle theme
            let currentTheme = event.cookies.get(THEME_TOKEN_NAME);
            if (!currentTheme) {
                const userPrefersDark = event.request.headers.get('sec-ch-prefers-color-scheme') === 'dark';
                currentTheme = userPrefersDark ? 'dark' : 'light';

                event.cookies.set(THEME_TOKEN_NAME, currentTheme, {
                    path: '/',
                    expires: new Date(Date.now() + maxAge),
                    maxAge,
                    httpOnly: false,
                    sameSite: 'strict',
                });
            }

            // handle device
            let currentDevice = event.cookies.get(DEVICE_TOKEN_NAME);
            if (!currentDevice) {
                const userOnMobile = event.request.headers.get('sec-ch-ua-mobile') === '?1';
                currentDevice = userOnMobile ? 'mobile' : 'desktop';

                event.cookies.set(DEVICE_TOKEN_NAME, currentDevice, {
                    path: '/',
                    expires: new Date(Date.now() + maxAge),
                    maxAge,
                    httpOnly: false,
                    sameSite: 'strict',
                });
            }

            return html
                .replace('data-theme=""', `data-theme="${currentTheme}"`)
                .replace('data-device=""', `data-device="${currentDevice}"`)
        }
    });

    response.headers.set('Accept-CH', 'Sec-CH-Prefers-Color-Scheme, Sec-CH-UA-Mobile');
    response.headers.set('Vary', 'Sec-CH-Prefers-Color-Scheme, Sec-CH-UA-Mobile');
    response.headers.set('Critical-CH', 'Sec-CH-Prefers-Color-Scheme, Sec-CH-UA-Mobile');

    return response;
}

export default handleVisuals;
import { PUBLIC_ENVIRONMENT } from '$env/static/public';

export const handle = async ({ event, resolve }) => {
    const response = await resolve(event, {
        transformPageChunk: ({ html }) => {
            const maxAge = 60 * 60 * 24 * 365;

            // handle theme
            let currentTheme = event.cookies.get('ld-theme');
            if (!currentTheme) {
                const userPrefersDark = event.request.headers.get('sec-ch-prefers-color-scheme') === 'dark';
                currentTheme = userPrefersDark ? 'dark' : 'light';

                event.cookies.set('ld-theme', currentTheme, {
                    path: '/',
                    expires: new Date(Date.now() + maxAge),
                    maxAge,
                    httpOnly: false,
                    sameSite: 'strict',
                });
            }

            let currentDevice = event.cookies.get('ld-device');
            if (!currentDevice || PUBLIC_ENVIRONMENT === 'development') {
                const userOnMobile = event.request.headers.get('sec-ch-ua-mobile') === '?1';
                currentDevice = userOnMobile ? 'mobile' : 'desktop';

                event.cookies.set('ld-device', currentDevice, {
                    path: '/',
                    expires: new Date(Date.now() + maxAge),
                    maxAge,
                    httpOnly: false,
                    sameSite: 'strict',
                })
            }

            return html
                .replace('data-theme=""', `data-theme="${currentTheme}"`)
                .replace('data-device=""', `data-device="${currentDevice}"`);
        }
    });

    response.headers.set('Accept-CH', 'Sec-CH-Prefers-Color-Scheme, Sec-CH-UA-Mobile');
    response.headers.set('Vary', 'Sec-CH-Prefers-Color-Scheme, Sec-CH-UA-Mobile');
    response.headers.set('Critical-CH', 'Sec-CH-Prefers-Color-Scheme, Sec-CH-UA-Mobile');

    return response;
}
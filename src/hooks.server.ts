export const handle = async ({ event, resolve }) => {
    const response = await resolve(event, {
        transformPageChunk: ({ html }) => {
            // handle theme
            let currentTheme = event.cookies.get('theme');
            if (!currentTheme) {
                const userPrefersDark = event.request.headers.get('sec-ch-prefers-color-scheme') === 'dark';
                currentTheme = userPrefersDark ? 'dark' : 'light';

                const maxAge = 1000 * 60 * 60 * 24 * 365;

                event.cookies.set('theme', currentTheme, {
                    path: '/',
                    expires: new Date(Date.now() + maxAge),
                    maxAge,
                    httpOnly: false,
                    domain: new URL(event.request.url).hostname,
                    sameSite: 'strict',
                });
            }

            // handle device
            const isMobile = event.request.headers.get('sec-ch-ua-mobile') === '?1';

            return html
                .replace('data-theme=""', `data-theme="${currentTheme}"`)
                .replace('data-is-mobile=""', `data-is-mobile="${isMobile}"`)
        }
    });

    response.headers.set('Accept-CH', 'Sec-CH-Prefers-Color-Scheme, Sec-CH-UA-Mobile');
    response.headers.set('Vary', 'Sec-CH-Prefers-Color-Scheme, Sec-CH-UA-Mobile');
    response.headers.set('Critical-CH', 'Sec-CH-Prefers-Color-Scheme, Sec-CH-UA-Mobile');

    return response;
}
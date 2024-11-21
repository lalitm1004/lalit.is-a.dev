export const handle = async ({ event, resolve }) => {
    const response = await resolve(event, {
        transformPageChunk: ({ html }) => {
            // handle theme
            let currentTheme = event.cookies.get('ld-theme');
            if (!currentTheme) {
                const userPrefersDark = event.request.headers.get('sec-ch-prefers-color-scheme') === 'dark';
                currentTheme = userPrefersDark ? 'dark' : 'light';

                const maxAge = 60 * 60 * 24 * 365;
                event.cookies.set('ld-theme', currentTheme, {
                    path: '/',
                    expires: new Date(Date.now() + maxAge),
                    maxAge,
                    httpOnly: true,
                    sameSite: 'strict'
                });
            }

            return html
                .replace('data-theme=""', `data-theme="${currentTheme}"`)
        }
    });

    response.headers.set('Accept-CH', 'Sec-CH-Prefers-Color-Scheme');
    response.headers.set('Vary', 'Sec-CH-Prefers-Color-Scheme');
    response.headers.set('Critical-CH', 'Sec-CH-Prefers-Color-Scheme');

    return response;
}
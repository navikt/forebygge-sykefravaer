export const getMiljø = (): string => {
    const hostname = window.location.hostname;
    if (hostname === 'arbeidsgiver.nav.no') {
        return 'prod-sbs';
    }
    if (hostname.includes('dev') || hostname.includes('-q')) {
        console.log('Sentry environment: dev');
        return 'dev';
    }
    console.log('Sentry environment: local');
    return 'local';
};

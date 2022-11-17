export const getMiljø = (): string => {
    const hostname = window.location.hostname;
    if (hostname === 'arbeidsgiver.nav.no') {
        return 'prod-gcp';
    }
    if (hostname.includes('dev.nav.no')) {
        console.log('Sentry environment: dev');
        return 'dev-gcp';
    }
    console.log('Sentry environment: local');
    return 'local';
};

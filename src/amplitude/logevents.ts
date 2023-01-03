import amplitude from './amplitudeInstance';

const hrefKey = (href: Location) => href.toString();

export const logEvent = (eventName: string, data?: any) => {
    amplitude.logEvent(eventName, {app: 'forebygge-sykefravaer', ...data});
};

export const logNavigeringTilEksternSide = (
    event: React.MouseEvent<HTMLElement | MouseEvent>,
    href: Location | undefined
) => {
    event.preventDefault();
    if (!!href) {
        logNavigering(hrefKey(href))
        window.location = href;
    }
};

export const logNavigering = (destinasjon: string) => {
    const gjeldendeHrefUtenQuery = window.location.href.split('?')[0].split('#')[0];
    amplitude.logEvent('navigere', {
        destinasjon: destinasjon,
        url: gjeldendeHrefUtenQuery,
    });
};
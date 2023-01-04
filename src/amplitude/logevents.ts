import amplitude from './amplitudeInstance';

const hrefKey = (href: Location) => href.toString();

export const logEvent = (eventName: string, data?: any) => {
    amplitude.logEvent(eventName, { ...data });
};

export const logNavigeringTilEksternSide = (
    event: React.MouseEvent<HTMLElement | MouseEvent>,
    href: Location | undefined,
    lenketekst: string
) => {
    event.preventDefault();
    if (!!href) {
        logNavigering(hrefKey(href), lenketekst);
        window.location = href;
    }
};

export const logNavigering = (destinasjon: string, lenketekst: string) => {
    amplitude.logEvent('navigere', {
        destinasjon,
        lenketekst
    });
};
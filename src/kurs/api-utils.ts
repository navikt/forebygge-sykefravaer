export enum RestStatus {
    IkkeLastet = 'IkkeLastet',
    Suksess = 'Suksess',
    Feil = 'Feil',
}
export interface IkkeLastet {
    status: RestStatus.IkkeLastet;
}
export interface Suksess<T> {
    status: RestStatus.Suksess;
    data: T;
}

export interface Feil {
    status: RestStatus.Feil;
}

export type RestRessurs<T> =
    | IkkeLastet
    | Suksess<T>
    | Feil;

export const getRestStatus = (responseStatus: number): RestStatus => {
    switch (responseStatus) {
        case 200: {
            return RestStatus.Suksess;
        }
        default: {
            return RestStatus.Feil;
        }
    }
};

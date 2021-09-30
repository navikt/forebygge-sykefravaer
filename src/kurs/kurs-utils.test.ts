import {formatterKursdato, getNesteNettkurs} from './kurs-utils';
import {Kurs} from "./kurs-api";

const byggKurs = (
    id: string,
    tittel: string,
    start: Date,
    tema: string = 'Inkluderende arbeidsliv (IA)',
    type: string = 'Webinar'
): Kurs => {
    return {
        id: id,
        tittel: tittel,
        start: start,
        påmeldingsfrist: new Date(),
        slutt: new Date(),
        tema: tema,
        type: type
    }
}

describe('Tester for formatterKursdato', () => {
    test('Formatter kursdato som dd. MMM YYYY kl. HH.mm', () => {
        let date = new Date('2020-10-14T12:04:52.000Z');
        const kursdatoString = formatterKursdato(date);
        expect(kursdatoString).toBe('14. okt 2020 kl. 14.04');
    });

    test('tar hensyn til sommertid', () => {
        let date = new Date('2020-12-01T09:59:59.000Z');
        const kursdatoString = formatterKursdato(date);
        expect(kursdatoString).toBe('1. des 2020 kl. 10.59');
    });

    test("håndterer 'undefined'", () => {
        let date = undefined;
        const kursdatoString = formatterKursdato(date);
        expect(kursdatoString).toBe('');
    });
});

describe('getNesteNettkurs pluker ut neste tilgjengelig webinar for IA ut i fra en usortert, ufiltrert kursliste', () => {
    test('Neste kurs starter i fremtiden', () => {

        const kursliste: Kurs[] = [
            byggKurs("kurs#1", "Kurs som har gått ut på dato", new Date('2020-10-14T12:04:52.000Z')),
            byggKurs("kurs#2", "Kurs i fremtiden (2050)", new Date('2050-12-31T08:01:01.000Z'))
        ];
        const nesteNettKurs = getNesteNettkurs(kursliste);
        expect(nesteNettKurs?.tittel).toBe('Kurs i fremtiden (2050)');
    });

    test('Returnerer undefined dersom ingen kurs funnet', () => {

        const kursliste: Kurs[] = [
            byggKurs("kurs#1", "Kurs som har gått ut på dato", new Date('2020-10-14T12:04:52.000Z')),
        ];
        const nesteNettKurs = getNesteNettkurs(kursliste);
        expect(nesteNettKurs?.tittel).toBe(undefined);
    });

    test('Returnerer bare kurs som er av type webinar og tema IA', () => {
        const kursliste: Kurs[] = [
            byggKurs(
                "kurs#1",
                "Kurs for arbeidssøkere ",
                new Date('2050-12-31T08:01:01.000Z'),
                'Arbeidssøkeraktivitet'),
            byggKurs(
                "kurs#2",
                "IA Webinar",
                new Date('2050-12-31T08:01:01.000Z'),
                'Inkluderende arbeidsliv (IA)',
                'Webinar'
            ),
            byggKurs(
                "kurs#3",
                "Om hjelpemidler og tilrettelegging",
                new Date('2050-12-31T08:01:01.000Z'),
                'Hjelpemidler og tilrettelegging',
                'Webinar'
            ),
        ];
        const nesteNettKurs = getNesteNettkurs(kursliste);
        expect(nesteNettKurs?.tittel).toBe('IA Webinar');
    });

});


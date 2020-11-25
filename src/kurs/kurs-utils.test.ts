import { formatterKursdato } from './kurs-utils';

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

# Frontend for siden om forebygging av sykefravær

Siden gir informasjon til arbeidsgivere om hva NAV kan hjelpe til med i forbindelse med forebygging av sykefravær.

- Man kan endre og redigere tekster i [Sanity studio](https://forebygge-sykefravaer.sanity.studio/)
- Prosjektet administreres her: https://manage.sanity.io/projects/er31zvh0

# Komme i gang

- Legg Sanity-hemmeligheter i en fil som heter `.env` i prosjektet. Da lastes de automatisk inn som miljøvariabler. Filen er lagt med i `.gitignore`, så den blir ikke sjekket inn med git. Hemmelighetene trengs for å kunne hente tekster fra Sanity. Hemmenlighetene finnes i Vault under preprod/sbs.
- Installere avhengigheter: `yarn`
- Starte appen lokalt: Her har man flere muligheter, avhengig av hva man vil.
  1.  Kjøre opp utviklingserver med menylinje `yarn start`
  2.  Kjøre opp utviklingserver uten menylinje `yarn start-nomenu`
- Eventuelt starte appen med Node-serveren: `yarn build && yarn server`

## Relevante lenker

- Prosjektet administreres her: https://manage.sanity.io/projects/er31zvh0
- [Sanity studio](https://forebygge-sykefravaer.sanity.studio/) - det er her man endrer og publiserer tekster

---

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot:

- Malaz Alkoj, malaz.alkoj@nav.no
- Thomas Dufourd, thomas.dufourd@nav.no
- Lars Andreas Tveiten, lars.andreas.van.woensel.kooy.tveiten@nav.no

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #arbeidsgiver-teamia.

# Frontend for siden om forebygging av sykefravær

Siden gir informasjon til arbeidsgivere om hva NAV kan hjelpe til med i forbindelse med forebygging av sykefravær.

- Man kan endre og redigere tekster i [Sanity studio](https://forebygge-sykefravaer.sanity.studio/)
- Prosjektet administreres her: https://manage.sanity.io/projects/er31zvh0

# Komme i gang
**Viktig** Connect med Nais-device for å få tilgang til dekoratoren.dev.nav.no, ellers vil appen ikke starte

- Legg Sanity-hemmeligheter i en fil som heter `.env` i prosjektet. Da lastes de automatisk inn som miljøvariabler. Filen er lagt med i `.gitignore`, så den blir ikke sjekket inn med git. Hemmelighetene trengs for å kunne hente tekster fra Sanity. Hemmenlighetene finnes i Vault under preprod/sbs.
- Installere avhengigheter: `yarn` fra både rotmappen og mappen `/server`
- Starte appen lokalt: Her har man flere muligheter, avhengig av hva man vil.
  1.  Kjøre opp utviklingserver med menylinje `yarn start`
  2.  Kjøre opp utviklingserver uten menylinje `yarn start-nomenu`
- Eventuelt starte appen med Node-serveren: `yarn build && yarn server`
- Kjøre applikasjonen med Docker:
  1. `yarn install && yarn build`
  2. `docker build -t forebygge-sykefravaer .`
  3. `docker run -d -p 3000:3000 forebygge-sykefravaer`
  4. For å stoppe, kjør `docker stop <id>` med id-en fra forrige kommando

## Deploy

Master branch deployes automatisk til Prod.

Labs og/eller dev: Endre filen `.github/workflows/build-deploy.yml` ved stegene `deploy-to-dev` og/eller `deploy-to-labs` med navnet til branchen som skal deployes.

### Overgang til GCP
GCP clusters brukºer ikke Vault, da må secrets legges inn via `kubectl` som f.eks: 

```
kubectl create secret generic forebygge-sykefravaer-secrets \
--from-literal=SANITY_DATASET=********* \
--from-literal=SANITY_PROJECT_ID=*********** \
--from-literal=SANITY_CACHE_TTL=3 \
--from-literal=SANITY_CACHE_CHECK=1 \
--from-literal=VIMEO_TOKEN=*************************** \
--from-literal=DECORATOR_EXTERNAL_URL="https://www.nav.no/dekoratoren/?context=arbeidsgiver&redirectToApp=true&level=Level4&language=nb&breadcrumbs=" -n arbeidsgiver
```

## Relevante lenker

- Prosjektet administreres her: https://manage.sanity.io/projects/er31zvh0
- [Sanity studio](https://forebygge-sykefravaer.sanity.studio/) - det er her man endrer og publiserer tekster

### Lenker til applikasjon

- i prod: https://arbeidsgiver.nav.no/forebygge-sykefravaer
- i dev miljø: https://arbeidsgiver-gcp.dev.nav.no/forebygge-sykefravaer --trenger #naisdevice kjørende se https://doc.nais.io/device/install/ for info om det

---

# Henvendelser

## For Nav-ansatte
* Dette Git-repositoriet eies av [Team IA i Produktområde arbeidsgiver](https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Produktomr%C3%A5de-arbeidsgiver.aspx).
* Slack-kanaler:
  * [#arbeidsgiver-teamia-utvikling](https://nav-it.slack.com/archives/C016KJA7CFK)
  * [#arbeidsgiver-utvikling](https://nav-it.slack.com/archives/CD4MES6BB)
  * [#arbeidsgiver-general](https://nav-it.slack.com/archives/CCM649PDH)

## For folk utenfor Nav
* Opprett gjerne en issue i Github for alle typer spørsmål
* IT-utviklerne i Github-teamet https://github.com/orgs/navikt/teams/arbeidsgiver
* IT-avdelingen i [Arbeids- og velferdsdirektoratet](https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/arbeids-og-velferdsdirektoratet-kontorinformasjon)

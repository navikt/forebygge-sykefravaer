import { getRestStatus, RestRessurs, RestStatus } from "./api-utils";

const KURSOVERSIKT_API_PATH = "/kursoversikt/api/kurs";
const TMP_PATH = "https://arbeidsgiver.nav.no/kursoversikt/api/kurs"; // TODO Switch paths

interface KursDto {
  RegistrationID: number;
  Title: string;
  RegistrationUrl: string;
  RegistrationImageMediaStorageID: number;
  FrontImageMediaStorageID: number;
  CatalogListMediaStorageID: number | null;
  RegistrationFromDateTime: Date;
  RegistrationToDateTime: Date;
  RegistrationDeadline: Date;
  RegistrationPlaceName: string;
  DescriptionInternal: string;
  CatalogText: string;
  Description: string;
  FrontPageDescription: string;
  ActiveWeb: number;
  ShowRegistrationForm: number;
  ShowInActivityList: number;
  configurable_custom: {
    Fylke: string;
    "Type kurs": string;
    Tema: string;
  };
}

export interface Kurs {
  id: number;
  tema: string;
  type: string;
  tidspunkt: {
    fra: Date;
    til: Date;
    påmeldingsfrist: Date;
  };
}

export type RestKurs = RestRessurs<Kurs[]>;

const mapTilKurs = (kursDto: KursDto): Kurs => ({
  id: kursDto.RegistrationID,
  tema: kursDto.configurable_custom.Tema,
  type: kursDto.configurable_custom["Type kurs"],
  tidspunkt: {
    fra: kursDto.RegistrationFromDateTime,
    til: kursDto.RegistrationToDateTime,
    påmeldingsfrist: kursDto.RegistrationDeadline,
  },
});

export const hentKurs = async (): Promise<RestKurs> => {
  const response = await fetch(TMP_PATH);
  const restStatus = getRestStatus(response.status);

  if (restStatus === RestStatus.Suksess) {
    try {
      const kurs: Kurs[] = ((await response.json()) as KursDto[]).map(
        (kursDto) => mapTilKurs(kursDto)
      );

      return {
        status: RestStatus.Suksess,
        data: kurs,
      };
    } catch (error) {
      return { status: RestStatus.Feil };
    }
  }
  return { status: RestStatus.Feil };
};

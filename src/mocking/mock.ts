import fetchMock, {
  MockMatcher,
  MockOptionsMethodGet,
  MockRequest,
  MockResponse,
  MockResponseFunction,
} from "fetch-mock";
import { kurslisteMock } from "./kursliste";
import { KURSOVERSIKT_API_PATH } from "../kurs/kurs-api";

const mock = {
  kursliste: true,
};

const mockGetAndLog = (
  matcher: MockMatcher,
  response: MockResponse | MockResponseFunction,
  options?: MockOptionsMethodGet
): fetchMock.FetchMockStatic => {
  let responseFunction: MockResponseFunction;
  if (response instanceof Function) {
    responseFunction = (url: string, opts: MockRequest) => {
      const responseValue = response(url, opts);
      console.log("%c" + url, "color:lightblue;font-weight:bold;", {
        response: responseValue,
      });
      return responseValue;
    };
  } else {
    responseFunction = (url) => {
      console.log("%c" + url, "color:lightblue;font-weight:bold;", {
        response,
      });
      return response;
    };
  }
  return fetchMock.get(matcher, responseFunction, options);
};

if (mock.kursliste) {
  mockGetAndLog(KURSOVERSIKT_API_PATH, kurslisteMock);
}

fetchMock.spy();

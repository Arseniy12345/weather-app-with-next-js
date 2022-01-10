import axios from "axios";
import { testData } from "./test-data";

const HttpClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});

export const api = {
  getForecast(lat, lon) {
    return HttpClient.get(
      `onecall?lat=${lat}&lon=${lon}&exclude=${"minutely,alerts"}&units=metric&appid=${"fa27cbfcb730a9000e68b209c47b9aa2"}&lang=${"ru"}`
    );
  },
};

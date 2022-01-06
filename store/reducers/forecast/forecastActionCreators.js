import { forecastActionTypes } from "./forecastActionTypes";
import { api } from "../../../pages/api/api";
import { citiesCoordinates } from "../../../constants/cities-coordinates";
import { getCorrectForecasts } from "../../../utils";

const setIsError = () => ({
  type: forecastActionTypes.SET_IS_ERROR,
});

const setIsLoading = () => ({
  type: forecastActionTypes.SET_IS_LOADING,
});

const setCitiesForecast = (payload) => ({
  type: forecastActionTypes.SET_CITIES,
  payload,
});

export const getCitiesForecast = (nameCities) => async (dispatch, getState) => {
  dispatch(setIsLoading());

  const forecasts = [];
  for (const nameCity of nameCities) {
    if (getState().forecast.cities.find((city) => city.name === nameCity)) {
      continue;
    }

    const cityInfo = citiesCoordinates.find((city) => city.name === nameCity);
    if (!cityInfo) continue;
    const { lat, lon } = cityInfo;

    try {
      const response = await api.getForecast(lat, lon);
      forecasts.push({ name: nameCity, ...response });
    } catch (err) {
      dispatch(setIsError());
    }
  }

  if (forecasts.length) {
    const correctedForecasts = getCorrectForecasts(forecasts);
    dispatch(setCitiesForecast(correctedForecasts));
  } else {
    dispatch(setIsError());
  }
};

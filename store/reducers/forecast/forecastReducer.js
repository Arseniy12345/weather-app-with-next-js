import { forecastActionTypes } from "./forecastActionTypes";

const initialState = {
  cities: [],
  isLoading: true,
  isError: false,
};

export const forecastReducer = (state = initialState, action) => {
  switch (action.type) {
    case forecastActionTypes.SET_CITIES: {
      return {
        ...state,
        cities: [...state.cities, ...action.payload],
        isLoading: false,
        isError: false,
      };
    }
    case forecastActionTypes.SET_IS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case forecastActionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    default:
      return state;
  }
};

export const selectCitiesForecast = (nameCities) => (state) => {
  const forecasts = [];
  const {
    forecast: { cities, isLoading, isError },
  } = state;

  for (const nameCity of nameCities) {
    const cityForecast = cities.find((city) => city.name === nameCity);
    if (cityForecast) forecasts.push(cityForecast);
  }

  return { forecasts, isLoading, isError };
};

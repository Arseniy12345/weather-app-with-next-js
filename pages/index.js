import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Autocomplete, TextField, IconButton } from "@mui/material";
import { citiesCoordinates } from "../constants/cities-coordinates";
import { getCitiesForecast } from "../store/reducers/forecast/forecastActionCreators";
import { selectCitiesForecast } from "../store/reducers/forecast/forecastReducer";
import { worldCities } from "../constants/constants";
import { UI_CITY } from "../constants/routes";
import { WeatherCard } from "../components/WeatherCard";
import { Loader } from "../components/Loader";
import { getCorrectForecasts } from "../utils";
import { api } from "./api/api";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import s from "./styles/HomePage.module.css";

// При переходе по ссылке (localhost:3000/) с сервера возвращается готовый html.
// Эта страница собирается только при сборке проекта и хранится в готовом виде на сервере.
// Пересобирается каждые 15 минут. Можно отредактировать время в методе getStaticProps.
// При переходе на страницу с самого сайта - страница собирается/рендерится на клиенте.
export default function HomePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [selectedCity, setSelectedCity] = useState();

  const options = useMemo(() => citiesCoordinates.map((city) => city.name), []);

  const { forecasts, isLoading, isError } = useSelector(
    selectCitiesForecast(worldCities)
  );

  useEffect(() => {
    if (!forecasts?.length) {
      dispatch(getCitiesForecast(worldCities));
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Данные не найдены</div>;
  }

  if (!forecasts.length) {
    return <></>;
  }

  return (
    <div>
      <div className={s.HomePage__search}>
        <Autocomplete
          options={options}
          sx={{ width: 300 }}
          size="small"
          onChange={(e, value) => {
            setSelectedCity(value);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Введите название города" />
          )}
          disablePortal
        />
        <IconButton
          onClick={() => {
            router.push(`${UI_CITY}${selectedCity}`);
          }}
          disabled={!selectedCity}
        >
          <ArrowCircleRightRoundedIcon fontSize="large" />
        </IconButton>
      </div>
      <div className={s.HomePage__forecasts}>
        {forecasts.map((forecast) => (
          <WeatherCard
            key={forecast.name}
            forecast={forecast}
            onClick={() => {
              router.push(`${UI_CITY}${forecast.name}`);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const forecast = [];

  for (const worldCity of worldCities) {
    const cityInfo = citiesCoordinates.find((city) => city.name === worldCity);

    const { lat, lon } = cityInfo;

    try {
      const response = api.getForecast(lat, lon);
      forecast.push({ name: worldCity, ...response });
    } catch (err) {}
  }

  const initialReduxState = {
    forecast: {
      cities: getCorrectForecasts(forecast),
      isLoading: false,
      isError: false,
    },
  };

  return {
    props: {
      initialReduxState,
    },
    revalidate: 15 * 60, // Пересобирать страницу каждые 15 минут
  };
}

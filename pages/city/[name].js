import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCitiesForecast } from "../../store/reducers/forecast/forecastReducer";
import { getCitiesForecast } from "../../store/reducers/forecast/forecastActionCreators";
import { WeatherCard } from "../../components/WeatherCard";
import { WeatherDailyCard } from "../../components/WeatherDailyCard";
import { WeatherHourlyCard } from "../../components/WeatherHourlyCard";
import { Loader } from "../../components/Loader";
import { citiesCoordinates } from "../../constants/cities-coordinates";
import { getCorrectForecasts } from "../../utils";
import { api } from "../api/api";
import s from "../styles/City.module.css";

// Эта страница собирается на сервере при каждом переходе по ссылке (localhost:3000/city/[название города]). (SSR)
// При переходе с данного сайта на эту страницу - страница собирается на клиенте.
export default function City({ name }) {
  const dispatch = useDispatch();

  const { forecasts, isLoading, isError } = useSelector(
    selectCitiesForecast([name])
  );

  useEffect(() => {
    if (!forecasts.length) {
      dispatch(getCitiesForecast([name]));
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>{`Данные по "${name}" не найдены`}</div>;
  }

  if (!forecasts.length) {
    return <></>;
  }

  return (
    <div className={s.City}>
      <div className={s.City__cityName}>{`Погода в "${name}"`}</div>
      <div className={s.City__weather}>
        <WeatherCard forecast={forecasts[0]} isCityPage />
        <div className={s.City__weather_daily}>
          {forecasts[0].daily.map((day, index) => (
            <WeatherDailyCard key={index} day={day} />
          ))}
        </div>
      </div>
      <div className={s.City__weather_hourly}>
        <WeatherHourlyCard hourly={forecasts[0].hourly} />
      </div>
    </div>
  );
}

export async function getServerSideProps({ params: { name }, req }) {
  const isFirstServerCall = req?.url?.indexOf("/_next/data/") === -1;

  const cityInfo = citiesCoordinates.find((city) => city.name === name);

  if (!cityInfo) {
    return {
      props: {
        name,
        notFound: true,
      },
    };
  }

  // Если это первый запрос на сервер, то получаем данные о погоде и создаем состояние стора
  // Иначе возвращаем название города и предоставляем возможность компоненту самостоятельно получить данные
  if (isFirstServerCall) {
    const { lat, lon } = cityInfo;

    let forecast = null;

    try {
      const response = await api.getForecast(lat, lon);
      forecast = getCorrectForecasts([{ name, ...response.data }]);
    } catch (err) {
      return {
        props: {
          name,
        },
      };
    }

    const initialReduxState = {
      forecast: {
        cities: forecast,
        isLoading: false,
        isError: false,
      },
    };

    return {
      props: {
        name,
        initialReduxState,
      },
    };
  } else {
    return {
      props: {
        name,
      },
    };
  }
}

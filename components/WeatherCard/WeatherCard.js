import React from "react";
import Image from "next/image";
import { getTemp, getIconLink } from "../../utils";
import { CELSIUS } from "../../constants/chars";
import s from "./WeatherCard.module.css";

export const WeatherCard = ({ forecast, isCityPage = false, onClick }) => {
  const {
    name,
    temp,
    descriptionWeather,
    feelsTemp,
    windSpeed,
    windDeg,
    humidity,
    pressure,
    icon,
  } = forecast;

  return (
    <div className={s.WeatherCard} onClick={onClick}>
      <div>
        <span className={s.WeatherCard__cityName}>
          {isCityPage ? "Сегодня" : name}
        </span>
      </div>
      <div className={s.WeatherCard__temp}>
        <span className={s.WeatherCard__temp_current}>
          {`${getTemp(temp)}${CELSIUS}`}
        </span>
        <div style={{ width: "80px", height: "80px" }}>
          <Image
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
            loader={() => getIconLink(icon)}
            src={getIconLink(icon)}
            alt=""
            unoptimized
          />
        </div>
        <span className={s.WeatherCard__infoForecast}>
          {descriptionWeather}
          <br />
          {`Ощущается как ${getTemp(feelsTemp)}${CELSIUS}`}
        </span>
      </div>
      <div className={s.WeatherCard__description}>
        <div>
          <Image width={12} height={12} src="/wind.svg" alt="" />
          {` Ветер ${windSpeed} м/с, ${windDeg}`}
        </div>
        <div>
          <Image width={12} height={12} src="/humidity.svg" alt="" />
          {` Влажность ${humidity}%`}
        </div>
        <div>
          <Image width={12} height={12} src="/pressure.svg" alt="" />
          {` Давление ${pressure} мм рт. ст.`}
        </div>
      </div>
    </div>
  );
};

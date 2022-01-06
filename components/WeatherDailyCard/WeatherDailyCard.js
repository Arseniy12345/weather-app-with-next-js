import React from "react";
import Image from "next/image";
import { getTemp } from "../../utils";
import { CELSIUS } from "../../constants/chars";
import { getIconLink } from "../../utils";
import s from "./WeatherDailyCard.module.css";

export const WeatherDailyCard = ({ day }) => {
  const { infoDay, minTemp, maxTemp, icon, description } = day;

  return (
    <div className={s.WeatherDailyCard}>
      <span className={s.WeatherDailyCard__infoDay}>{infoDay}</span>
      <span className={s.WeatherDailyCard__description}>{description}</span>
      <div style={{ width: "20px", height: "20px" }}>
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
      <span className={s.WeatherDailyCard__temp}>{`${getTemp(
        maxTemp
      )}...${getTemp(minTemp)}${CELSIUS}`}</span>
    </div>
  );
};

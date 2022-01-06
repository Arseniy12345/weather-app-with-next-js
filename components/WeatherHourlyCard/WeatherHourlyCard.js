import React from "react";
import Image from "next/image";
import { getTemp } from "../../utils";
import { getIconLink } from "../../utils";
import s from "./WeatherHourlyCard.module.css";

export const WeatherHourlyCard = ({ hourly }) => {
  return (
    <div className={s.WeatherHourlyCard}>
      {hourly.map(({ temp, icon, time }, index) => (
        <div key={index} className={s.WeatherHourlyCard__hour}>
          <span>{time}</span>
          <div style={{ width: "40px", height: "40px" }}>
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
          <span>{getTemp(temp)}</span>
        </div>
      ))}
    </div>
  );
};

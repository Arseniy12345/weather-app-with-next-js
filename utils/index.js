const getDescriptionWeather = (description) =>
  description[0].toUpperCase() + description.slice(1);

const getWindDeg = (deg) => {
  switch (true) {
    case deg < 25 || deg > 335:
      return "С";
    case deg < 65:
      return "СВ";
    case deg < 115:
      return "В";
    case deg < 155:
      return "ЮВ";
    case deg < 205:
      return "Ю";
    case deg < 245:
      return "ЮЗ";
    case deg < 295:
      return "З";
    default:
      return "СЗ";
  }
};

const getInfoDay = (dayInWeek, dayInMonth, month) => {
  let dayName = "";
  switch (dayInWeek) {
    case 0:
      dayName = "Воскресенье";
      break;
    case 1:
      dayName = "Понедельник";
      break;
    case 2:
      dayName = "Вторник";
      break;
    case 3:
      dayName = "Среда";
      break;
    case 4:
      dayName = "Четверг";
      break;
    case 5:
      dayName = "Пятница";
      break;
    case 6:
      dayName = "Суббота";
      break;
  }

  let monthName = "";
  switch (month) {
    case 0:
      monthName = "январь";
      break;
    case 1:
      monthName = "февраль";
      break;
    case 2:
      monthName = "март";
      break;
    case 3:
      monthName = "апрель";
      break;
    case 4:
      monthName = "май";
      break;
    case 5:
      monthName = "июнь";
      break;
    case 6:
      monthName = "июль";
      break;
    case 7:
      monthName = "август";
      break;
    case 8:
      monthName = "сентябрь";
      break;
    case 9:
      monthName = "октябрь";
      break;
    case 10:
      monthName = "ноябрь";
      break;
    case 11:
      monthName = "декабрь";
      break;
  }

  return `${dayName}, ${dayInMonth} ${monthName}`;
};

const getDailyForecast = (dailyData) => {
  const date = new Date();

  const daily = [];

  for (let i = 1; i < 6; i++) {
    date.setDate(date.getDate() + 1);

    const dailyItem = dailyData[i];

    daily.push({
      infoDay: getInfoDay(date.getDay(), date.getDate(), date.getMonth()),
      minTemp: Math.round(dailyItem.temp.min),
      maxTemp: Math.round(dailyItem.temp.max),
      icon: dailyItem.weather[0].icon,
      description: getDescriptionWeather(dailyItem.weather[0].description),
    });
  }

  return daily;
};

const getHourlyForecast = (hourlyData) => {
  const hourly = [];

  const currentHour = new Date().getHours();

  for (let i = currentHour; i < 48; i++) {
    const hourlyItem = hourlyData[i];

    hourly.push({
      temp: Math.round(hourlyItem.temp),
      icon: hourlyItem.weather[0].icon,
      time: i === currentHour ? "Сейчас" : getTime(i),
    });
  }

  return hourly;
};

const getTime = (num) => {
  switch (true) {
    case num < 10:
      return `0${num}:00`;
    case num < 24:
      return `${num}:00`;
    case num < 34:
      return `0${num - 24}:00`;
    default:
      return `${num - 24}:00`;
  }
};

export const getTemp = (temp) => {
  return `${temp > 0 ? "+" : ""}${temp.toString()}`;
};

export const getCorrectForecasts = (forecasts) => {
  const correctedForecasts = [];

  for (const forecast of forecasts) {
    const {
      current: {
        temp,
        weather,
        feels_like,
        wind_speed,
        wind_deg,
        humidity,
        pressure,
      },
      daily,
      hourly,
    } = forecast;

    correctedForecasts.push({
      name: forecast.name,
      temp: Math.round(temp),
      descriptionWeather: getDescriptionWeather(weather[0].description),
      feelsTemp: Math.round(feels_like),
      windSpeed: Math.round(wind_speed),
      windDeg: getWindDeg(wind_deg),
      humidity: humidity,
      pressure: Math.round(0.75 * pressure),
      icon: weather[0].icon,
      daily: getDailyForecast(daily),
      hourly: getHourlyForecast(hourly),
    });
  }

  return correctedForecasts;
};

export const getIconLink = (iconId) =>
  `http://openweathermap.org/img/wn/${iconId}@2x.png`;

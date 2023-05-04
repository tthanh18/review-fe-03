import { React, useState, useLayoutEffect } from "react";
import axios from "axios";
import styles from "./Home.module.scss";
import clsx from "clsx";
import imgSunny from "../../icons/sunny.png";
import imgHum from "../../icons/humidity.png";
import imgWind from "../../icons/wind.png";
import imgTemp from "../../icons/temperature.png";
import imgMoon from "../../icons/moon.png";
import bgMorning from "../../assets/bg_morning.png";
import bgNight from "../../assets/bg_night.png";

function Home() {
    const [time, setTime] = useState({ hours: new Date().getHours(), minutes: new Date().getMinutes() });
    const [humidity, setHumidity] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [temp, setTemp] = useState({});
    useLayoutEffect(() => {
        const intervalId = setInterval(() => {
            const date = new Date();
            setTime({ hours: date.getHours(), minutes: date.getMinutes() });
        }, 1000);
        const getData = async () => {
            try {
                const res = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=Ho+Chi+Minh+City&units=metric&appid=26802e96d8e7dee3afae7cdcfad89a98");

                console.log("weather ", res.data);
                setSpeed(res.data.wind.speed);
                setHumidity(res.data.main.humidity);
                setTemp({ temp: res.data.main.temp, temp_max: res.data.main.temp_max, temp_min: res.data.main.temp_min });
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);
    return (
        <div className={styles.home} style={{
            backgroundImage: time.hours > 0 && time.hours < 18 ? `url(${bgMorning})` : `url(${bgNight})`,
        }}>
            <div className={clsx("row pt-1", styles.home__header)} >
                <div className={clsx("col-4", styles.header__wifi)}>
                    <i className={clsx("fa-solid fa-circle", styles.wifi__circle)}></i>
                    <i className={clsx("fa-solid fa-circle", styles.wifi__circle)}></i>
                    <i className={clsx("fa-solid fa-circle", styles.wifi__circle)}></i>
                    <i className={clsx("fa-solid fa-circle", styles.wifi__circle)}></i>
                    <i className={clsx("fa-solid fa-circle", styles.wifi__circle)}></i>
                    <i className="fa-solid fa-wifi"></i>
                </div>
                <div className={clsx("col-4 text-center", styles.header__time)}>
                    {time.hours > 9 ? time.hours : "0" + time.hours}:{time.minutes > 9 ? time.minutes : "0" + time.minutes} {time.hours >= 0 && time.hours < 13 ? "AM" : "PM"}
                </div>
                <div className={clsx("col-4 text-end", styles.header__pin)}>
                    <div>100%</div>
                    <div><i className="fa-sharp fa-solid fa-battery-full"></i></div>

                </div>
            </div>
            <div className={clsx("row mt-4", styles.home__weather)}>
                <div className={clsx(styles.home__temp)}>
                    <div className={clsx(styles.text_temperature)}>{temp.temp}<span>&deg;C</span></div>
                    <div className={clsx(styles.city)}>TP Hồ Chí Minh</div>
                </div>
                <div className={clsx("text-end", styles.weather)}>
                    <img src={time.hours > 0 && time.hours < 18 ? imgSunny : imgMoon}></img>
                    <div className={clsx(styles.condition)}>{time.hours > 0 && time.hours < 18 ? "Sunny" : "Clear"}</div>
                </div>
            </div>
            <div className={clsx("mt-4 d-flex", styles.home__content)}>
                {time.hours >= 0 && time.hours < 13 ? "GOOD MORNING!!!" : time.hours >= 13 && time.hours < 18 ? "GOOD AFTERNOON!!!" : "GOOD NIGHT!!!"}
            </div>
            <div className={clsx("d-flex pt-1 mx-5", styles.home__bar)} >
                <div className={clsx("", styles.bar__hum)}>
                    <img src={imgHum}></img>
                    <span>{humidity}%</span>
                </div>
                <div className={clsx("", styles.bar__temp)}>
                    <img src={imgTemp}></img>
                    <span>{temp.temp_max}&deg;C {temp.temp_min}&deg;C</span>
                </div>
                <div className={clsx("", styles.bar__wind)}>
                    <img src={imgWind}></img>
                    <span>{speed} m/s</span>
                </div>
            </div>
        </div>
    )
}

export default Home;
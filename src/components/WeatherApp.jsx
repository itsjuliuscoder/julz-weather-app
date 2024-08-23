import sunny from '../assets/images/sunny.png';
import cloud from '../assets/images/cloudy.png';
import snowy from '../assets/images/snowy.png';
import rainy from '../assets/images/rainy.png';

import "./WeatherApp.css";

const WeatherApp = () => {

    const apiKey = "c99230b8f50f1c2eba147c15b8bf4446";

    const search = () => {
        const url =  `https://api.openweathermap.org/data/2.5/weather?q=London&appid=c99230b8f50f1c2eba147c15b8bf4446`;
    }

    return (
        <div className="container">
            <div className="weather-app">
                <div className="search">
                    <div className="search-top">
                        <i className="fa-solid fa-location-dot"></i>
                        <div className="location">London</div>
                    </div>
                    <div className="search-bar">
                        <input type="text" name="" placeholder="Enter Location" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div className="weather">
                    <img src={sunny} alt="sunny" />
                    <div className="weather-type">Clear</div>
                    <div className="temp">28°</div>
                </div>
                <div className="weather-date">
                    <p>Fri, 23 May</p>
                </div>
                <div className="weather-data">
                    <div className="humidity">
                        <div className="data-name">Humidity</div>
                        <i className="fa-solid fa-droplet"></i>
                        <div className="data">35%</div>
                    </div>
                    <div className="wind">
                        <div className="data-name">Wind</div>
                        <i className="fa-solid fa-wind"></i>
                        <div className="data">3km/h</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp
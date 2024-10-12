import sunny from '../assets/images/sunny.png';
import cloudy from '../assets/images/cloudy.png';
import snowy from '../assets/images/snowy.png';
import rainy from '../assets/images/rainy.png';
import { useState, useEffect } from "react";
import "./WeatherApp.css";
import loadingGif from '../assets/images/loading.gif';
import moment from "moment";


const WeatherApp = () => {

    useEffect(() => {
        const fetchDefaultWeather = async () => {
            setLoading(true)
            const defaultLocation = "Abuja";

            const url =  `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&&appid=${apiKey}`;
            const res = await fetch(url);
            const defaultData = await res.json();
            setData(defaultData);
            setLoading(false);
        } 
        fetchDefaultWeather()
    }, []);

    const [data, setData] = useState([]);
    const [location, setLocation] = useState();
    const [loading, setLoading] = useState(false);

    const apiKey = "c99230b8f50f1c2eba147c15b8bf4446";

    const handleInputChange = (e) => {
        setLocation(e.target.value);
    }   

    const search = async () => {

        if(location.trim() != ""){
            const url =  `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&&appid=${apiKey}`;

            const response = await fetch(url);
            const searchData = await response.json();
            console.log("this is the search data", searchData);
            if(searchData.cod !== 200){
                setData({notFound: true})
            } else {
                setData(searchData);
                setLocation("");
            }
            setLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter"){
            search();
        }
    }

    const weatherImages = {
        Clear: sunny,
        Clouds: cloudy,
        Rain: rainy,
        Snow: snowy,
        Haze: cloudy, 
        Mist: cloudy,
    }

    const weatherImage = data.weather ? weatherImages[data.weather[0].main] : null;

    const backgroundImages = {
        Clear: 'linear-gradient(to right, #f3b07c, #fcd283)',
        Clouds: 'linear-gradient(to right, #57d6d4, #71eeec)',
        Rain: 'linear-gradient(to right, #5bc8fb, #80eaff)',
        Snow: 'linear-gradient(to right, #aff2ff, #fff)',
        Haze: 'linear-gradient(to right, #57d6d4, #71eeec)',
        Mist: 'linear-gradient(to right, #57d6d4, #71eeec)'
    }

    const backgroundImage = data.weather ? backgroundImages[data.weather[0].main] : 'linear-gradient(to right, #f3b07c, #fcd283)'; 

    const currentDateTime = moment().format('ddd, DD MMM');


    return (
        <div className="container" style={{ backgroundImage }}>
            <div className="weather-app" style={{ backgroundImage: backgroundImage && backgroundImage.replace ? backgroundImage.replace("to right", "to top") : null}}>
                <div className="search">
                    <div className="search-top">
                        <i className="fa-solid fa-location-dot"></i>
                        <div className="location">{data.name}</div>
                    </div>
                    <div className="search-bar">
                        <input 
                            type="text" 
                            name="" 
                            value={location} 
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown} 
                        />
                        <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
                    </div>
                </div>
                {loading ? (<img className="loader" src={loadingGif} alt="loading" />) : data.notFound ? (<div className="not-found">Not Found ☹️</div>) : (
                    <>
                        <div className="weather">
                            <img src={weatherImage} alt="sunny" />
                            <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
                            <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°` : null}</div>
                        </div>
                        <div className="weather-date">
                            <p>{currentDateTime}</p>
                        </div>
                        <div className="weather-data">
                            <div className="humidity">
                                <div className="data-name">Humidity</div>
                                <i className="fa-solid fa-droplet"></i>
                                <div className="data">{data.main ? data.main.humidity : null}%</div>
                            </div>
                            <div className="wind">
                                <div className="data-name">Wind</div>
                                <i className="fa-solid fa-wind"></i>
                                <div className="data">{data.wind ? data.wind.speed : null}km/h</div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default WeatherApp
import React, { useState } from "react";
import axios from 'axios';
import './css/style.css';
import img from './images/clouds.png'
import img1 from './images/clear.png'
import img2 from './images/drizzle.png'
import img3 from './images/rain.png'
import img4 from './images/snow.png'
function App() {
  const [city, setcity] = useState("");
  const [data1, setdata] = useState([])
  const payload = {
    cityname: city
  }
  function handlesubmit() {
    const container = document.querySelector('.container');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetails = document.querySelector('.weather-details');
    const error404 = document.querySelector('.not-found');
    if (city === '')
      return;

    axios.post("http://localhost:8080/", payload).then((res) => {
      console.log(res.data)
      setdata(res.data);
      if (res.data.temp === 0) {
        container.style.height = '430px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }
      else {
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        switch (res.data.situation) {
          case 'Clear':
            image.src = img1;
            break;

          case 'Rain':
            image.src = img3;
            break;

          case 'Snow':
            image.src = img4;
            break;

          case 'Clouds':
            image.src = img;
            break;

          case 'Haze':
            image.src = img2;
            break;

          default:
            image.src = '';
        }

        temperature.innerHTML = `${res.data.temp}<span>°C</span>`;
        description.innerHTML = `${res.data.situation}`;
        humidity.innerHTML = `${res.data.humidity}%`;
        wind.innerHTML = `${res.data.wind_speed}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        container.style.height = '590px';
      }
    })
  }
  return <>
    <div className="container">
      <div className="search-box">
        <i className="fa-solid fa-location-dot"></i>
        <input type="text" placeholder="Enter your location" value={city} onChange={(e) => setcity(e.target.value)} />
        <button className="fa-solid fa-magnifying-glass" onClick={handlesubmit}></button>
      </div>

      <div className="not-found">
        <img src={img} alt="1" />
        <p>Oops! Invalid location :/</p>
      </div>

      <div className="weather-box">
        <img src={img} alt="2" />
        <p className="temperature"></p>
        <p className="description"></p>
      </div>

      <div className="weather-details">
        <div className="humidity">
          <i className="fa-solid fa-water"></i>
          <div className="text">
            <span></span>
            <p>Humidity</p>
          </div>
        </div>
        <div className="wind">
          <i className="fa-solid fa-wind"></i>
          <div className="text">
            <span></span>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>

    </div>
  </>;
}

export default App;

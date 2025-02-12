import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async (e) => {
    e.preventDefault();
    if (city) {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=eec7c10d56e53f6bddef2d04904bf65e`);
        const data = await response.json();
        setWeather(data);
        
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
    setCity('');
  };

  const kelvinToCelsius = (kelvin) => {
    return Math.round((kelvin - 273.15) );
  };

  return (
    <>
      <div className='h-screen border-2 border-red-600 flex justify-center items-center' id='parent'>
        <div className='border-blue-600 border-2 p-4 align-center justify-center rounded-lg h-auto w-1/2'>
          <h1 className='text-4xl text-center text-white'>Weathora</h1>
          <form className='flex justify-center items-center' onSubmit={getWeather}>
            <input
              type="text"
              className='bg-gray-300 p-2 rounded-2xl m-4 placeholder:text-black bold active:border-none'
              placeholder='Enter your city name'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button type='submit' className='bg-blue-600 p-2 rounded-2xl text-white'>Search</button>
          </form>
         {weather && (
           <div className='bg-gray-300 p-4 rounded-lg m-4'>
             <h2 className='text-2xl text-center text-black'>{weather.name}, {weather.sys.country}</h2>
             <h3 className='text-xl text-center text-black'>{weather.weather[0].description}</h3>
             <h3 className='text-xl text-center text-black'>Temperature: {kelvinToCelsius(weather.main.temp)}°F</h3>
             <h3 className='text-xl text-center text-black'>Feels like: {kelvinToCelsius(weather.main.feels_like)}°F</h3>
             <h3 className='text-xl text-center text-black'>Humidity: {weather.main.humidity}%</h3>
             <h3 className='text-xl text-center text-black'>Wind Speed: {weather.wind.speed} m/s</h3>
           </div>
         )}
        </div>
      </div>
    </>
  );
};

export default App;
import { useEffect, useState } from 'react';
import './App.css';
import searchIcon from './assets/search-4.png';
import clearIcon from './assets/01d.png';
import clearntIcon from './assets/01n.png'
import cloudIcon from './assets/02d.png';
import cloudntIcon from './assets/02n.png';
import brokenCloudIcon from './assets/04dn.png';
import drizzleIcon from './assets/03dn-1.png';
import rainIcon from './assets/09dn.png';
import showerRainIcon from './assets/10d.png';
import snowIcon from './assets/13dn.png';
import thunderIcon from './assets/11dn.png';
import windIcon from './assets/wind.png';
import mistIcon from './assets/50dn.png';
import fogIcon from './assets/fog.png';
import humidityIcon from './assets/Humidity.png';
import climateIcon from './assets/Climate.png';

const WeatherDetails = ({icon, temp, city, country,lat,log,humidity,wind})=>{
  return(<>
    <div className='images'>
      <img src={icon} alt="Image" />
    </div>
    <div className='temp'>{temp}°C</div>
    <div className='location'>{city}</div>
    <div className='country'>{country}</div>
    <div className='cord'>
      <div>
        <span className='lat'>latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className='log'>longitude</span>
        <span>{log}</span>
      </div>
    </div>
    <div className='data-container'>
      <div className='element'>
        <img src={humidityIcon} alt="humidity" className='icon'/>
        <div className="data">
          <div className="humidity-percent">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className='element'>
        <img src={windIcon} alt="wind" className='icon'/>
        <div className="data">
          <div className="wind-percent">{wind}km/h</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>
  </>
);
};
function App() {
    let api_key='bc9403a3e160338bce494cdd7a63c9da';
    const [text, setText] = useState('');
  const [icon, setIcon] = useState(climateIcon); 
  const [temp, setTemp] = useState(0); 
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('WELCOME TO WEATHER APP');
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const[cityNotFound, setCityNotFound]=useState(false);
  const [loading, setLoading]=useState(false);
  const [error, setError] = useState('');
  const weatherIconMap={
    "01d":clearIcon,
    "01n":clearntIcon,
    "02d":cloudIcon,
    "02n":cloudntIcon,
    "03d":fogIcon,
    "03n":fogIcon,
    "04d":brokenCloudIcon,
    "04n":brokenCloudIcon,
    "09d":showerRainIcon,
    "09n":drizzleIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "11d":thunderIcon,
    "11n":thunderIcon,
    "13d":snowIcon,
    "13n":snowIcon,
    "50d":mistIcon,
    "50n":mistIcon
  } 
  const search= async()=>{
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`

    try{
      let res= await fetch(url);
      let data= await res.json();
      //console.log(data);
      if(data.cod==="404"){
        console.log("City Not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setCity(data.name);
      setCountry(data.sys.country);
      setTemp(Math.floor(data.main.temp));
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode=data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);
    }
    catch(error){
      console.error("An Error occured:", error.message);
      setError("An error occured while fetching data.");
    }
    finally{
      setLoading(false);
    }
  };
  const handleCity=async(e)=>{
    setText(e.target.value);
  };
  const handleKeyDown=async(e)=>{
    if(e.key==='Enter'){
      search();
    }
  };

  useEffect(()=>{
    search();
  },[]);

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type="text" className='cityInput' placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
          <div className='search-icon' onClick={()=>search()}>
            <img src={searchIcon} alt="" />
          </div>
        </div>
        {loading && <div className='loading'>Loading...</div>}
        
        {cityNotFound && !loading && <div className='error'>City Not Found</div>}
        
        {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>}
        
        <p className='copyright'> Designed by <span>Venkata Karthick</span></p>
      </div>
    </>
  )
} 
export default App 

import React, {useEffect, useState} from 'react';

const Weather = () => {
    const [weatherData, setWeatherData] = useState([]); //assigning an initial empty state array
    const [defaultWeatherData, setDefaultWeatherData] = useState([]); //default 

    const [defaultCity, setDefaultCity] = useState ('Atlanta'); 
    const [text, setText] = useState (''); //assigning an empty string
    const [cityText, setCityText] = useState (''); 

    useEffect(() => { //Renders only what you tell it to render
        /**
             * @todo #1 Create a default weather city
            if(weatherData === []){
                getDefaultData();
            }
            getData();
        */
        //*componentDidUnmount - clean up function
        //   return () => {
        //     effect
        //   };
        console.log('useEffect ran');
        console.log(text);
    },[weatherData, text, cityText]);//[]empty array render page once only

    // const text = 'This is the home Page';
    /** 
     * @todo #1
    const getDefaultData = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&units=imperial&appid=6fef324c55286127f98057eb8a7b8ead`;
            // let url = `api.openweathermap.org/data/2.5/weather?q=atlanta&appid=${process.env.REACT_APP_APIKEY}`;
            console.log(url);
            
            let response = await fetch(url); //api call for data
            // let response = await fetch(url, {mode: "no-cors"}); //api call for data
            
            //don't mutate the original object. store response into another variable.
            
            let data = await response.json(); //format to json object
            
            // console.log(data);//verify the object
            // return data;//return object with function
            console.log(data);
            setDefaultWeatherData(data); //setting the state to a full object
            
        } catch (error) {
            
            console.log('Error with API', error);
            
        };
    };
    */

    //getDefaultData();
    const getData = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=imperial&appid=${process.env.REACT_APP_APIKEY}`;
            console.log(url);
            
            let response = await fetch(url); //api call for data         

            //don't mutate the original object. store response into another variable.
            let data = await response.json(); //format to json object
            // console.log(data);//verify the object
            // return data;//return object with function
            console.log(data);
            setWeatherData(data); //setting the state to a full object
            
        } catch (error) {
            
            console.log('Error with API', error);
            
        };
    };
    const handleForm = (e) => {
        e.preventDefault();
        setCityText(text);
        
        getData(); 
        setText('');

    }
    /**
     * @todo 1
     const clearState = () => {
         setWeatherData([]);
         setText('');
         setCityText('');
     }
     */

    return <>
        <form onSubmit={handleForm} className="form-group container">
            <div>
                <h1>Quick Weather</h1>
                <h2>Search City Name</h2>
                <input className="form-control" type="text" value={text} onChange= {(e)=>setText(e.target.value.toUpperCase())} id="input-city" aria-describedby="City" placeholder="Enter City Name"/>
            </div>

            <button type="submit" className="btn-primary rounded" id="btn-submit">
                SUBMIT
            </button>
        </form>
        <br />
        <div className="container rounded-pill d-flex flex-column conditions align-items-center">

            {
                cityText && cityText ?
                <h2 id="city" style={{marginTop: "0px"}}>{cityText}</h2> : 
                <h2 id="city" style={{marginTop: "0px"}}>{defaultCity}</h2>
            }
            
            {
                weatherData.weather && weatherData.weather ?
                <p id="pic" style={{marginTop: "0px"}}><img id="icon" src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} width="250" height="250" alt='weather'/></p> :
                <p id="pic" style={{marginTop: "0px"}}><img id="icon" src="http://openweathermap.org/img/wn/04d@2x.png" width="250" height="250" alt='weather'/></p> 
            }
      
           {
               weatherData.main && weatherData.main ?
               <h2  id="conditions" style={{marginTop: "0px"}}>{weatherData.main.temp}F {weatherData.weather[0].description}</h2>:
               <h2  id="conditions" style={{marginTop: "0px"}}>45F overcast clouds</h2>
           }

        </div>
    </>;
}
 
export default Weather;
const input = document.getElementById("input")
const iconGlass=document.getElementById("iconGlass")
const weatherImage =document.getElementById("weatherImage")
const temp = document.getElementById("temperature")
const windSpeed= document.getElementById("windSpeed")
const humidity = document.getElementById("humidity")
const description = document.getElementById("description")
const locationNotFound=document.querySelector(".location-not-found")
const imgContainer=document.querySelector(".imgContainer")
const weatherInfo=document.querySelector(".weatherInfo")
const timeUpdate=document.querySelector(".timeUpdate")
const timeDiv=document.querySelector(".timeZone")

async function getTime(lat,long){
    
    // this is baseEndPoint for timezone calculated according to latittude and longitude.
    const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=CQGANW780KDG&format=json&by=position&lat=${lat}&lng=${long}`
    const response = await fetch(url)
    const data = await response.json()

    console.log(data)

    timeDiv.style.display="flex"           // unHiding the timezone 
    timeUpdate.innerText=data.formatted    // updating the timeZone
    
}

async function getWeather(Location){
    const apiKey="cf9faf039ee4f227d0444d065d72fc84"
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${Location}&appid=${apiKey}&units=metric`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    
    // if city is not found then api will return a object which will contain the error code for it 
    if(data.cod === "404"){                      
        locationNotFound.style.display="flex"    // unHiding the Location Not found Div and hiding all other divs 
        imgContainer.style.display="none"
        weatherInfo.style.display="none"
        timeDiv.style.display="none"

        console.log("Error cant find location") 
        return;
    }

    getTime(data.coord.lat,data.coord.lon);      // function to get time according to location 
    
    locationNotFound.style.display="none"       // Hiding the Location Not found Div and unHiding all other divs 
    imgContainer.style.display="flex"
    weatherInfo.style.display="flex"
    timeDiv.style.display="flex"

    temp.innerText=data.main.temp                    // updating the temperature                                                  
    humidity.innerText=`${data.main.humidity}%`      // updating the humidity
    windSpeed.innerText=`${data.wind.speed} km/hr`   // updating the windSpeed

    description.innerText=data.weather[0].description      // updating the weather description
 

    // UPDATING THE IMAGES ACCORDING TO THE WEATHER DESCRIPTION 
    switch(data.weather[0].main){                      
        case "Clouds":
            weatherImage.src="images/cloud.png"
            break;
        case "Rain":
            weatherImage.src="images/rain.png"
            break;
        case "Mist":
            weatherImage.src="images/mist.png"
            break;
        case "Snow":
            weatherImage.src="images/snow.png"
            break;
        case "Clear":
            weatherImage.src="images/clear.png"
            break; 
    }
}

// when clicked on search button event will occur 
iconGlass.addEventListener("click",()=>{
    let city=input.value     // getting the location entered by the user 
    getWeather(city)
})


// Retrieve HTML Elements
const myForm = document.querySelector('#searchForm');
const submitButton = document.querySelector("#searchVisualCrossing");
const newSearchText = document.querySelector('#searchTerm');

// Function to retrieve data from the Visual Crossing API
async function getWeatherData(locationPlace){
    let baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
    let baseURLAndLocation = baseURL + locationPlace;
    let fullUrl = baseURLAndLocation + '?key=8JKWW2BAQF7W2VHFY9B3DSX25';
    
    const response = await fetch(fullUrl);
    const responseJSON = response.json();
    console.log(responseJSON);
    return responseJSON;
}

// Submit functionality of the form that will call getWeatherData 
myForm.addEventListener("submit", async(e) => {
    
    e.preventDefault();

    const searchTerm = newSearchText.value;
    let myData = await getWeatherData(searchTerm);

    setWeatherElements(myData);

    myForm.reset();
})

// Function to analyze the data returned from getWeatherData and create/set elements
function setWeatherElements(data){

    // Get the Weather Report Element
    const weatherReport = document.querySelector('#weather-report');
    weatherReport.style.display = "flex";
    weatherReport.style.flexDirection = "column";
    weatherReport.style.justifyContent = "center";
    weatherReport.innerHTML = '';
    
    // Current Time
    const currentTime = document.createElement('p');
    currentTime.textContent = 'Current Time: '+ data.currentConditions.datetime;

    // Current Condition
    const condition = document.createElement('p');
    condition.textContent = 'Current Weather Condition: '+ data.currentConditions.conditions;

    // Current Temperature
    const temperature = document.createElement('p');
    temperature.textContent = 'Current Temperature: '+ data.currentConditions.temp;

    // Current Feels-Like Temperature
    const feelsLike = document.createElement('p');
    feelsLike.textContent = 'Current Feels-Like Temperature: '+ data.currentConditions.feelslike;

    // Current UVIndex
    const UVIndex = document.createElement('p');
    UVIndex.textContent = 'Current UV Index: '+ data.currentConditions.uvindex;

    // Current WindSpeed
    const currentWindSpeed = document.createElement('p');
    currentWindSpeed.textContent = 'Current Wind Speed: '+ data.currentConditions.windspeed;

    // Current Sunset time
    const currentSunsetTime = document.createElement('p');
    currentSunsetTime.textContent = 'Current Sunset Time: '+ data.currentConditions.sunset;

    weatherReport.append(currentTime, condition, temperature, feelsLike, UVIndex, currentWindSpeed, currentSunsetTime);

}

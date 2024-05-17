const responseDiv = document.getElementById("response");
const errorResponseDiv = document.getElementById("error-response");
const key = '2da76c9939dbd392a72738f84440f30d';

const findWeather = async (city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
        const response = await axios.get(url)
        return {
            maxTemp : Math.floor(Number(response.data.main.temp_max-273.15)),
            minTemp : Math.round(Number(response.data.main.temp_min-273.15)),
            curTemp : Math.round(Number(response.data.main.temp-273.15)),
            description: response.data.weather[0].description
        }
    } catch (error) {
       throw error;
    }
}
const getWeatherData = (city)=>{
    findWeather(city)
        .then((data)=>{
            responseDiv.style.display = "block"; 
            responseDiv.innerText = `Its ${data.description} right now.
             Current temperature is: ${data.curTemp}°C. 
             The degrees today predeicted to be between ${data.maxTemp}°C - ${data.minTemp}°C.
            `
            errorResponseDiv.style.display = "none";
        })
        .catch(()=>{
            errorResponseDiv.style.display = "block";responseDiv.style.display = "none"; 
        });
}

document.getElementById("submit-btn").addEventListener("click", ()=>{
    getWeatherData(document.querySelector("input").value)
});


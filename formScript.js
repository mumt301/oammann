let cityName;
let myURL;
function myForm() {
    url = (new URL(document.location)).searchParams;
    cityName=url.get("city");
    console.log(cityName);
    let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=84333ed1e3b5de0a85ebd078cd8f713c&mode=xml`;
    let XMLHttp = new XMLHttpRequest();
    XMLHttp.open("GET", queryURL);
    XMLHttp.send();
    let retrievedData;
    let retrievedCity = "";
    let sky = "";
    let temperature;
    let currentTemperature = "";
    let scaleTemperature = "";
    XMLHttp.onreadystatechange = function() 
    {
        if(this.readyState==4 && this.status==200) {
            console.log("request succeeded.")
            retrievedData=this.responseXML;
            retrievedCity = retrievedData.getElementsByTagName("city")[0].getAttribute("name");
            sky = retrievedData.getElementsByTagName("weather")[0].getAttribute("value");
            temperature = retrievedData.getElementsByTagName("temperature")[0];
            currentTemperature = temperature.getAttribute("value");
            scaleTemperature = temperature.getAttribute("Unit");

            document.getElementById("result").innerHTML =
            `
            <div>
                ${retrievedCity}
                <br>
                ${sky}
                <br>
                ${temperature}
                <br>
                ${currentTemperature}
                <br>
                ${scaleTemperature}
            </div>
            `;
        }
    }


}

window.onload = myForm;
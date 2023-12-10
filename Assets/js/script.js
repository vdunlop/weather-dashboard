// CONSTANTS
const ERROR = -1;
const NO_ERROR = 0;
const STATUS_GOOD = 200; // fetch status

// Set up elements
var cityTextEl = $("#cityText");

// Variables for local storage
// Local storage set up.
var currentCity = {  // Global variable: structure to hold all the details for one city for local storage
    name: '',
    latitude: 0,
    longitude: 0,
    temperature: 0,
    wind: 0,
    humidity: 0
};
var cityArr = [];  // array for cities
var cityLS = JSON.parse(localStorage.getItem('cityList'));

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {

    // The API calls

 

    function processWeatherDatafromAPI(apiURL) {
        // Fetch the data from the openweathermap api. Input the string that was built that contains
        // the lat and long of the city being searched.
        //       fetch('https://api.openweathermap.org/data/2.5/weather?lat=44.84&lon=93.29&units=imperial&appid=16e7da02b0d8eaa61b87bb1e395ca5cc')
        //        //fetch('https://api.openweathermap.org/data/2.5/weather?lat=44.84&lon=93.29&appid=9151b72856ea5e674d9bdd5a39dd8f94')
        console.log(apiURL);
        fetch(apiURL)
            //process response - check for error response
            .then(function (response) {
                if (response.status !== STATUS_GOOD) {
                    console.log("Fetch error: " + response.status);
                    console.log(response);
                    return response.json();
                }
                return response.json();
            })

            //process data available from the fetch
            .then(function (data) {
                currentCity.temperature = data.main.temp;
                currentCity.humidity = data.main.humidity;
                currentCity.wind = data.wind.speed;
                formatWeatherBox();
            });
    }

    // API call to get the latitude and longitude of a city
    // store it in local storage with the city
        function getLatandLong(apiURL) {
        /*fetch('https://api.openweathermap.org/geo/1.0/direct?q=Bloomington&limit=1&appid=16e7da02b0d8eaa61b87bb1e395ca5cc')
            //process response - check for error response
            .then(function (response) {
                if (response.status !== 200) {
                    console.log("Fetch error: " + response.status);
                    console.log(response);
                    return response.json();
                }
                return response.json();
            })

            //process data available from the fetch
            .then(function (data) {
                console.log(data);
                console.log(data[0].lat);
                console.log(data[0].lon);
            });*/
    }

    function processFiveDayForecast(apiURL) {
        // Fetch the data from the openweathermap api. Input the string that was built that contains
        // the lat and long of the city being searched.
        //       fetch('https://api.openweathermap.org/data/2.5/weather?lat=44.84&lon=93.29&units=imperial&appid=16e7da02b0d8eaa61b87bb1e395ca5cc')
        //        //fetch('https://api.openweathermap.org/data/2.5/weather?lat=44.84&lon=93.29&appid=9151b72856ea5e674d9bdd5a39dd8f94')
        fetch("https://api.openweathermap.org/data/2.5/forecast?lat=44.84&lon=-93.29&units=imperial&appid=16e7da02b0d8eaa61b87bb1e395ca5cc")
            //process response - check for error response
            .then(function (response) {
                if (response.status !== STATUS_GOOD) {
                    console.log("Fetch error: " + response.status);
                    console.log(response);
                    return response.json();
                }
                return response.json();
            })

            //process data available from the fetch
            .then(function (data) {

                //format forecast day boxes

                console.log(data);
                console.log(data.list[0].main.temp);
                console.log(data.list[0].wind.speed);//.wind);
                console.log(data.list[0].main.humidity);
                console.log(data.list[0].weather[0].description);//.description);
                console.log(dayjs(data.list[0].dt_txt).format('M/D/YYYY'));
$("div#day-one").text(dayjs(data.list[0].dt_txt).format('M/D/YYYY'));                
$("#day-one").append("<p>Temp: " + data.list[0].main.temp + " F");
$("#day-one").append("<p>Wind: " + data.list[0].wind.speed + " mph");
$("#day-one").append("<p>Temp: " + data.list[0].main.humidity + "%");


            });
    }



    function formatWeatherBox() {
        console.log("in format weather box");

        var today = dayjs();
        $("div#cityName").children("p").text(currentCity.name + " " + today.format('M/D/YYYY'));
        $("li#temp").text("Temp: " + currentCity.temperature + " F");
        $("li#wind").text("Wind: " + currentCity.wind + " mph");
        $("li#humidity").text("Humidity: " + currentCity.humidity + "%");

        console.log("currentcity");
        console.log(currentCity);
        return 0;
    }

    // Process Current Weather:
    // get lat and long
    // fetch current weather for lat and long (city)
    // format current weather on screen
    function processCurrentWeather() {
        console.log("in process current weather");
        // Get latitude and longitude for our API call for weather
        var latLongAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=Bloomington&limit=1&appid=16e7da02b0d8eaa61b87bb1e395ca5cc';
        var errorRtn = getLatandLong(latLongAPI);
        console.log("currentcity");
        console.log(currentCity);
        debugger;

        // format the URL to get the weather
        var latitude = "lat=" + currentCity.latitude;
        var longitude = "lat=" + currentCity.longitude;
        var longitude = "lon=" + "-93.29";
        var latitude = "lat=" + "44.84";
        var newAPIURL = "https://api.openweathermap.org/data/2.5/weather?" + latitude + "&" + longitude + "&units=imperial&" + "appid=16e7da02b0d8eaa61b87bb1e395ca5cc";

        console.log("in process current weather");
        console.log(newAPIURL);
        // fetch current weather for lat and long (city) and format on screen
        errorRtn = processWeatherDatafromAPI(newAPIURL);
        if (errorRtn == ERROR) {
            console.log("Error return in processCurrentWeather");
            return;
        }
    }

    // Append to list of cities searched for
    function appendCitytoList() {
        console.log("in append");
        $("#cityList").append('<button class="listCityBtn">' + currentCity.name + '</button>');
        return 0;
    }

    // Process 5 day Forecast:
    function formatFiveDayForecast() {
        return 0;
    }


    // Process City:
    // Append to list of cities searched for
    // store in local storage
    // process the weather 
    function processCity() {
        console.log("in process city");
        var errorRtn = 0;

        errorRtn = appendCitytoList();
        if (errorRtn == ERROR) {
            return;
        }
        console.log(currentCity)
        // Add city to local storage

        //Process the current weather
        errorRtn = processCurrentWeather();

        // Process the 5 day forecast
        $("#fiveDayForecast").css("display","flex");

        debugger;
        errorRtn = processFiveDayForecast();

    }

    // Process Search clicked
    // Search button was clicked. 
    // Get input city and start the whole process
    function processSearch() {
        console.log("button clicked");

        // Get city entered and check for blank.
        var cityEntered = cityTextEl.val();
        if ((cityEntered == null) || (cityEntered == "")) {
            console.log("City not entered in Search click");
            //cityTextEl.val("Enter City");
            return ERROR;
        }

        // Clear last city
        currentCity = {  // structure to hold all the details for one city for local storage
            name: cityEntered,
            latitude: "",
            longitude: "",
            temperature: "",
            wind: "",
            humidity: ""
        };
        // Process the city that was entered.
        console.log(currentCity);
        processCity();
    }

    // MAIN - waiting for the city to be entered and Search clicked
    // Search button clicked
    $('.searchBtn').click(function (e) {
        e.preventDefault();
        console.log("in button click");
        processSearch();
    });

    // When a city in the list is clicked
    $('button.listCityBtn').click(function (e) {
        e.preventDefault();
        console.log("in city button clicked");
        // get hour that we clicked on
        console.log(e);
        /*var hourStr = this.previousElementSibling.previousElementSibling.innerText;
        var hour = convertTo24HourFormat(hourStr);
     
        // convert hour to 24 hour clock format
     
        // get the data entered in textarea
        // store in local storage and update our tasksArr to "emulate" local storage
        var divText = "div#hour-" + hour;
        var index = hour - MIN_HOUR;  // 9am is index 0, 10AM index 1, etc...
     
        tasksArr[index] = $(divText).children('textarea').val();
        localStorage.setItem("taskList", JSON.stringify(tasksArr));
     
        // Turn on the Appointment Saved text
        $('p#apptSaved').attr("style","display:block");*/
    });
});
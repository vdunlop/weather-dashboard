// CONSTANTS
const ERROR = -1;
const NO_ERROR = 0;
const STATUS_GOOD = 200; // fetch status

// Set up elements
var cityTextEl = $("#cityText");

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
    //var searchBtn = document.querySelector("#search");

    // The API call
    function processWeatherDatafromAPI(apiURL, cityP) {
        // Fetch the data from the openweathermap api. Input the string that was built that contains
        // the lat and long of the city being searched.
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=44.84&lon=93.29&units=imperial&appid=16e7da02b0d8eaa61b87bb1e395ca5cc')
            //        //fetch('https://api.openweathermap.org/data/2.5/weather?lat=44.84&lon=93.29&appid=9151b72856ea5e674d9bdd5a39dd8f94')

            //  fetch(apiURL,{
            //process response - check for error response
            .then(function (response) {
                if (response.status !== STATUS_GOOD) {
                    console.log("Fetch error: ", response.status);
                    console.log(response);
                    return ERROR;
                }
                return response.json();
            })

            //process data available from the fetch
            .then(function (data) {
                console.log(data);
                debugger;
                //populateCards();
                formatWeatherBox(cityP, data);

            });
    };

    function appendCitytoList(cityP) {
        $("#cityList").append('<button class="listCityBtn">' + cityP + '</button>');
        return 0;
    }

    function formatWeatherBox(cityP, data) {

        var currentTemp = data.main.temp;
        var currentHumidity = data.main.humidity;
        var currentWind = data.wind.speed;
        $("div#cityName").children("p").text(cityP);
        $("li#temp").text("Temp: " + currentTemp + " F");
        $("li#wind").text("Wind: " + currentWind + " mph");
        $("li#humidity").text("Humidity: " + currentHumidity + "%");
        return 0;
    }

    function formatFiveDayForecast(cityP) { return 0; }

    function formatWeatherURLCall(newCityP) {
        // API variables
        var latitude = "lat=";
        var longitude = "lon="
        var newAPIURL = "api.openweathermap.org/data/2.5/forecast?" + "appid=16e7da02b0d8eaa61b87bb1e395ca5cc";
        return newAPIURL;
    }

    // Process City:
    // Append to list of cities searched for
    // Add to main weather box.
    // Add 5 day forecast
    function processCity(newCityP) {
        var errorRtn = 0;


        // Append to list of cities searched for
        errorRtn = appendCitytoList(newCityP);
        if (errorRtn == ERROR) {
            return;
        }

        var newAPIURL = formatWeatherURLCall(newCityP);
        errorRtn = processWeatherDatafromAPI(newAPIURL, newCityP);
        if (errorRtn == ERROR) {
            return;
        }

        // Add to main weather box.
        //errorRtn = formatWeatherBox(newCityP);
        // if (errorRtn == ERROR) {
        //     return;
        // }

        // Add 5 day forecast 
        // formatFiveDayForecast(newCityP);
    }


    // Search button was clicked. Get input city and fetch data about it.
    function processSearch() {
        console.log("button clicked");

        // Get city entered and check for blank.
        var newCity = cityTextEl.val();
        if ((newCity == null) || (newCity == "")) {
            console.log("City not entered in Search click");
            cityTextEl.val("Enter City");
            return ERROR;
        }

        // Process that a city was entered.
        console.log(newCity);
        debugger;
        processCity(newCity);

    }

    // Search button clicked
    $('.searchBtn').click(function (e) {
        e.preventDefault();
        console.log("in button click");
        processSearch();
    });

    // When a city in the list is clicked
    $('.listCityBtn').click(function (e) {
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
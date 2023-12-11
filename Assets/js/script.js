// CONSTANTS
const ERROR = -1;
const NO_ERROR = 0;
const STATUS_GOOD = 200; // fetch status
const NUM_DAYS = 5; // 5 day forecast

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
        /*console.log(apiURL);
        //fetch('https://api.openweathermap.org/geo/1.0/direct?q=Bloomington&limit=1&appid=16e7da02b0d8eaa61b87bb1e395ca5cc')
        //fetch('https://geocode.maps.co/search?q=bloomington')
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
                //console.log(data);
                //console.log(data[0].lat);
                //console.log(data[0].lon);
                currentCity.latitude = data[0].lat;
                currentCity.longitude = data[0].lon;
            });*/
    }

    function processFiveDayForecast(apiURL) {
        console.log(apiURL);
        // Fetch the data from the openweathermap api. Input the string that was built that contains
        // the lat and long of the city being searched.
        //       fetch('https://api.openweathermap.org/data/2.5/weather?lat=44.84&lon=93.29&units=imperial&appid=16e7da02b0d8eaa61b87bb1e395ca5cc')
        //        //fetch('https://api.openweathermap.org/data/2.5/weather?lat=44.84&lon=93.29&appid=9151b72856ea5e674d9bdd5a39dd8f94')
        //fetch("https://api.openweathermap.org/data/2.5/forecast?lat=44.84&lon=-93.29&units=imperial&appid=16e7da02b0d8eaa61b87bb1e395ca5cc")
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

                //format forecast day boxes
/*
                console.log(data);
                console.log(data.list[0].main.temp);
                console.log(data.list[0].wind.speed);//.wind);
                console.log(data.list[0].main.humidity);
                console.log(data.list[0].weather[0].description);//.description);
                console.log(dayjs(data.list[0].dt_txt).format('M/D/YYYY'));*/
                var currentDate = dayjs(data.list[0].dt_txt).format('M/D/YYYY');
                var dataListIndex = 0; // points to the data that came back from the API call
                var daysIndex = 0;  // points to the 5 day forecast day (1 through 5)

                // set day one of the 5 day forecast
                $("div#day-one").text(dayjs(data.list[daysIndex].dt_txt).format('M/D/YYYY'));
                $("#day-one").append("<p>Temp: " + data.list[daysIndex].main.temp + " F");
                $("#day-one").append("<p>Wind: " + data.list[daysIndex].wind.speed + " mph");
                $("#day-one").append("<p>Temp: " + data.list[daysIndex].main.humidity + "%");

                // look for the next date in the API call data and store it in the 5 day forecast
                var loopNotEnd = true;
                while (loopNotEnd) {
                    dataListIndex++;  // next API return
                    nextDate = dayjs(data.list[dataListIndex].dt_txt).format('M/D/YYYY');  // next date in the API return
                    //console.log(nextDate);
                    //console.log(currentDate);
                    //console.log(dataListIndex);
                    //console.log(loopNotEnd);
                    //console.log(daysIndex);

                    // new date, then put the data in there
                    if (currentDate < nextDate) {
                        currentDate = nextDate;
                        daysIndex++;
                        switch (daysIndex) {
                            case 2: $("div#day-two").text(dayjs(data.list[daysIndex].dt_txt).format('M/D/YYYY'));
                                $("#day-two").append("<p>Temp: " + data.list[daysIndex].main.temp + " F");
                                $("#day-two").append("<p>Wind: " + data.list[daysIndex].wind.speed + " mph");
                                $("#day-two").append("<p>Temp: " + data.list[daysIndex].main.humidity + "%");
                                break;
                            case 3: $("div#day-three").text(dayjs(data.list[daysIndex].dt_txt).format('M/D/YYYY'));
                                $("#day-three").append("<p>Temp: " + data.list[daysIndex].main.temp + " F");
                                $("#day-three").append("<p>Wind: " + data.list[daysIndex].wind.speed + " mph");
                                $("#day-three").append("<p>Temp: " + data.list[daysIndex].main.humidity + "%");
                                break;
                            case 4: $("div#day-four").text(dayjs(data.list[daysIndex].dt_txt).format('M/D/YYYY'));
                                $("#day-four").append("<p>Temp: " + data.list[daysIndex].main.temp + " F");
                                $("#day-four").append("<p>Wind: " + data.list[daysIndex].wind.speed + " mph");
                                $("#day-four").append("<p>Temp: " + data.list[daysIndex].main.humidity + "%");
                                break;
                            case 5: $("div#day-five").text(dayjs(data.list[daysIndex].dt_txt).format('M/D/YYYY'));
                                $("#day-five").append("<p>Temp: " + data.list[daysIndex].main.temp + " F");
                                $("#day-five").append("<p>Wind: " + data.list[daysIndex].wind.speed + " mph");
                                $("#day-five").append("<p>Temp: " + data.list[daysIndex].main.humidity + "%");
                                break;
                            default:
                                console.log("Error in ProcessFiveDayForecast switch");
                        }
                    }
                    dataListIndex++;

                    // filled up all 5 forecast days, then we're done
                    if (daysIndex === NUM_DAYS) {
                        loopNotEnd = false;
                    }
                }
                return 0;
            });
    }


    // Format the current weather box
    function formatWeatherBox() {
        //console.log("in format weather box");

        var today = dayjs();
        $("div#cityName").children("p").text(currentCity.name + " " + today.format('M/D/YYYY'));
        $("li#temp").text("Temp: " + currentCity.temperature + " F");
        $("li#wind").text("Wind: " + currentCity.wind + " mph");
        $("li#humidity").text("Humidity: " + currentCity.humidity + "%");

        //console.log("currentcity");
        //console.log(currentCity);
        return 0;
    }

    // Process Current Weather:
    // get lat and long
    // fetch current weather for lat and long (city)
    // format current weather on screen
    function processWeather() {
        console.log("in process current weather");
        // Get latitude and longitude for our API call for weather
        debugger;
        var latLongAPI = 'http://geocode.maps.co/search?q=' + currentCity.name;
        getLatandLong(latLongAPI);
        console.log("currentcity");
        console.log(currentCity);
        debugger;

        // format the URL to get the weather
        //var latitude = "lat=" + currentCity.latitude;
        //var longitude = "lat=" + currentCity.longitude;
        var longitude = "lon=" + "-93.29";
        var latitude = "lat=" + "44.84";
        var newAPIURL = "https://api.openweathermap.org/data/2.5/weather?" + latitude + "&" + longitude + "&units=imperial&" + "appid=16e7da02b0d8eaa61b87bb1e395ca5cc";

        console.log("in process current weather");
        console.log(newAPIURL);
        debugger;
        // fetch current weather for lat and long (city) and format on screen
        errorRtn = processWeatherDatafromAPI(newAPIURL);
        if (errorRtn == ERROR) {
            console.log("Error return in processWeather");
            return;
        }

            // Process the 5 day forecast
            $("#fiveDayForecast").css("display", "flex");

            debugger;
        // format the URL to get the 5 day forecast
        //var latitude = "lat=" + currentCity.latitude;
        //var longitude = "lat=" + currentCity.longitude;
        var longitude = "lon=" + "-93.29";
        var latitude = "lat=" + "44.84";
        var newAPIURL = "https://api.openweathermap.org/data/2.5/forecast?" + latitude + "&" + longitude + "&units=imperial&" + "appid=16e7da02b0d8eaa61b87bb1e395ca5cc";

        console.log(newAPIURL);
        errorRtn = processFiveDayForecast(newAPIURL);
    
    }

    // Append to list of cities searched for
    function appendCitytoList() {
        //console.log("in append");
        $("#cityList").append('<button class="listCityBtn">' + currentCity.name + '</button>');
        return 0;
    }

     // Process City:
    // Append city to list of cities searched for
    // store in local storage
    // process the weather 
    // process the 5 day forecast
    function processCity() {
        //console.log("in process city");
        var errorRtn = 0;

        errorRtn = appendCitytoList();
        if (errorRtn == ERROR) {
            return;
        }
        //console.log(currentCity)
        // Add city to local storage

        //Process the current weather
        errorRtn = processWeather();

    
    }

    // Process Search clicked
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
        //console.log(currentCity);
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
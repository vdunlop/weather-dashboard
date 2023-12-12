// CONSTANTS
const ERROR = -1;
const NO_ERROR = 0;
const STATUS_GOOD = 200; // fetch status
const NUM_DAYS = 5; // 5 day forecast
const WEATHER_ICON = "https://openweathermap.org/img/wn/";
const WEATHER_ICON_END = "@2x.png";

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
    humidity: 0,
    weatherImage: 0
};
var cityArr = [];  // array for cities
var cityLS = JSON.parse(localStorage.getItem('cityList'));

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {

    // The API calls
    function processWeatherDatafromAPI(coords) {
        // Fetch the data from the openweathermap api. Input the string that was built that contains
        // the lat and long of the city being searched.
        var longitude = "lon=" + coords.lon;   
        var latitude = "lat=" + coords.lat;   
        var apiURL = "https://api.openweathermap.org/data/2.5/weather?" + latitude + "&" + longitude + "&units=imperial&" + "appid=16e7da02b0d8eaa61b87bb1e395ca5cc";
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
                currentCity.weatherImage = data.weather[0].icon;
                formatWeatherBox();
            });
    }

    // API call to get the latitude and longitude of a city
    // store it in local storage with the city
    function getLatandLong(location) {
     var apiURL = 'https://geocode.maps.co/search?q=' + location;
        
        return fetch(apiURL)
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
                return data[0];
            });
    }

    function processFiveDayForecast(coords) {
        // Fetch the data from the openweathermap api. Input the string that was built that contains
        // the lat and long of the city being searched.
        //       fetch('https://api.openweathermap.org/data/2.5/weather?lat=44.84&lon=93.29&units=imperial&appid=16e7da02b0d8eaa61b87bb1e395ca5cc')
        //        //fetch('https://api.openweathermap.org/data/2.5/weather?lat=44.84&lon=93.29&appid=9151b72856ea5e674d9bdd5a39dd8f94')
        //fetch("https://api.openweathermap.org/data/2.5/forecast?lat=44.84&lon=-93.29&units=imperial&appid=16e7da02b0d8eaa61b87bb1e395ca5cc")
        var longitude = "lon=" + coords.lon;
        var latitude = "lat=" + coords.lat;
        var apiURL = "https://api.openweathermap.org/data/2.5/forecast?" + latitude + "&" + longitude + "&units=imperial&" + "appid=16e7da02b0d8eaa61b87bb1e395ca5cc";

        fetch(apiURL)
            //process response - check for error response
            .then(function (response) {
                if (!response.ok) {
                    console.error("Fetch error: " + response.status);
                    console.error(response);
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
                                console.log(data.list[0].weather[0].icon); 
                                console.log(dayjs(data.list[0].dt_txt).format('M/D/YYYY'));*/
                console.log(data.list[0].weather[0].icon);

                var currentDate = dayjs(data.list[0].dt_txt).format('M/D/YYYY');
                var dataListIndex = 0; // points to the data that came back from the API call
                var daysIndex = 1;  // points to the 5 day forecast day (1 through 5) 

                // set day one of the 5 day forecast
                $("#day-one").text(dayjs(data.list[dataListIndex].dt_txt).format('M/D/YYYY'));

                // get the weather icon image and append
                var weatherCode = data.list[dataListIndex].weather[0].icon;
                weatherCode = weatherCode.replace("n","d");
                var weatherImageURL = WEATHER_ICON + weatherCode + WEATHER_ICON_END;
                var weatherImageHtml = '<img src="' + weatherImageURL + '" alt="" />';
                console.log(weatherCode);
                console.log(weatherImageHtml);
                console.log(weatherImageURL);
                $("#day-one").append(weatherImageHtml);
                //$("div#day-one").append("<p>" + data.list[dataListIndex].weather[0].icon);

                // append temp, speed, humidity
                $("#day-one").append("<p>Temp: " + data.list[dataListIndex].main.temp + " F");
                $("#day-one").append("<p>Wind: " + data.list[dataListIndex].wind.speed + " MPH");
                $("#day-one").append("<p>Temp: " + data.list[dataListIndex].main.humidity + "%");

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
                        // get next weather icon
                        weatherCode = data.list[dataListIndex].weather[0].icon;
                        weatherCode = weatherCode.replace("n","d");
                        weatherImageURL = WEATHER_ICON + weatherCode + WEATHER_ICON_END;
                        weatherImageHtml = '<img src="' + weatherImageURL + '" alt="" />';

                        switch (daysIndex) {
                            case 2: $("#day-two").text(dayjs(data.list[dataListIndex].dt_txt).format('M/D/YYYY'));
                                $("#day-two").prepend(weatherImageHtml);
                                $("#day-two").append("<p>Temp: " + data.list[dataListIndex].main.temp + " F");
                                $("#day-two").append("<p>Wind: " + data.list[dataListIndex].wind.speed + " MPH");
                                $("#day-two").append("<p>Temp: " + data.list[dataListIndex].main.humidity + "%");
                                break;
                            case 3: $("#day-three").text(dayjs(data.list[dataListIndex].dt_txt).format('M/D/YYYY'));
                            $("#day-three").prepend(weatherImageHtml);
                                $("#day-three").append("<p>Temp: " + data.list[dataListIndex].main.temp + " F");
                                $("#day-three").append("<p>Wind: " + data.list[dataListIndex].wind.speed + " MPH");
                                $("#day-three").append("<p>Temp: " + data.list[dataListIndex].main.humidity + "%");
                                break;
                            case 4: $("#day-four").text(dayjs(data.list[dataListIndex].dt_txt).format('M/D/YYYY'));
                            $("#day-four").prepend(weatherImageHtml);
                                $("#day-four").append("<p>Temp: " + data.list[dataListIndex].main.temp + " F");
                                $("#day-four").append("<p>Wind: " + data.list[dataListIndex].wind.speed + " MPH");
                                $("#day-four").append("<p>Temp: " + data.list[dataListIndex].main.humidity + "%");
                                break;
                            case 5: $("#day-five").text(dayjs(data.list[dataListIndex].dt_txt).format('M/D/YYYY'));
                            $("#day-five").prepend(weatherImageHtml);
                                $("#day-five").append("<p>Temp: " + data.list[dataListIndex].main.temp + " F");
                                $("#day-five").append("<p>Wind: " + data.list[dataListIndex].wind.speed + " MPH");
                                $("#day-five").append("<p>Temp: " + data.list[dataListIndex].main.humidity + "%");
                                break;
                            default:
                                console.log("Error in ProcessFiveDayForecast switch");
                        }
                    }
                    dataListIndex++;

                    // filled up all 5 forecast days, then we're done
                    if (daysIndex >= NUM_DAYS) {
                        loopNotEnd = false;
                    }
                }
                return 0;
            });
    }

     // Format the current weather box
    function formatWeatherBox() {
        //console.log("in format weather box");
        console.log(currentCity);
        weatherImageURL = WEATHER_ICON + currentCity.weatherImage + WEATHER_ICON_END;
        console.log(weatherImageURL);
        var today = dayjs();
        $("div#cityName").children("p").text(currentCity.name + " " + today.format('M/D/YYYY'));
        $("img.weatherImage").attr('src', weatherImageURL);
        $("li#temp").text("Temp: " + currentCity.temperature + " F");
        $("li#wind").text("Wind: " + currentCity.wind + " MPH");
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
        getLatandLong(currentCity.name).then(function(coords){
            processWeatherDatafromAPI(coords);
            processFiveDayForecast(coords);
        } );
        console.log("currentcity");
        console.log(currentCity);
        debugger;

        // format the URL to get the weather
        //var latitude = "lat=" + currentCity.latitude;
        //var longitude = "lat=" + currentCity.longitude;
 
        /*console.log("in process current weather");
        console.log(newAPIURL);
        debugger;
        // fetch current weather for lat and long (city) and format on screen
        errorRtn = processWeatherDatafromAPI(newAPIURL);
        if (errorRtn === ERROR) {
            console.log("Error return in processWeather");
            return;
        }*/

        // Process the 5 day forecast
        $("#fiveDayForecast").css("display", "flex");

        debugger;
        // format the URL to get the 5 day forecast
        //var latitude = "lat=" + currentCity.latitude;
        //var longitude = "lat=" + currentCity.longitude;

        console.log(newAPIURL);
        //errorRtn = processFiveDayForecast(newAPIURL);

    }

    // Append to list of cities searched for
    function appendCitytoList() {
        //console.log("in append");
        $("#cityList").append('<button class="listCityBtn">' + currentCity.name + '</button>');
        //$("#cityList").append('<button class="listCityBtn">Honolulu</button>');

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
        if (errorRtn === ERROR) {
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
            humidity: "",
            weatherImage: ""
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

    $('#cityList').click(function (e) {
        console.log(this);
        console.log(e);
        var cityClicked = e.target.textContent;
        console.log(cityClicked);
        // Clear last city
        currentCity = {  // structure to hold all the details for one city for local storage
            name: cityClicked,
            latitude: "",
            longitude: "",
            temperature: "",
            wind: "",
            humidity: "",
            weatherImage: ""
        };
        processWeather();
    });
    // When a city in the list is clicked
    //$('.listCityBtn').click(function (e) {
    //    e.preventDefault();
    //    console.log("in city button clicked");
    // get button that we clicked on
    //    console.log(e);
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
    //});
});
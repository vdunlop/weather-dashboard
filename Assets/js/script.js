// CONSTANTS
const ERROR = -1;
const STATUS_GOOD = 200; // fetch status

// API variables
var openWeatherMapURL = "api.openweathermap.org/data/2.5/forecast?";
var latitude = "lat={lat}";
var longitude = "lon={lon}"
var appID = "appid={16e7da02b0d8eaa61b87bb1e395ca5cc}";
var city = "";
var finalOWMURL = "";

// Set up elements
var cityTextEl = $("#cityText");
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
    //var searchBtn = document.querySelector("#search");

    // Fetch the data from the openweathermap api. Input the string that was built that contains
    // the lat and long of the city being searched.
    fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=16e7da02b0d8eaa61b87bb1e395ca5cc', {
        //  fetch(openWeatherMapURL,{
    })

        //process response - check for error response
        .then(function (response) {
            if (response.status !== STATUS_GOOD) {
                console.log("Fetch error: ", response.status);
                console.log(response);
                return ERROR;
            }
        })

        //process data available from the fetch
        .then(function (data) {
            console.log(data);
            //populateCards();
        });



    // Search button was clicked. Get input city and fetch data about it.
    function processSearch() {
        console.log("button clicked");
        var newCity = cityTextEl.val();
        if ((newCity == null) || (newCity == "")){
            console.log("City not entered in Search click");
            cityTextEl.val("Enter City");
            return ERROR;
        }
        console.log(newCity);

    }

    // Event listener for the Search button clicked
        $('.searchBtn').click(function (e) {
        e.preventDefault();
        console.log("in button click");
        processSearch();
    });
});
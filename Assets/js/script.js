var openWeatherMapURL = "api.openweathermap.org/data/2.5/forecast?";
var latitude = "lat={lat}";
var longitude = "lon={lon}"
var appID = "appid={16e7da02b0d8eaa61b87bb1e395ca5cc}";
var city = "";
var finalOWMURL = "";
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
//var searchBtn = document.querySelector("#search");

// Fetch the data from the openweathermap api. Input the string that was built that contains
// the lat and long of the city being searched.
//fetch('api.openweathermap.org/data/2.5/forecast?lat={44.8408}&lon={93.2983}&appid={16e7da02b0d8eaa61b87bb1e395ca5cc}&per_page=5', {
fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=16e7da02b0d8eaa61b87bb1e395ca5cc', {
//  fetch(openWeatherMapURL,{
})
  .then(function (response) {
    debugger;
    console.log(response);
//check for error response
console.log(response);
    return response.json();
  })
  .then(function (data) {
//data available in here (not out there)
debugger;
    console.log(data);
//populateCards();
  });




    function processSearch() {
        console.log("button clicked");

    }

    // Event listener for the Search button
    /*searchBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        debugger;
        processSearch();
    });*/
    $('.searchBtn').click(function (e) {
        e.preventDefault();
 console.log ("in button click");
 processSearch();

      });
});
var openWeatherMapURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
var itemSearch = "";

var searchBtn = document.querySelector("#search");


//fetch('https://www.loc.gov/film-and-videos/?q=dog&fo=json&per_page=5', {
//  fetch(openWeatherMapURL,{
//})
//  .then(function (response) {
//    debugger;
//    console.log(response);
//check for error response

//    return response.json();
//  })
//  .then(function (data) {
//data available in here (not out there)
//    console.log(data);
//populateCards();
//  });

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {


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
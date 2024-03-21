//Elements
var searchInput = $('#search-input');
var searchBtn = $('#search-button');
var forcastToday = $('#today');
var forecastFiveDays = $('#forecast');
var searchHistory = $('#history')
var latitude = '';
var longitude = '';


//the key
//2e1b791d707f58697c903c1b4e6fbaba
var APIkey = 'f200583e446129dcdb6b7377ecfb0d97';


//parent function
searchBtn.on("click", (event) => {
  event.preventDefault();


  //local storage of searches based on city and date+time of search
  var userSearches = 
  {
    value: searchInput.val(),
    city: searchInput.val(),
    time: dayjs().format("D MMM YYYY, HH:mm:ss")
  };
  localStorage.setItem( userSearches.city, userSearches.value);
  

  //the query
  var queryUrlCityCordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.val()}&appid=${APIkey}`;


  fetch(queryUrlCityCordinates)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      latitude = data[0].lat.toFixed(4);
      longitude = data[0].lon.toFixed(4);
      console.log(latitude);
      console.log(longitude);

      var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&&lon=${longitude}&appid=${APIkey}`;

      fetch(queryURL)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          console.log(data);

          var forcastHeading = $(
            `<h2>${
              searchInput.val().charAt(0).toUpperCase() +
              searchInput.val().slice(1)
            } ${dayjs().format(
              "(DD/MM/YYYY)"
            )} <img src="https://openweathermap.org/img/w/${
              data.list[0].weather[0].icon
            }.png"></h2>`
          );
          var forcastTemp = $(
            `<p>Temp: ${(data.list[0].main.temp - 273.15).toFixed(
              2
            )} &deg;C</p>`
          );
          var forcastWind = $(`<p>Wind: ${data.list[0].wind.speed} KPH</p>`);
          var forcastHumidity = $(
            `<p>Humidity: ${data.list[0].main.humidity}%</p>`
          );


          //different days
          //their date
          //their description
          var day1 = data.list[6];
          var day1Date = dayjs(day1.dt_txt).format("(DD/MM/YYYY)");
          var day1Descriptopn = day1.weather[0].description;

          var day2 = data.list[12];
          var day2Date = dayjs(day2.dt_txt).format("(DD/MM/YYYY)");
          var day2Descriptopn = day2.weather[0].description;

          var day3 = data.list[18];
          var day3Date = dayjs(day3.dt_txt).format("(DD/MM/YYYY)");
          var day3Descriptopn = day3.weather[0].description;

          var day4 = data.list[24];
          var day4Date = dayjs(day4.dt_txt).format("(DD/MM/YYYY)");
          var day4Descriptopn = day4.weather[0].description;

          var day5 = data.list[30];
          var day5Date = dayjs(day5.dt_txt).format("(DD/MM/YYYY)");
          var day5Descriptopn = day5.weather[0].description;


          //creating the html cards
          var fiveDaysHeader = $(`<h4>5-Day Forecast</h4>`);
          var fiveDaysCards = $(`<div class="card col-2 me-3">
          <img src="https://openweathermap.org/img/w/${day1.weather[0].icon}.png" class="card-img-top" alt="weather condition icon">
          <div class="card-body mb-3">
            <h5 class="card-title mb-3 fs-6 d-flex justify-content-center">${day1Date}</h5>
            <p class="border border-dark-subtle rounded d-flex justify-content-center p-2 small-txt">${day1Descriptopn}</p>
            <p class="card-text">
              Temp: ${(day1.main.temp - 273.15).toFixed(0)} °C
            </p            
            <p class="card-text">
              Wind: ${day1.wind.speed} KPH
            </p>
            <p class="card-text">
              Humidity: ${(day1.main.humidity).toFixed(0)} %
            </p>
          </div>
          </div>

          <div class="card col-2 me-3">
          <img src="https://openweathermap.org/img/w/${day2.weather[0].icon}.png" class="card-img-top" alt="weather condition icon">
          <div class="card-body">
            <h5 class="card-title mb-3 fs-6 d-flex justify-content-center">${day2Date}</h5>
            <p class="border border-dark-subtle rounded d-flex justify-content-center p-2 small-txt">${day2Descriptopn}</p>
            <p class="card-text">
              Temp: ${(day2.main.temp - 273.15).toFixed(0)} °C
            </p>
            <p class="card-text">
              Wind: ${day2.wind.speed} KPH
            </p>
            <p class="card-text">
              Humidity: ${(day2.main.humidity).toFixed(0)} %
            </p>
          </div>
          </div>

          <div class="card col-2 me-3">
          <img src="https://openweathermap.org/img/w/${day3.weather[0].icon}.png" class="card-img-top" alt="weather condition icon">
          <div class="card-body">
            <h5 class="card-title mb-3 fs-6 d-flex justify-content-center">${day3Date}</h5>
            <p class="border border-dark-subtle rounded d-flex justify-content-center p-2 small-txt">${day3Descriptopn}</p>
            <p class="card-text">
              Temp: ${(day3.main.temp - 273.15).toFixed(0)} °C
            </p>
            <p class="card-text">
              Wind: ${day3.wind.speed} KPH
            </p>
            <p class="card-text">
              Humidity: ${(day3.main.humidity).toFixed(0)} %
            </p>
          </div>
          </div>

          <div class="card col-2 me-3">
          <img src="https://openweathermap.org/img/w/${day4.weather[0].icon}.png" class="card-img-top" alt="weather condition icon">
          <div class="card-body">
            <h5 class="card-title mb-3 fs-6 d-flex justify-content-center">${day4Date}</h5>
            <p class="border border-dark-subtle rounded d-flex justify-content-center p-2 small-txt">${day4Descriptopn}</p>
            <p class="card-text">
              Temp: ${(day4.main.temp - 273.15).toFixed(0)} °C
            </p>
            <p class="card-text">
              Wind: ${day4.wind.speed} KPH
            </p>
            <p class="card-text">
              Humidity: ${(day4.main.humidity).toFixed(0)} %
            </p>
          </div>
          </div>

          <div class="card col-2 me-3">
          <img src="https://openweathermap.org/img/w/${day5.weather[0].icon}.png" class="card-img-top" alt="weather condition icon">
          <div class="card-body">
            <h5 class="card-title mb-3 fs-6 d-flex justify-content-center">${day5Date}</h5>
            <p class="border border-dark-subtle rounded d-flex justify-content-center p-2 small-txt">${day5Descriptopn}</p>
            <p class="card-text">
              Temp: ${(day5.main.temp - 273.15).toFixed(0)} °C
            </p>
            <p class="card-text">
              Wind: ${day5.wind.speed} KPH
            </p>
            <p class="card-text">
              Humidity: ${(day5.main.humidity).toFixed(0)} %
            </p>
          </div>
          </div>`);
        

          //emptying the previous results using jQuery .empty
          const emptyResults = () => {
            forcastToday.empty();
            forecastFiveDays.empty();
          };        
          emptyResults();


          //appending everything last so that emptyResults() can clear only old searches
          forcastToday.append(
            forcastHeading,
            forcastTemp,
            forcastWind,
            forcastHumidity
          );
          forecastFiveDays.append(
            fiveDaysHeader, 
            fiveDaysCards
          );

          
        });
    });


  //printing histroy from local storage
  var storageItem = localStorage.getItem(userSearches.city);
  var createHistoryButton = $(`
  <button class="btn btn-primary btn-bg" type="button">${storageItem}</button>`);

  searchHistory.append(createHistoryButton);
});

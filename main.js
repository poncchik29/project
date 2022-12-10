let tempBlock = document.querySelector("#temp");
let cityBlock = document.querySelector("#city");
let imgBlock = document.querySelector(".img-block");
let update_date = document.querySelector("#update-date");
let local_date = document.querySelector("#local-date");
let searchInp = document.querySelector(".search");

let city = "Lviv";

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let value = searchInp.value;
    if (!value) return false;
    city = value;
    init();
    searchInp.value = "";
  }
});

function init() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d982b206b7125a363d94918d08ebf560`
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      tempBlock.textContent = `${temperature()} `;

      cityBlock.textContent = `City: ${data.name}`;

      console.log(tempBlock.textContent);
      if (tempBlock.textContent <= 5) {
        document.getElementsByClassName("container")[0].style =
          "background-image: url(./img/pick5.jpg)";
        let time2 = (document.getElementsByClassName("change-text")[0].value =
          "WARM CLOTHING");
        console.log(time2);
      } else if (tempBlock.textContent >= 5) {
        document.getElementsByClassName("container")[0].style =
          "background-image: url(./img/pick1.jpg)";
        let time3 = (document.getElementsByClassName("change-text")[0].value =
          " AUTMN/SUMMER ");
        console.log(time3);
        document.getElementsByClassName("change-text")[0].style =
          "color: orange";
      }

      function temperature() {
        let getTemp = data.main.temp;
        let tempC = Math.floor(getTemp) - 273;
        return tempC;
      }

      let date = new Date();

      console.log("перезапуск");
    })
    .catch(() => {
      alert("This city not found");
      city = "London";
      init();
      searchInp.value = "";
    });
}

init();

setInterval(() => {
  init();
}, 10000);

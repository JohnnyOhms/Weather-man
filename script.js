const api = {
    base:"https://api.openweathermap.org/data/2.5/weather?q=arab&appid=",
    key: "8e34c709713c4054f1b1e896136b8571"
}

const searchBtn = document.querySelector(".head");
const searchField = document.querySelector(".search");
const btn = document.querySelector(".btn");
const nameIcon = document.querySelector(".name");

searchBtn.addEventListener('click', (e)=>{
    nameIcon.classList.add('hide');
    searchBtn.classList.add('hide');
    searchField.classList.remove('hide');
    btn.classList.remove('hide');

})
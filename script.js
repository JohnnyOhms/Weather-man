const api = {
    base:"https://api.openweathermap.org/data/2.5/weather?q=",
    key: "&appid=8e34c709713c4054f1b1e896136b8571&units=metric"
}

const searchBtn = document.querySelector(".head");
const input = document.querySelector(".search");
const btn = document.querySelector(".btn");
const nameIcon = document.querySelector(".name");
const body = document.querySelector(".weather-man");

searchBtn.addEventListener('click', (e)=>{
    nameIcon.classList.add('hide');
    searchBtn.classList.add('hide');
    // input.classList.add('slide-down');
    // btn.classList.add('slide-from-left');
    // setTimeout(()=>{
        input.classList.remove('hide');
        btn.classList.remove('hide');
    // }, 800)
})

btn.addEventListener("click",getData)

function getData(e){
    e.preventDefault();
    if(input.value == ""){
        return;
    }else{
        let fetchData = fetch(`${api.base}${input.value.toLowerCase()}${api.key}`)   
        .then(Response=> Response.json())
        .then(displayData)
        // .catch(err=>{
        //  console.error('error')
        // })
    }
}

function displayData(data){
    if(data.cod ==  "404"){ 
        console.log(data.message);
        alert(data.message)
        // input.value="";
        return;
    }else{
        console.log(data);
        const counTry = document.getElementById('country').innerHTML = `${data.sys.country}`;
        const city = document.getElementById('location').innerHTML= `${data.name}`;
        const temperature = document.querySelector('.temp').innerHTML= Math.floor(`${data.main.temp}`)+"<span>&deg;C</span>";
        let temp_max = data.main.temp_max;
        let temp_min = data.main.temp_min;
        const temp_range = document.querySelector(".temp-range")
        .innerHTML = Math.floor(temp_max)+"<span>&deg;C</span>/"+ Math.floor(temp_min)+"<span>&deg;C</span>";
        const humidity = document.getElementById("humidity").innerHTML = `${Math.floor(data.main.humidity)}%`;
        let latitude = data.coord.lat;
        let longitude = data.coord.lon;
        const lat_lon = document.getElementById("lat-long")
        .innerHTML = `${parseFloat(latitude).toFixed(1)}`+"<span>&deg;C</span>/"+`${parseFloat(longitude).toFixed(1)}`+"<span>&deg;C</span>";
        const pressure = document.getElementById("pressure").innerHTML = `${data.main.pressure}hPa`;
        
        let icon = data.weather[0].icon;
        let weatherIcon = `http://openweathermap.org/img/w/${icon}.png`;
        let iconDisplay = document.createElement("img");
        iconDisplay.classList.add('.icon');
        iconDisplay.src = weatherIcon;
        const weather = document.querySelector('.weather').appendChild(iconDisplay);

        
        let main = String(data.weather[0].main);
        switch (main) {
            case 'Clouds':
                console.log('clouds');
                background();
                break;
            case 'Clear':
                console.log('Clear');
                break
            case 'Rain':
                console.log('Rain');
                break
            case 'Snow':
                console.log('Snow');
                break
            default:
                return;
        }
    }
    }

     //Current date
    const currentDate = document.querySelector(".date");
    let date = new Date();
    currentDate.innerHTML = `${getDate(date)}`;

    function getDate(d){
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let months = ["January","February","March","April","May","June","July",
                    "August","September","October","November","December"];

        return `${days[d.getDay()]},&nbsp${months[d.getMonth()]}&nbsp${d.getDate()}&nbsp${d.getFullYear()}`
        
    }

    function background (b){
        let  backgroundEffect = [
                {
                    clouds: b.style.backgroundColor = "Blue",
                    opacity: b.style.opacity = "0.7"
                },
        ]
        
    }
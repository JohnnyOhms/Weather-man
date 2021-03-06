const api = {
    base:"https://api.openweathermap.org/data/2.5/weather?q=",
    key: "&appid=8e34c709713c4054f1b1e896136b8571&units=metric"
}

const searchBtn = document.querySelector(".head");
const input = document.querySelector(".search");
const btn = document.querySelector(".btn");
const nameIcon = document.querySelector(".name");
const body = document.querySelector(".weather-man");
const weather = document.querySelector('.weather')

class Background{
    constructor(color){
        this.body = color;
        this.font = color;
    }

    clouds(){
        this.body.style.backgroundImage= "url(./image/cloud.jpg)"
        this.body.style.backgrondPosition = 'center'
        this.body.style.backgroundSize = 'cover'
        this.font.style.color = 'black'
    }
    clear(){
        this.body.style.backgroundImage= "url(./image/clear.jpg)"
        this.body.style.backgrondPosition = 'center'
        this.body.style.backgroundSize = 'cover'
        this.body.style.opacity = '0.6'
        this.font.style.color = 'black'
    }
    rain(){
        this.body.style.backgroundImage= "url(./image/rain.jpg)"
        this.body.style.backgrondPosition = 'center'
        this.body.style.backgroundSize = 'cover'
        this.font.style.color = 'white'
    }
    snow(){
        this.body.style.backgroundImage= "url(./image/snow.jpg)"
        this.body.style.backgrondPosition = 'center'
        this.body.style.backgroundSize = 'cover'
        this.font.style.color = 'black'
    }
    thunder(){
        this.body.style.backgroundImage= "url(./image/thunder.jpg)"
        this.body.style.backgrondPosition = 'center'
        this.body.style.backgroundSize = 'cover'
        this.font.style.color = 'white'
    }
    others(){
        this.body.style.backgroundImage= "url(./image/others.jpg)"
        this.body.style.backgrondPosition = 'center'
        this.body.style.backgroundSize = 'cover'
        this.font.style.color = 'white'
    }
}

let backgrond = new Background(body);

searchBtn.addEventListener('click', (e)=>{
    nameIcon.classList.add('hide');
    searchBtn.classList.add('hide');
    input.classList.add('slide-down');
    btn.classList.add('slide-from-left');
    
    setTimeout(()=>{
        input.classList.remove('hide');
        btn.classList.remove('hide');

    }, 800)
    
})

btn.addEventListener("click",getData)
let rotate = document.getElementById('rotate');

function getData(e){
    e.preventDefault();
    rotate.classList.add('rotate-load')
        if(input.value == ""){
            rotate.classList.remove('rotate-load')
            return;
        }else{
            setTimeout(()=>{
            let fetchData = fetch(`${api.base}${input.value.toLowerCase()}${api.key}`)   
            .then(Response=> Response.json())
            .then(displayData)
            .catch(err=>{
                console.error('error')
            })
            rotate.classList.remove('rotate-load')
        }, 1500)
        }
}

rotate.addEventListener('click', (e)=>{
    rotate.classList.add('rotate-load');
    setTimeout(()=>{
        window.location.assign('index.html')
    }, 1000)
})

function displayData(data){
    if(data.cod ==  "404"){ 
        console.log(data.message);
        alert(data.message)
        input.value="";
        return;
    }else{
        console.log(data);
        while(weather.hasChildNodes()){
            weather.removeChild(weather.firstChild)
        }
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
        const condition = document.querySelector('.condition').innerHTML = `${data.weather[0].description}`
        let icon = String(data.weather[0].icon);
        let weatherIcon = `http://openweathermap.org/img/w/${icon}.png`;
        let iconDisplay = document.createElement("img");
        iconDisplay.classList.add('icon');
        iconDisplay.src = weatherIcon;
        weather.appendChild(iconDisplay);
        input.value="";
  
        //remove search bar
        input.classList.remove('slide-down');
        btn.classList.remove('slide-from-left');

        input.classList.add('slide-up');
        btn.classList.add('slide-up'); 
      
        setTimeout(()=>{
            nameIcon.classList.remove('hide');
            searchBtn.classList.remove('hide');

            input.classList.add('hide');
            btn.classList.add('hide');
 
        },1000)

        input.classList.remove('slide-up');
        btn.classList.remove('slide-up'); 

        switch(icon){
            case '50d':
                backgrond.others()
                break;
            case '09d':
                backgrond.thunder()
                break;
            default :
            console.log('switched to main');
                break;
        }
       
        let main = String(data.weather[0].main);
        switch (main) {
            case 'Clouds':
                console.log('clouds');
                backgrond.clouds()
                break;
            case 'Clear':
                console.log('Clear');
                backgrond.clear()
                break
            case 'Rain':
                console.log('Rain');
                backgrond.rain()
                break
            case 'Snow':
                console.log('Snow');
                break
            default:
                console.log('switched to icon');
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

    
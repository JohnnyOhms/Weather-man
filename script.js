const api = {
    base:"https://api.openweathermap.org/data/2.5/weather?q=",
    key: "&appid=8e34c709713c4054f1b1e896136b8571"
}

const searchBtn = document.querySelector(".head");
const input = document.querySelector(".search");
const btn = document.querySelector(".btn");
const nameIcon = document.querySelector(".name");

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

function getData(e){
    e.preventDefault();
    if(input.value == ""){
        return;
    }else{
        let fetchData = fetch(`${api.base}${input.value.toLowerCase()}${api.key}`)   
        .then(Response=> Response.json())
        .then(displayData)
        .catch(err=>{
         console.error('error')
        })
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
        console.log(data.sys.country);
        let counTry = document.getElementById('country').innerHTML = "data.sys.country";
    }
        
    }
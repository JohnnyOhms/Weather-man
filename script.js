window.onload = fetch("https://api.openweathermap.org/data/2.5/weather?q=arab&appid=8e34c709713c4054f1b1e896136b8571")
.then((Response)=> Response.json())
.then((data)=>{
    console.log(data);
})
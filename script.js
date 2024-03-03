const searchCity = document.getElementById('search');
const btn = document.getElementById('btn');
const city = document.getElementById('location');
const temp = document.getElementById('temp');
const tmin = document.getElementById('tmin');
const tmax = document.getElementById('tmax');
const myKey = config.MY_KEY;
btn.addEventListener('click',async ()=>{
    let lat;
    let lon;    
    try {
        const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchCity.value}&limit=1&appid=${myKey}`)
        const data = await res.json();
        lat = data[0].lat
        lon = data[0].lon
    } catch (e) {
        alert("Please Enter the correct city name")
        searchCity.value=''
        return;
    }
    try{
        const nres = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myKey}&units=metric`)
        const ndata = await nres.json();
        city.innerText = searchCity.value.charAt(0).toUpperCase()+ searchCity.value.slice(1)
        temp.innerText = ndata.main.feels_like
        tmin.innerText = ndata.main.temp_min
        tmax.innerText = ndata.main.temp_min
        searchCity.value=''
    } catch (e) {
        console.log('error occured', e)
        alert("Cannot get the weather at the moment")
        searchCity.value=''
        return;
    }
});

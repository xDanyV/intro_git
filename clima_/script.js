

document.addEventListener("DOMContentLoaded", function () {
    carga_clima();
});

function carga_clima() {
    const api_Key = "9e24c975965f1dce510991cdf1d323b9";
    let ciudad = "Hermosillo";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${api_Key}&units=metric&lang=es`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            mostrar_Datos(data)
        }).catch(error => {
            console.error("Algo salio mal: ", error);
        })
}

function mostrar_Datos(data){
    const msj_clima = document.getElementById("clima_Msg");
    const temp = data.main.temp;
    msj_clima.innerHTML = temp + " C";
    const desc = data.weather[0].description;
    const msj_desc = document.getElementById("clima_desc");
    msj_desc.innerHTML = desc;
}